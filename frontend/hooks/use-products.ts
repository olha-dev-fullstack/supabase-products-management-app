import { requestClient } from "@/lib/request-client";
import { useUser } from "./use-user";

export const useProducts = () => {
    const {session} = useUser();
    const createProduct = async ({
        title,
        description,
        imageUrl,
    }: {
        title: string;
        description?: string;
        imageUrl?: string;
    }) => {
        try {
        const {data: createdProduct} = await requestClient.post(
            "/create-product",
            {
                title, description, imageUrl
            }, 
            {
                headers: {
                  Authorization: `Bearer ${session?.access_token}`,
                },
              }
        );
        return createdProduct;
    } catch (error) {
        console.log(error.message);
      }
    };

    const getProducts = async () => {    
        try {
          const { data: productsData } = await requestClient.get(
            `/get-products`,
            {
              headers: {
                Authorization: `Bearer ${session?.access_token}`,
              },
            }
          );
         return productsData;
        } catch (error) {
          console.log(error.message);
        }
      }
    return { createProduct, getProducts };
}