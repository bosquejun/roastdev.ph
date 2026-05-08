export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[80dvh] items-center justify-center px-4">
      {children}
    </div>
  )
}
