const ProtectedPagesLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="p-0 w-full">{children}</div>;
};

export default ProtectedPagesLayout;
