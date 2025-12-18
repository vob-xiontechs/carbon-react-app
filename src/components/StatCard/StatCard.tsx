type Props = { title: string; value: string };

export default function StatCard({ title, value }: Props): JSX.Element {
  return (
    <div className="stat-card">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
