import { useState } from 'react';
import { Upload } from 'lucide-react';
import { parsePoissonCode } from '../../utils/codeParser';

/**
 * Text area + button for importing a PoissonOrderGenerator Python snippet.
 * Calls onImport({ targetOrders, timeWindow, baseRate, peaks }) on success.
 *
 * Props:
 *  - onImport (config) => void
 */
export function CodeImporter({ onImport }) {
  const [code, setCode] = useState('');

  const handleParse = () => {
    const result = parsePoissonCode(code);

    if (!result) {
      alert('❌ Erro ao parsear código. Verifique o formato.');
      return;
    }

    onImport(result);
    const peakCount = result.peaks?.length ?? 0;
    alert(`✅ Código parseado com sucesso!\n${peakCount} pico(s) detectado(s)`);
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <Upload size={20} className="text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-800">Importar Código</h3>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Cole aqui o código do PoissonOrderGenerator..."
        className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
      />

      <button
        onClick={handleParse}
        className="mt-3 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
      >
        <Upload size={18} />
        Parsear e Carregar
      </button>
    </div>
  );
}
