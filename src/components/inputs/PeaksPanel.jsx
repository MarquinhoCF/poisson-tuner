import { Plus } from 'lucide-react';
import { PeakCard } from './PeakCard';

/**
 * Panel that lists all peaks and exposes add / remove / update controls.
 *
 * Props:
 *  - peaks          {Array}
 *  - adjustedPeaks  {Array}  from analysis.adjusted.adjustedPeaks
 *  - onAdd          () => void
 *  - onRemove       (index) => void
 *  - onUpdate       (index, field, value) => void
 */
export function PeaksPanel({ peaks, adjustedPeaks, onAdd, onRemove, onUpdate }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md lg:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Picos ({peaks.length})</h3>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          <Plus size={16} />
          Adicionar Pico
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {peaks.map((peak, index) => (
          <PeakCard
            key={index}
            peak={peak}
            index={index}
            adjustedIntensity={adjustedPeaks[index]?.adjustedIntensity}
            onUpdate={(field, value) => onUpdate(index, field, value)}
            onRemove={() => onRemove(index)}
            canRemove={peaks.length > 1}
          />
        ))}
      </div>
    </div>
  );
}
