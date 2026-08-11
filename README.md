​ChurnGuard B2B — Documento de Especificaciones Técnicas y Due Diligence
​Versión: 1.0
Estado: MVP técnico / arquitectura preparada para evolución comercial
​1. Resumen Ejecutivo
​ChurnGuard B2B es un micro-SaaS diseñado para reducir el churn involuntario en negocios de suscripción. Detecta fallos de cobro recurrente mediante webhooks y activa una secuencia automatizada de recuperación (0h, 24h, 72h).
​Métricas clave:
​Ingresos en riesgo.
​Ingresos recuperados.
​Tasa de éxito de recuperación.
​2. Arquitectura Técnica
​Stack: Next.js (App Router), Supabase (PostgreSQL), Stripe API.
​Flujo: Las pasarelas de pago envían webhooks, nuestro motor procesa el fallo, actualiza la base de datos y dispara notificaciones.
​3. Modelo de Datos
​tenants: Organizaciones usuarias.
​customers: Clientes finales del SaaS.
​subscriptions: Estados de facturación.
​recovery_logs: Historial de intentos de cobro y recuperación.
​4. Seguridad y Privacidad
​Arquitectura Card-Data-Free: No almacenamos números de tarjeta ni datos sensibles.
​Seguridad: Uso de firmas de webhooks (Stripe-Signature) y gestión de secretos en entorno de servidor.
​5. Flujos de Automatización
​Detección: invoice.payment_failed de Stripe.
​Acción: Registro en DB y envío de email con enlace de actualización.
​Recuperación: Al recibir invoice.paid, se marca la suscripción como activa y se audita el log de recuperación.
​6. Escalabilidad y Roadmap
​Fase 1 (MVP): Validación actual con Stripe y Supabase.
​Fase 2 (Comercial): Auth, Stripe Billing Portal, gestión de planes.
​Fase 3 (Intelligence): Optimización de tiempos de reintento y A/B testing.
​Fase 4 (Multi-PSP): Integración con otras pasarelas (Paddle, MercadoPago).
