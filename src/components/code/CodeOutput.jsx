import { generatePoissonCode } from '../../utils/codeParser';

/**
 * Renders the generated Python code with a copy-to-clipboard button.
 *
 * Props:
 *  - targetOrders  {number}
 *  - timeWindow    {number}
 *  - adjusted      { newBaseRate, adjustedPeaks }
 */
export function CodeOutput({ targetOrders, timeWindow, adjusted }) {
  const code = generatePoissonCode({
    targetOrders,
    timeWindow,
    newBaseRate: adjusted.newBaseRate,
    adjustedPeaks: adjusted.adjustedPeaks,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert('✅ Código copiado!');
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Código Python Ajustado</h3>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          📋 Copiar Código
        </button>
      </div>
      <pre className="text-green-400 text-sm overflow-x-auto leading-relaxed">{code}</pre>
    </div>
  );
}
