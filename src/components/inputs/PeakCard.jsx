import { Trash2 } from 'lucide-react';

/**
 * Card for editing a single Gaussian peak.
 *
 * Props:
 *  - peak             { center, intensity, width }
 *  - index            {number}
 *  - adjustedIntensity {string}  formatted value from analysis
 *  - onUpdate         (field, value) => void
 *  - onRemove         () => void
 *  - canRemove        {boolean}
 */
export function PeakCard({ peak, index, adjustedIntensity, onUpdate, onRemove, canRemove }) {
  const fields = [
    { key: 'center',    label: 'Centro (min)', step: 1,    min: 0 },
    { key: 'intensity', label: 'Intensidade',  step: 0.01, min: 0 },
    { key: 'width',     label: 'Largura',      step: 50,   min: 1 },
  ];

  return (
    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-800">Pico {index + 1}</h4>
        {canRemove && (
          <button
            onClick={onRemove}
            className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
            aria-label={`Remover pico ${index + 1}`}
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-3 gap-3">
        {fields.map(({ key, label, step, min }) => (
          <div key={key}>
            <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
            <input
              type="number"
              value={peak[key]}
              onChange={(e) => onUpdate(key, e.target.value)}
              step={step}
              min={min}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
            />
          </div>
        ))}
      </div>

      {/* Adjusted preview */}
      <div className="mt-2 text-xs text-gray-600 font-mono bg-white px-2 py-1 rounded">
        Ajustado: intensidade = {adjustedIntensity}
      </div>
    </div>
  );
}
