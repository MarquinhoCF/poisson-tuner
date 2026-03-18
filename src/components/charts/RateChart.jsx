import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';

/**
 * Dual-line chart comparing original vs adjusted arrival rates.
 *
 * Props:
 *  - data         {Array}  [{ time, original, adjusted }]
 *  - avgRateGoal  {number} targetOrders / timeWindow — shown as dashed reference
 */
export function RateChart({ data, avgRateGoal }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Taxa de Chegada ao Longo do Tempo
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="time"
            label={{ value: 'Tempo (min)', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            label={{ value: 'Taxa (pedidos/min)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '2px solid #ddd' }}
            formatter={(value) => value.toFixed(4)}
          />
          <Legend />
          <ReferenceLine
            y={avgRateGoal}
            stroke="#888"
            strokeDasharray="5 5"
            label="Taxa Média Necessária"
          />
          <Line
            type="monotone"
            dataKey="original"
            stroke="#ff6b6b"
            strokeWidth={2.5}
            dot={false}
            name="Taxa Original"
          />
          <Line
            type="monotone"
            dataKey="adjusted"
            stroke="#51cf66"
            strokeWidth={2.5}
            dot={false}
            name="Taxa Ajustada"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
