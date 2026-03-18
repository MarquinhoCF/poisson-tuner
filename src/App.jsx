import { useRateAnalysis } from './hooks/useRateAnalysis';

import { AppHeader }        from './components/layout/AppHeader';
import { CodeImporter }     from './components/importer/CodeImporter';
import { GlobalParams }     from './components/inputs/GlobalParams';
import { PeaksPanel }       from './components/inputs/PeaksPanel';
import { ResultsPanel }     from './components/results/ResultsPanel';
import { RateChart }        from './components/charts/RateChart';
import { AccumulatedChart } from './components/charts/AccumulatedChart';
import { CodeOutput }       from './components/code/CodeOutput';

export default function App() {
  const {
    timeWindow, targetOrders, baseRate, peaks,
    setTimeWindow, setTargetOrders, setBaseRate, setPeaks,
    addPeak, removePeak, updatePeak, resetDefaults,
    analysis, combinedChartData,
  } = useRateAnalysis();

  /** Maps the flat field name coming from GlobalParams to the right setter. */
  const handleGlobalChange = (field, value) => {
    const dispatch = {
      timeWindow:   setTimeWindow,
      targetOrders: setTargetOrders,
      baseRate:     setBaseRate,
    };
    dispatch[field]?.(value);
  };

  /**
   * Receives the parsed config from CodeImporter.
   * Only applies fields that were successfully parsed (non-null).
   */
  const handleImport = ({ targetOrders: to, timeWindow: tw, baseRate: br, peaks: pk }) => {
    if (to != null) setTargetOrders(to);
    if (tw != null) setTimeWindow(tw);
    if (br != null) setBaseRate(br);
    if (pk != null && pk.length > 0) setPeaks(pk);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg">

      <AppHeader onReset={resetDefaults} />

      <CodeImporter onImport={handleImport} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <GlobalParams
          timeWindow={timeWindow}
          targetOrders={targetOrders}
          baseRate={baseRate}
          onChange={handleGlobalChange}
        />
        <PeaksPanel
          peaks={peaks}
          adjustedPeaks={analysis.adjusted.adjustedPeaks}
          onAdd={addPeak}
          onRemove={removePeak}
          onUpdate={updatePeak}
        />
      </div>

      <ResultsPanel
        original={analysis.original}
        adjusted={analysis.adjusted}
        targetOrders={targetOrders}
      />

      <RateChart
        data={combinedChartData}
        avgRateGoal={targetOrders / timeWindow}
      />

      <AccumulatedChart
        data={analysis.adjusted.data}
        targetOrders={targetOrders}
      />

      <CodeOutput
        targetOrders={targetOrders}
        timeWindow={timeWindow}
        adjusted={analysis.adjusted}
      />

    </div>
  );
}
