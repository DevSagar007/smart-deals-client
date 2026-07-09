import { ArrowLeft } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

function ProductDetails() {
  const { _id: productId } = useLoaderData();
  const [bids, setBids] = useState([]);
  console.log("single product", productId);
  const bidModalRef = useRef(null);
  console.log("bids", bids);

  const { user } = use(AuthContext);
  console.log("user", user);

  // get product bids
  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${productId}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("bids for this product", data);
        setBids(data);
      });
  }, [productId, user]);

  const handleBidModal = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    const contactInfo = e.target.contact_info.value;

    console.log(name, email, bid, contactInfo);
    console.log("Submit clicked");
    const newBid = {
      product: productId,
      buyer_name: name,
      buyer_email: email?.photoURL,
      bid_price: bid,
      status: "pending",
    };

    console.log("newBid", newBid);
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your bid has been place",
            showConfirmButton: false,
            timer: 1500,
          });
          // added the new bids to the state
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
        }
      });
  };

  return (
    <>
      <div className="bg-[#f6f7fb] min-h-screen py-10">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left Side */}
            <div>
              {/* Product Image */}
              <div className="h-[420px] w-full overflow-hidden rounded-xl bg-gray-200">
                {/* Replace with your image */}
                {/* <img
                src="/guitar.jpg"
                alt="Product"
                className="h-full w-full object-cover"
              /> */}
              </div>

              {/* Description */}
              <div className="mt-5 rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-2xl font-bold text-slate-900">
                  Product Description
                </h2>

                <div className="mb-5 flex flex-wrap gap-10 border-b border-gray-300 pb-4">
                  <div>
                    <span className="text-sm font-semibold text-purple-600">
                      Condition :
                    </span>
                    <span className="ml-1 text-sm font-semibold text-slate-900">
                      New
                    </span>
                  </div>

                  <div>
                    <span className="text-sm font-semibold text-purple-600">
                      Usage Time :
                    </span>
                    <span className="ml-1 text-sm font-semibold text-slate-900">
                      3 Month
                    </span>
                  </div>
                </div>

                <p className="text-sm leading-7 text-gray-500">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                </p>

                <p className="mt-4 text-sm leading-7 text-gray-500">
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy.
                </p>

                <p className="mt-4 text-sm leading-7 text-gray-500">
                  Various versions have evolved over the years, sometimes by
                  accident, sometimes on purpose (injected humour and the like).
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div>
              {/* Back Button */}
              <button className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-purple-600">
                <ArrowLeft size={18} />
                Back To Products
              </button>

              {/* Title */}
              <h1 className="text-5xl font-extrabold leading-tight text-[#0d2342]">
                Yamaha Fz Guitar For Sale
              </h1>

              {/* Category */}
              <span className="mt-4 inline-block rounded-full bg-purple-100 px-4 py-1 text-xs font-semibold text-purple-600">
                Art And Hobbies
              </span>

              {/* Price Card */}
              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
                <h2 className="text-4xl font-bold text-green-500">
                  $22.5 - 30
                </h2>

                <p className="mt-1 text-sm text-gray-500">Price starts from</p>
              </div>

              {/* Product Details */}
              <div className="mt-5 rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-5 text-2xl font-bold text-slate-900">
                  Product Details
                </h3>

                <div className="space-y-3">
                  <p className="text-sm">
                    <span className="font-semibold text-slate-900">
                      Product ID:
                    </span>{" "}
                    <span className="text-gray-600">
                      68f753ae2174ca368ec882f4
                    </span>
                  </p>

                  <p className="text-sm">
                    <span className="font-semibold text-slate-900">
                      Posted:
                    </span>{" "}
                    <span className="text-gray-600">10/19/2024</span>
                  </p>
                </div>
              </div>

              {/* Seller */}
              <div className="mt-5 rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-5 text-2xl font-bold text-slate-900">
                  Seller Information
                </h3>

                <div className="flex gap-4">
                  <div className="h-14 w-14 rounded-full bg-gray-300"></div>

                  <div>
                    <h4 className="font-semibold text-slate-900">Sara Chen</h4>

                    <p className="text-sm text-gray-500">
                      crafts.by.sara@shop.net
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <p>
                    <span className="font-semibold text-slate-900">
                      Location:
                    </span>{" "}
                    <span className="text-gray-600">Los Angeles, CA</span>
                  </p>

                  <p>
                    <span className="font-semibold text-slate-900">
                      Contact:
                    </span>{" "}
                    <span className="text-gray-600">sara.chen_contact</span>
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">
                      Status:
                    </span>

                    <span className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-bold text-slate-900">
                      On Sale
                    </span>
                  </div>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={handleBidModal}
                className="mt-5 flex items-center justify-center h-14 py-4 text-base font-semibold cursor-pointer text-white w-full rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] transition-all duration-300 hover:opacity-90 hover:shadow-lg"
              >
                I Want Buy This Product
              </button>

              {/* Modal */}
              <dialog ref={bidModalRef} className="modal">
                <div className="modal-box max-w-2xl bg-base-100 p-8">
                  <h3 className="mb-8 text-center text-3xl font-bold">
                    Give Seller Your Offered Price
                  </h3>

                  <form onSubmit={handleBidSubmit} className="space-y-5">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">Buyer Name</legend>
                        <input
                          name="name"
                          type="name"
                          className="input input-bordered w-full"
                          readOnly
                          defaultValue={user?.displayName}
                        />
                      </fieldset>

                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">Buyer Email</legend>
                        <input
                          name="email"
                          type="email"
                          className="input input-bordered w-full"
                          readOnly
                          defaultValue={user?.email}
                        />
                      </fieldset>
                    </div>

                    {/* Image URL */}
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">
                        Buyer Image URL
                      </legend>
                      <input
                        type="url"
                        className="input input-bordered w-full"
                        placeholder="https://...your_img_url"
                      />
                    </fieldset>

                    {/* Offered Price */}
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">
                        Place your bid Price
                      </legend>
                      <input
                        name="bid"
                        type="number"
                        className="input input-bordered w-full"
                        placeholder="e.g. 250"
                      />
                    </fieldset>

                    {/* Contact */}
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Contact Info</legend>
                      <input
                        name="contact_info"
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="e.g. +1-555-1234"
                      />
                    </fieldset>

                    {/* Buttons */}
                    <div className="modal-action">
                      <button
                        onClick={() => {
                          bidModalRef.current.close();
                        }}
                        type="button"
                        className="rounded-lg border border-[var(--color-primary)] px-7 py-3 font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-primary)] hover:text-white"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-7 py-3 font-semibold text-white transition hover:opacity-90"
                      >
                        Submit Bid
                      </button>
                    </div>
                  </form>
                </div>

                {/* Click outside to close */}
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          </div>
        </div>
        <div className="max-w-7xl px-5 mx-auto pt-14">
          {/* < Heading */}
          <h2 className="text-4xl font-bold text-slate-900 mb-8">
            Bids For This Products:
            <span className="text-purple-500">{bids?.length}</span>
          </h2>

          {/* Table Card  */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-gray-600">
                  <th className="px-5 py-4 font-medium">SL No</th>
                  <th className="px-5 py-4 font-medium">Product</th>
                  <th className="px-5 py-4 font-medium">Seller</th>
                  <th className="px-5 py-4 font-medium">Bid Price</th>
                  <th className="px-5 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid, index) => (
                  <tr key={bid._id} className="transition hover:bg-gray-50">
                    {/* SL No */}
                    <td className="px-5 py-4 font-medium text-gray-700">
                      {index + 1}
                    </td>

                    {/* Product */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={bid?.product.image}
                          alt={bid?.product.title}
                          className="h-12 w-12 rounded-lg object-cover"
                        />

                        <div>
                          <h4 className="font-medium text-gray-900">
                            {bid?.product.title}
                          </h4>

                          <p className="text-xs text-gray-500">
                            ${bid?.product.price}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Buyer */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-semibold">
                          {bid.buyer_name.charAt(0)}
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900">
                            {bid.buyer_name}
                          </h5>

                          <p className="text-xs text-gray-500">
                            {bid.buyer_email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Bid Price */}
                    <td className="px-5 py-4 font-semibold text-gray-900">
                      ${bid.bid_price}
                    </td>

                    {/* Status / Actions */}
                    <td className="px-5 py-4">
                      {bid.status === "pending" ? (
                        <div className="flex gap-2">
                          <button className="rounded border border-green-500 px-3 py-1 text-xs font-medium text-green-600 transition hover:bg-green-500 hover:text-white">
                            Accept Offer
                          </button>

                          <button className="rounded border border-red-500 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-500 hover:text-white">
                            Reject Offer
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            bid.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {bid.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
