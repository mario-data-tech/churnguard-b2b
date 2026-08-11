export default function Dashboard() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>ChurnGuard Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
          <h2>Ingresos en riesgo</h2>
          <p style={{ fontSize: '2rem' }}>$0.00</p>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
          <h2>Recuperados este mes</h2>
          <p style={{ fontSize: '2rem' }}>$0.00</p>
        </div>
      </div>
      <p style={{ marginTop: '2rem' }}>Sistema activo y escuchando eventos de Stripe.</p>
    </main>
  );
}
