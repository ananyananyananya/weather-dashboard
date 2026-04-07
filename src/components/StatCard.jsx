export default function StatCard({ label, value, unit }) {
  return (
    <div className="card">
      <span className="card-label">{label}</span>
      <span className="card-value">{value}<span className="card-unit"> {unit}</span></span>
    </div>
  )
}