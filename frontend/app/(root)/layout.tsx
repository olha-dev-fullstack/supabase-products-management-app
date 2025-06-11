import { Suspense } from "react";

const RootPagesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="p-10 w-full">
      <Suspense>{children}</Suspense>
    </div>
  );
};

export default RootPagesLayout;
