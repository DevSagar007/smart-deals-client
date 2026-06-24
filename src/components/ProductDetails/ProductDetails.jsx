import { useLoaderData } from "react-router";

function ProductDetails() {
  const product = useLoaderData();
  console.log("single product", product);
  return <div>ProductDetails</div>;
}

export default ProductDetails;
