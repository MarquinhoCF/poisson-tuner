/**
 * Parses a PoissonOrderGenerator Python snippet and returns structured config.
 * Returns null if parsing fails.
 */
export function parsePoissonCode(code) {
  try {
    const ordersMatch = code.match(/total_orders\s*=\s*(\d+)/);
    const windowMatch = code.match(/time_window\s*=\s*(\d+)/);
    const rateMatch = code.match(/rate_function\s*=\s*lambda\s+t:\s*(.+?)(?:\)|$)/s);

    if (!rateMatch) return null;

    const rateExpr = rateMatch[1];

    const baseMatch = rateExpr.match(/^([\d.]+)/);
    const baseRate = baseMatch ? parseFloat(baseMatch[1]) : 0.05;

    const expRegex =
      /np\.exp\s*\(\s*-\s*\(\s*\(\s*t\s*-\s*([\d.]+)\s*\)\s*\*\*\s*2\s*\)\s*\/\s*([\d.]+)\s*\)/g;

    const peaks = [];
    let match;
    while ((match = expRegex.exec(rateExpr)) !== null) {
      peaks.push({ center: parseFloat(match[1]), intensity: 0.25, width: parseFloat(match[2]) });
    }

    const intensityMatch = rateExpr.match(/\+\s*([\d.]+)\s*\*/);
    if (intensityMatch && peaks.length > 0) {
      const globalIntensity = parseFloat(intensityMatch[1]);
      peaks.forEach((p) => (p.intensity = globalIntensity));
    }

    return {
      targetOrders: ordersMatch ? parseInt(ordersMatch[1]) : null,
      timeWindow: windowMatch ? parseInt(windowMatch[1]) : null,
      baseRate,
      peaks: peaks.length > 0 ? peaks : null,
    };
  } catch {
    return null;
  }
}

/**
 * Generates the adjusted PoissonOrderGenerator Python snippet.
 */
export function generatePoissonCode({ targetOrders, timeWindow, newBaseRate, adjustedPeaks }) {
  const allSameIntensity = adjustedPeaks.every(
    (p) => p.adjustedIntensity === adjustedPeaks[0].adjustedIntensity,
  );

  if (allSameIntensity) {
    const expTerms = adjustedPeaks
      .map(
        (peak, idx) =>
          `        np.exp(-((t - ${peak.center})**2) / ${peak.width})  # Pico ${idx + 1}`,
      )
      .join(' +\n');

    return `PoissonOrderGenerator(
    total_orders=${targetOrders},
    time_window=${timeWindow},
    rate_function=lambda t: ${newBaseRate} + ${adjustedPeaks[0].adjustedIntensity} * (
${expTerms}
    )
)`;
  }

  const expTerms = adjustedPeaks
    .map(
      (peak, idx) =>
        `        ${peak.adjustedIntensity} * np.exp(-((t - ${peak.center})**2) / ${peak.width})  # Pico ${idx + 1}`,
    )
    .join(' +\n');

  return `PoissonOrderGenerator(
    total_orders=${targetOrders},
    time_window=${timeWindow},
    rate_function=lambda t: ${newBaseRate} + (
${expTerms}
    )
)`;
}
