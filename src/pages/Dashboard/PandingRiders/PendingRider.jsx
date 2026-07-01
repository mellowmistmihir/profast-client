import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";

const PendingRider = () => {
  const axiosSecure = UseAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  const { data: riders = [], isLoading, refetch } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  

  // Approve / Cancel handler
  const handleDecision = async (id, action, email) => {
    const isApprove = action === "approve";

    const result = await Swal.fire({
      title: isApprove ? "Approve Rider?" : "Cancel Rider?",
      text: isApprove
        ? "This rider will be approved"
        : "This rider will be cancelled",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isApprove ? "#16a34a" : "#dc2626",
      confirmButtonText: isApprove ? "Approve" : "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      // frontend থেকে email pathano
      await axiosSecure.patch(`/riders/${id}/${action}`, { email });

      Swal.fire({
        icon: "success",
        title: isApprove ? "Approved!" : "Cancelled!",
        timer: 1200,
        showConfirmButton: false,
      });

      setSelectedRider(null);
      refetch();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Something went wrong" });
      console.error(err);
    }
  };

  if (isLoading)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-left">Email</th>
              <th className="border px-3 py-2 text-left">Bike</th>
              <th className="border px-3 py-2 text-left">Phone</th>
              <th className="border px-3 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider._id}>
                <td className="border px-3 py-2">{rider.name}</td>
                <td className="border px-3 py-2">{rider.email}</td>
                <td className="border px-3 py-2">{rider.bikeName}</td>
                <td className="border px-3 py-2">{rider.number}</td>
                <td className="border px-3 py-2 text-center space-x-2">
                  <button
                    onClick={() => setSelectedRider(rider)}
                    className="text-blue-600 text-2xl hover:text-blue-800"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() =>
                      handleDecision(rider._id, "approve", rider.email)
                    }
                    className="text-green-600 text-2xl hover:text-green-800"
                  >
                    <FaCheckCircle />
                  </button>
                  <button
                    onClick={() =>
                      handleDecision(rider._id, "cancel", rider.email)
                    }
                    className="text-red-600 text-2xl hover:text-red-800"
                  >
                    <FaTimesCircle />
                  </button>
                </td>
              </tr>
            ))}
            {riders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No pending riders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRider && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className=" bg-gray-800 rounded-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setSelectedRider(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">Rider Details</h3>
            <div className="space-y-1 text-sm text-white">
              <p><b>Name:</b> {selectedRider.name}</p>
              <p><b>Email:</b> {selectedRider.email}</p>
              <p><b>Phone:</b> {selectedRider.number}</p>
              <p><b>Age:</b> {selectedRider.age}</p>
              <p><b>NID:</b> {selectedRider.nid}</p>
              <p><b>Bike:</b> {selectedRider.bikeName}</p>
              <p><b>Reg No:</b> {selectedRider.bikeRegistration}</p>
              <p>
                <b>Address:</b> {selectedRider.area}, {selectedRider.district}, {selectedRider.division}
              </p>
              <p>
                <b>Applied:</b>{" "}
                {new Date(selectedRider.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRider;
