import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function processPaymentFailure(stripeSubscriptionId: string) {
  // 1. Obtener datos de la suscripción y su cliente asociado
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('id, customer_id')
    .eq('stripe_subscription_id', stripeSubscriptionId)
    .single();

  if (!sub) return { error: "Suscripción no encontrada" };

  // 2. Actualizar estado a past_due (pago pendiente/vencido)
  await supabase
    .from('subscriptions')
    .update({ status: 'past_due', failed_at: new Date().toISOString() })
    .eq('id', sub.id);

  // 3. Registrar el primer paso del motor de recuperación (Step 0)
  await supabase.from('recovery_logs').insert({
    subscription_id: sub.id,
    step: 0,
    status: 'sent',
    update_url: `https://tu-app.com/update-payment/${sub.id}`
  });

  return { success: true, message: "Flujo de recuperación iniciado correctamente" };
}
