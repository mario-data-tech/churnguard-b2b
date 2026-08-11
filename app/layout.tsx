export const metadata = {
  title: 'ChurnGuard B2B',
  description: 'Micro-SaaS de recuperación de churn involuntario',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
