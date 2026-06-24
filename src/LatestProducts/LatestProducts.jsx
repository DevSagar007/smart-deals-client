import { use } from "react";
import Product from "../Product/Product";

function LatestProducts({ latestProductsPromise }) {
  const products = use(latestProductsPromise);

  console.log("Products:", products);

  return (
    <div>
      <section className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-slate-900">
              Recent <span className="text-[#632EE3]">Products</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <button className="primary-btn">Show All</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LatestProducts;
