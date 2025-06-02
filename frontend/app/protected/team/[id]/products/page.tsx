import React from "react";
interface Props {
  params: { id: string };
}

const ProductsPage = ({ params: { id } }: Props) => {
  return <div>Products for team {id}</div>;
};

export default ProductsPage;
