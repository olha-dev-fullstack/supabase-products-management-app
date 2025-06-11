import { requestClient } from "@/lib/request-client";
import { useUser } from "./use-user";
import { getFileUrl } from "@/app/fileActions";
export enum StatusEnum {
  ACTIVE = "Active",
  DRAFT = "Draft",
  DELETED = "Deleted",
}
export const useProducts = () => {
  const { session } = useUser();
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
      const { data: createdProduct } = await requestClient.post(
        "/create-product",
        {
          title,
          description,
          imageUrl,
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
      throw error;

    }
  };

  const getProducts = async (pageIndex = 1, pageSize = 10) => {
    try {
      const { data: productsData } = await requestClient.get(`/get-products?page=${pageIndex+1}&pageSize=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      const transformed = await Promise.all(
        productsData.result.map(async (product) => ({
          ...product,
          imageUrl: product.imageUrl
            ? await getFileUrl(product.imageUrl)
            : null,
        }))
      );

      return {data: transformed, totalPages: productsData.totalPages};
    } catch (error) {
      console.log(error.message);
      throw error;

    }
  };

  const editProduct = async ({
    id,
    data: { title, status, description, imageUrl },
  }: {
    id: string;
    data: {
      title?: string;
      status?: StatusEnum;
      description?: string;
      imageUrl?: string;
    };
  }) => {
    try {
      const { data: updatedProduct } = await requestClient.patch(
        "/update-product",
        {
          id,
          data: {
            title,
            status,
            description,
            imageUrl,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      return updatedProduct;
    } catch (error) {
      console.log(error.message);
      throw error;

    }
  };
  return { createProduct, getProducts, editProduct };
};
