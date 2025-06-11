"use client";
import { useProducts } from "@/hooks/use-products";
import { useUser } from "@/hooks/use-user";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { AddProductDialog } from "./components/add-product-dialog";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ProductsPage = () => {
  const router = useRouter();
  const { getProducts } = useProducts();
  const { session } = useUser();
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 5;

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["products", pageIndex],
    queryFn: () => getProducts(pageIndex, pageSize),
    enabled: !!session,
    retry: false,
    placeholderData: keepPreviousData
  });

  if (isError || error) {
    toast.error(error.message);
    if (axios.isAxiosError(error)) {
      if (error.status === 403) {
        router.push("/protected/team");
      }
    }
    return <div>Error</div>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {data && (
        <>
          <DataTable data={data.data} columns={columns} pageIndex={pageIndex} setPageIndex={setPageIndex} pageSize={pageSize} totalPages={data.totalPages}/>
          <AddProductDialog />
        </>
      )}
    </div>
  );
};

export default ProductsPage;
