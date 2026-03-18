import { TrendingUp } from 'lucide-react';
import { InputField } from './InputField';

/**
 * Panel for editing time window, target orders, and base rate.
 */
export function GlobalParams({ timeWindow, targetOrders, baseRate, onChange }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <TrendingUp size={20} className="text-green-600" />
        Parâmetros Globais
      </h3>

      <div className="space-y-4">
        <InputField
          label="Janela de Tempo (min)"
          value={timeWindow}
          onChange={(v) => onChange('timeWindow', v)}
          step={1}
          min={1}
        />
        <InputField
          label="Pedidos Desejados"
          value={targetOrders}
          onChange={(v) => onChange('targetOrders', v)}
          step={1}
          min={1}
        />
        <InputField
          label="Taxa Base (pedidos/min)"
          value={baseRate}
          onChange={(v) => onChange('baseRate', v)}
          step={0.01}
          min={0}
        />
      </div>
    </div>
  );
}
