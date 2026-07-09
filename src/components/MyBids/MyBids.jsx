import { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);
  console.log("bids", bids);
  console.log("user check", user);
  console.log('token', user.accessToken)

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?.=${user.email}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("my bids data", data);
          setBids(data);
        });
    }
  }, [user?.email]);

  const handleDeleteBid = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Delete bids data", data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              // reaming bids 
              const reamingBids = bids.filter(bid => bid._id !== _id)
              setBids(reamingBids)
            }
          });
      console.log("Now delete");
    });
  };

  return (
    <div className="px-5">
      <h2 className="text-4xl font-bold text-slate-900 my-8 text-center">
        My Bids <span className="text-purple-500"> {bids.length}</span>
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
              <th className="px-5 py-4 font-medium">Status</th>
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

                      <p className="text-xs text-gray-500">{bid.buyer_email}</p>
                    </div>
                  </div>
                </td>

                {/* Bid Price */}
                <td className="px-5 py-4 font-semibold text-gray-900">
                  ${bid.bid_price}
                </td>

                {/* Bid Price */}
                <td className="px-5 py-4 font-semibold text-gray-900">
                  <span
                    className={`px-3 py-1 rounded-2xl text-xs text-white ${
                      bid.status === "pending"
                        ? "bg-[#FFC107]"
                        : bid.status === "success"
                          ? "bg-green-500"
                          : "bg-red-500"
                    }`}
                  >
                    {bid.status}
                  </span>
                </td>

                {/* Status / Actions */}
                <td className="px-5 py-4">
                  <button
                    onClick={() => handleDeleteBid(bid._id)}
                    className="rounded border border-warning px-3 py-1 text-xs font-medium text-warning transition hover:bg-warning hover:text-white"
                  >
                    Remove Bid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
