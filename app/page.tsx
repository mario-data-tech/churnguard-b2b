import { createClient } from '@supabase/supabase-js';

// Esto usa las variables de entorno que configuraremos en Vercel
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function Dashboard() {
  // Traemos los datos de las suscripciones que tienen deuda
  const { data: subs } = await supabase
    .from('subscriptions')
    .select('monthly_amount')
    .eq('status', 'past_due');

  const totalEnRiesgo = subs?.reduce((acc, curr) => acc + Number(curr.monthly_amount), 0) || 0;

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>ChurnGuard Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>Ingresos en riesgo</h2>
          <p style={{ fontSize: '2rem', color: '#d32f2f' }}>${totalEnRiesgo.toFixed(2)}</p>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>Recuperados este mes</h2>
          <p style={{ fontSize: '2rem', color: '#388e3c' }}>$0.00</p>
        </div>
      </div>
    </main>
  );
}
