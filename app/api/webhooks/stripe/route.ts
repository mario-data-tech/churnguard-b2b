import { processPaymentFailure } from "@/lib/recovery";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    // Aquí en producción se debe verificar la firma de Stripe (Stripe-Signature)
    const event = JSON.parse(body); 

    // Solo nos interesa cuando un pago falla
    if (event.type === 'invoice.payment_failed') {
      const subId = event.data.object.subscription;
      const result = await processPaymentFailure(subId);
      
      return new Response(JSON.stringify({ success: true, result }), { status: 200 });
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error en el webhook" }), { status: 500 });
  }
}
