/**
 * Reusable labeled numeric input.
 *
 * Props:
 *  - label    {string}
 *  - value    {number}
 *  - onChange {(value: number) => void}
 *  - step     {number}  default 1
 *  - min      {number}  default 0
 */
export function InputField({ label, value, onChange, step = 1, min = 0 }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        step={step}
        min={min}
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg font-semibold"
      />
    </div>
  );
}
