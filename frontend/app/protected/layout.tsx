const ProtectedPagesLayout = ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) => {
  return <div className="p-0 w-full">{children}</div>;
};

export default ProtectedPagesLayout;
