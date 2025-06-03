import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', users: 30 },
  { name: 'Feb', users: 50 },
  { name: 'Mar', users: 80 },
];

export function Chart() {
  return (
    <LineChart width={300} height={200} data={data}>
      <CartesianGrid stroke="#eee" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="users" stroke="#8884d8" />
    </LineChart>
  );
}
