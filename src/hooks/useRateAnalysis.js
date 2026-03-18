import { useState, useMemo } from 'react';

const DEFAULT_PEAKS = [
  { center: 210, intensity: 0.25, width: 1000 },
  { center: 390, intensity: 0.25, width: 1000 },
];

const DEFAULT_STATE = {
  timeWindow: 600,
  targetOrders: 200,
  baseRate: 0.05,
  peaks: DEFAULT_PEAKS,
};

const NUM_POINTS = 1000;

export function useRateAnalysis() {
  const [timeWindow, setTimeWindow] = useState(DEFAULT_STATE.timeWindow);
  const [targetOrders, setTargetOrders] = useState(DEFAULT_STATE.targetOrders);
  const [baseRate, setBaseRate] = useState(DEFAULT_STATE.baseRate);
  const [peaks, setPeaks] = useState(DEFAULT_STATE.peaks);

  // --- Peak CRUD ---
  const addPeak = () =>
    setPeaks((prev) => [
      ...prev,
      { center: timeWindow / 2, intensity: 0.2, width: 1000 },
    ]);

  const removePeak = (index) => {
    if (peaks.length > 1) {
      setPeaks((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updatePeak = (index, field, value) => {
    setPeaks((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: parseFloat(value) || 0 };
      return next;
    });
  };

  const resetDefaults = () => {
    setTimeWindow(DEFAULT_STATE.timeWindow);
    setTargetOrders(DEFAULT_STATE.targetOrders);
    setBaseRate(DEFAULT_STATE.baseRate);
    setPeaks(DEFAULT_STATE.peaks);
  };

  // --- Core math ---
  const analysis = useMemo(() => {
    const dt = timeWindow / NUM_POINTS;

    const rateAt = (t) =>
      peaks.reduce(
        (acc, peak) =>
          acc + peak.intensity * Math.exp(-((t - peak.center) ** 2) / peak.width),
        baseRate,
      );

    // Original pass
    let originalIntegral = 0;
    let originalMaxRate = 0;
    const originalData = [];

    for (let i = 0; i <= NUM_POINTS; i++) {
      const t = (i / NUM_POINTS) * timeWindow;
      const rate = rateAt(t);
      originalIntegral += rate * dt;
      originalMaxRate = Math.max(originalMaxRate, rate);
      originalData.push({
        time: Math.round(t),
        rate: parseFloat(rate.toFixed(4)),
        expectedOrders: parseFloat(originalIntegral.toFixed(2)),
      });
    }

    const scaleFactor = targetOrders / originalIntegral;
    const adjustedRateAt = (t) => scaleFactor * rateAt(t);

    // Adjusted pass
    let adjustedIntegral = 0;
    let adjustedMaxRate = 0;
    const adjustedData = [];

    for (let i = 0; i <= NUM_POINTS; i++) {
      const t = (i / NUM_POINTS) * timeWindow;
      const rate = adjustedRateAt(t);
      adjustedIntegral += rate * dt;
      adjustedMaxRate = Math.max(adjustedMaxRate, rate);
      adjustedData.push({
        time: Math.round(t),
        rate: parseFloat(rate.toFixed(4)),
        expectedOrders: parseFloat(adjustedIntegral.toFixed(2)),
      });
    }

    return {
      original: {
        data: originalData,
        expectedOrders: originalIntegral.toFixed(2),
        maxRate: originalMaxRate.toFixed(4),
        avgRate: (originalIntegral / timeWindow).toFixed(4),
      },
      adjusted: {
        data: adjustedData,
        expectedOrders: adjustedIntegral.toFixed(2),
        maxRate: adjustedMaxRate.toFixed(4),
        avgRate: (adjustedIntegral / timeWindow).toFixed(4),
        scaleFactor: scaleFactor.toFixed(4),
        newBaseRate: (baseRate * scaleFactor).toFixed(4),
        adjustedPeaks: peaks.map((p) => ({
          ...p,
          adjustedIntensity: (p.intensity * scaleFactor).toFixed(4),
        })),
      },
    };
  }, [timeWindow, targetOrders, baseRate, peaks]);

  // Combined series for the rate comparison chart
  const combinedChartData = useMemo(
    () =>
      analysis.original.data.map((item, idx) => ({
        time: item.time,
        original: item.rate,
        adjusted: analysis.adjusted.data[idx].rate,
      })),
    [analysis],
  );

  return {
    // State
    timeWindow,
    targetOrders,
    baseRate,
    peaks,
    // Setters
    setTimeWindow,
    setTargetOrders,
    setBaseRate,
    setPeaks,
    // Peak helpers
    addPeak,
    removePeak,
    updatePeak,
    resetDefaults,
    // Derived
    analysis,
    combinedChartData,
  };
}
