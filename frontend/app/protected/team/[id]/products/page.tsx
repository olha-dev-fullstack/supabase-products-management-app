"use client";
import { useProducts } from "@/hooks/use-products";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { AddProductDialog } from "./components/add-product-dialog";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

const ProductsPage = () => {
  const { getProducts } = useProducts();
  const { session } = useUser();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    enabled: !!session,
    retry: false
  });

  if (isError || error) {
    toast.error(error.message);
    if (axios.isAxiosError(error)) {
      if (error.status === 403) {
        redirect("/protected/team");
      }
    }
    return <div>Error</div>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(data);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {data && (
        <>
          <DataTable data={data} columns={columns} />
          <AddProductDialog />
        </>
      )}
    </div>
  );
};

export default ProductsPage;
