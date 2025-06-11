const RootPagesLayout = ({
    children,
    params,
  }: Readonly<{
    children: React.ReactNode;
    params: Promise<{ id: string }>;
  }>) => {
    return <div className="p-10 w-full">{children}</div>;
  };
  
  export default RootPagesLayout;
  