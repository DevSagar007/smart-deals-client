import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

function CreateAProduct() {
  const { user } = useAuth();
  console.log("user", user);
  // State for all form fields
  const [formData, setFormData] = useState({
    title: "Yamaha Fz Guitar For Sale",
    category: "",
    minPrice: "",
    maxPrice: "",
    productCondition: "Brand New",
    usageTime: "",
    productImageURL: "",
    sellerName: "",
    sellerEmail: "",
    sellerContact: "",
    sellerImageURL: "",
    location: "",
    description: "",
    email: user.email
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio" && name === "productCondition") {
      setFormData((prev) => ({ ...prev, productCondition: value }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Submit logic here
    axios.post("http://localhost:3000/products", formData).then((data) => {
      console.log(data.data);
      if (data.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Your product has been created",
          icon: "success",
        });
      }
    });
  };

  const handleBack = () => {
    console.log("Navigate back");
  };

  return (
    <div className="bg-[#f6f7fb] min-h-screen py-10">
      <div className="w-[800px]  pt-10 pb-10 bg-white shadow-[0px_10px_20px_-12px_rgba(0,0,0,0.1)] rounded-lg p-6 mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-purple-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back To Products
        </button>

        {/* Page Title */}
        <h1 className="text-4xl font-extrabold leading-tight text-[#0d2342] mb-6">
          Create A Product
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="fieldset">
            <label className="fieldset-legend font-semibold text-gray-700">
              Title
            </label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              placeholder="e.g. Yamaha Fz Guitar for Sale"
              required
            />
          </div>

          {/* Category */}
          <div className="fieldset">
            <label className="fieldset-legend font-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              required
            >
              <option value="">Select a Category</option>
              <option value="guitars">Guitars</option>
              <option value="pianos">Pianos</option>
              <option value="drums">Drums</option>
              <option value="violins">Violins</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="fieldset">
              <label className="fieldset-legend font-semibold text-gray-700">
                Min Price ($)
              </label>
              <input
                name="minPrice"
                type="number"
                step="0.01"
                value={formData.minPrice}
                onChange={handleChange}
                className="input input-bordered w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="e.g. 18.5"
                required
              />
            </div>
            <div className="fieldset">
              <label className="fieldset-legend font-semibold text-gray-700">
                Max Price ($)
              </label>
              <input
                name="maxPrice"
                type="number"
                step="0.01"
                value={formData.maxPrice}
                onChange={handleChange}
                className="input input-bordered w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="Optional (default = Min Price)"
              />
              <span className="text-xs text-gray-500">
                Optional (default = Min)
              </span>
            </div>
          </div>

          {/* Product Condition */}
          <div className="fieldset">
            <label className="fieldset-legend font-semibold text-gray-700">
              Product Condition
            </label>
            <div className="flex flex-wrap gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="productCondition"
                  value="Brand New"
                  checked={formData.productCondition === "Brand New"}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                <span>Brand New</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="productCondition"
                  value="Used"
                  checked={formData.productCondition === "Used"}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                <span>Used</span>
              </label>
            </div>
          </div>

          {/* Usage Time */}
          <div className="fieldset">
            <label className="fieldset-legend font-semibold text-gray-700">
              Product Usage time
            </label>
            <input
              name="usageTime"
              type="text"
              value={formData.usageTime}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              placeholder="e.g. 1 year 3 month"
            />
          </div>

          {/* Product Image URL */}
          <div className="fieldset">
            <label className="fieldset-legend font-semibold text-gray-700">
              Your Product Image URL
            </label>
            <input
              name="productImageURL"
              type="url"
              value={formData.productImageURL}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              placeholder="https://..."
            />
          </div>

          {/* Seller Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="fieldset">
              <label className="fieldset-legend font-semibold text-gray-700">
                Seller Name
              </label>
              <input
                name="sellerName"
                type="text"
                value={formData.sellerName}
                onChange={handleChange}
                className="input input-bordered w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="e.g. Artisan Roasters"
                required
              />
            </div>
            <div className="fieldset">
              <label className="fieldset-legend font-semibold text-gray-700">
                Seller Email
              </label>
              <input
                name="sellerEmail"
                type="email"
                value={formData.sellerEmail}
                onChange={handleChange}
                className="input input-bordered w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="leli31955@nrlord.com"
                required
              />
            </div>
          </div>

          {/* Seller Contact */}
          <div className="fieldset">
            <label className="fieldset-legend font-semibold text-gray-700">
              Seller Contact
            </label>
            <input
              name="sellerContact"
              type="text"
              value={formData.sellerContact}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              placeholder="e.g. +1-555-1234"
            />
          </div>

          {/* Seller Image URL */}
          <div className="fieldset">
            <label className="fieldset-legend font-semibold text-gray-700">
              Seller Image URL
            </label>
            <input
              name="sellerImageURL"
              type="url"
              value={formData.sellerImageURL}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              placeholder="https://..."
            />
          </div>

          {/* Location */}
          <div className="fieldset">
            <label className="fieldset-legend font-semibold text-gray-700">
              Location
            </label>
            <input
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              placeholder="City, Country"
            />
          </div>

          {/* Description */}
          <div className="fieldset">
            <label className="fieldset-legend font-semibold text-gray-700">
              Simple Description about your Product
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="textarea textarea-bordered w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-y"
              placeholder="e.g. I bought this product 3 month ago..."
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2.5 rounded-lg border-2 border-purple-600 font-semibold text-purple-600 transition hover:bg-purple-600 hover:text-white hover:shadow-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 font-semibold text-white transition hover:opacity-90 hover:shadow-lg"
            >
              Create A Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAProduct;
