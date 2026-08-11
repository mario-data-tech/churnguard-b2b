import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function processPaymentFailure(stripeSubscriptionId: string) {
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('id, customer_id')
    .eq('stripe_subscription_id', stripeSubscriptionId)
    .single();

  if (!sub) return { error: "Suscripción no encontrada" };

  await supabase
    .from('subscriptions')
    .update({ status: 'past_due', failed_at: new Date().toISOString() })
    .eq('id', sub.id);

  await supabase.from('recovery_logs').insert({
    subscription_id: sub.id,
    step: 0,
    status: 'sent',
    update_url: `https://tu-app.com/update-payment/${sub.id}`
  });

  return { success: true, message: "Flujo de recuperación iniciado correctamente" };
}
