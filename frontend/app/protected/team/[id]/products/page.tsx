import React from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

// interface Props {
//   params: { id: string };
// }

const fakeProducts = [
  {
    id: "1",
    title: "Smart Vacuum Cleaner",
    description: "Cleans your home automatically and efficiently.",
    status: "Draft",
    createdAt: "2025-05-20T10:30:00Z",
    createdBy: "alice@example.com",
  },
  {
    id: "2",
    title: "Eco-Friendly Water Bottle",
    description: "Reusable, BPA-free, and stylish.",
    status: "Active",
    createdAt: "2025-05-12T09:15:00Z",
    createdBy: "bob@example.com",
  },
  {
    id: "3",
    title: "Wireless Charger Stand",
    description: "Charge your phone with ease using Qi wireless tech.",
    status: "Deleted",
    createdAt: "2025-04-25T14:00:00Z",
    createdBy: "charlie@example.com",
  },
  {
    id: "4",
    title: "Smart LED Bulb",
    description: "Color-changing and voice-controlled via app.",
    status: "Draft",
    createdAt: "2025-05-30T16:45:00Z",
    createdBy: "diana@example.com",
  },
  {
    id: "5",
    title: "Noise Cancelling Headphones",
    description: "Experience immersive sound and peace.",
    status: "Active",
    createdAt: "2025-05-22T11:10:00Z",
    createdBy: "eve@example.com",
  },
];

const ProductsPage = async () => {
  // const { data, total, perPage } = await getProducts({});

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <DataTable data={fakeProducts} columns={columns} />
    </>
  );
};

export default ProductsPage;
