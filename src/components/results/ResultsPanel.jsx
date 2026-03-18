import { Info, TrendingUp } from 'lucide-react';

/**
 * Shows original vs adjusted statistics and a fit-quality badge.
 *
 * Props:
 *  - original     { expectedOrders, maxRate, avgRate }
 *  - adjusted     { expectedOrders, scaleFactor, newBaseRate }
 *  - targetOrders {number}
 */
export function ResultsPanel({ original, adjusted, targetOrders }) {
  const diff = Math.abs(parseFloat(adjusted.expectedOrders) - targetOrders);
  const isPerfect = diff < 1;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Original */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Info size={18} className="text-orange-600" />
            Função Original
          </h4>
          <dl className="space-y-2 text-sm">
            <StatRow label="Pedidos Esperados" value={original.expectedOrders} accent="orange" large />
            <StatRow label="Taxa Máxima"        value={original.maxRate}        mono />
            <StatRow label="Taxa Média"         value={original.avgRate}        mono />
          </dl>
        </div>
      </div>

      {/* Adjusted */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <TrendingUp size={18} className="text-green-600" />
            Função Ajustada
          </h4>
          <dl className="space-y-2 text-sm">
            <StatRow
              label="Fator de Escala"
              value={`×${adjusted.scaleFactor}`}
              accent="green"
              large
              bg
            />
            <StatRow label="Nova Taxa Base"    value={adjusted.newBaseRate}    mono green />
            <StatRow
              label="Pedidos Esperados"
              value={adjusted.expectedOrders}
              accent="green"
              large
              border
            />
          </dl>
        </div>

        {/* Fit badge */}
        <div
          className={`mt-4 p-3 rounded-lg border-2 text-center ${
            isPerfect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
          }`}
        >
          <div className="text-2xl mb-1">{isPerfect ? '✅' : '⚠️'}</div>
          <p className="text-sm font-semibold">
            {isPerfect ? 'Perfeito!' : `Diferença: ${(parseFloat(adjusted.expectedOrders) - targetOrders).toFixed(1)}`}
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Internal helper — keeps template above readable
// ---------------------------------------------------------------------------
function StatRow({ label, value, accent, large, mono, bg, border, green }) {
  const valueClass = [
    large  ? 'text-xl font-bold'     : 'font-bold',
    mono   ? 'font-mono'             : '',
    accent === 'orange' ? 'text-orange-600' : '',
    accent === 'green'  ? 'text-green-600'  : '',
    green  ? 'text-green-700'        : '',
    border ? 'border-t-2 border-green-300 pt-2 mt-2' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={`flex justify-between items-center ${bg ? 'bg-white px-3 py-2 rounded' : ''}`}>
      <dt className="text-gray-600">{label}:</dt>
      <dd className={valueClass}>{value}</dd>
    </div>
  );
}
