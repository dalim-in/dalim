
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="-mt-14"> 
      <div >{children}</div>
    </div>
  )
}
