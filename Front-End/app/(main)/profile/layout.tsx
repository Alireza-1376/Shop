export default function RootLayout({
    children,
    modal
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode
}>) {
    return (
        <div className="min-h-full flex flex-col">
            {children}
            {modal}
        </div>
    );
}
