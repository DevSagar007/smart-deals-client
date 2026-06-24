import { Link } from "react-router";

function Product({ product }) {
  console.log("product", product);
  return (
    <>
      <div className="group flex h-full flex-col overflow-hidden rounded-lg bg-white p-3 shadow-[0px_10px_20px_-12px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-2">
        {/* Product Image */}
        <div className="mb-5 overflow-hidden rounded-xl bg-gray-100 aspect-[432/276]">
          <Link to={`/ProductDetails/${product?._id}`}>
            {" "}
            <img
              src={product?.image}
              alt={product?.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col">
          <h3 className="mb-2 line-clamp-2 text-xl font-medium text-slate-800">
            {product?.title}
          </h3>

          <p className="mb-5 text-xl font-semibold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
            ${product?.price_max} - ${product?.price_min}
          </p>

          {/* Button */}
          <Link
            to={`/ProductDetails/${product?._id}`}
            className="primary-outline-btn mt-auto"
          >
            View Details
          </Link>
        </div>
      </div>
    </>
  );
}

export default Product;
