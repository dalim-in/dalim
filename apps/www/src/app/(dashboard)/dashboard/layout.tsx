interface ProtectedLayoutProps {
    children: React.ReactNode
}

export default async function Users({ children }: ProtectedLayoutProps) {
    return <div className="">{children}</div>
}
