import { Calculator, RefreshCw } from 'lucide-react';

/**
 * Top header bar.
 *
 * Props:
 *  - onReset () => void
 */
export function AppHeader({ onReset }) {
  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calculator className="text-blue-600" size={32} />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Analisador de Função de Taxa</h2>
            <p className="text-gray-600 text-sm mt-1">
              Cole seu código ou ajuste manualmente cada pico
            </p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw size={18} />
          Restaurar
        </button>
      </div>
    </div>
  );
}
