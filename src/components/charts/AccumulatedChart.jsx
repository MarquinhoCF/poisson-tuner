import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';

/**
 * Area chart showing cumulative expected orders over time.
 *
 * Props:
 *  - data         {Array}   [{ time, expectedOrders }]
 *  - targetOrders {number}
 */
export function AccumulatedChart({ data, targetOrders }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Pedidos Acumulados</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="time"
            label={{ value: 'Tempo (min)', position: 'insideBottom', offset: -5 }}
          />
          <YAxis label={{ value: 'Pedidos', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <ReferenceLine
            y={targetOrders}
            stroke="#51cf66"
            strokeDasharray="5 5"
            strokeWidth={2}
            label="Meta"
          />
          <Area
            type="monotone"
            dataKey="expectedOrders"
            stroke="#339af0"
            fill="#74c0fc"
            fillOpacity={0.6}
            name="Pedidos Esperados"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
