import { useQuery } from '@tanstack/react-query';


import { FaEye, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useState } from 'react';

const ApproveRiders = () => {
    const axiosSecure = UseAxiosSecure();
    const [selectedRider, setSelectedRider] = useState(null); // for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (rider) => {
        setSelectedRider(rider);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedRider(null);
        setIsModalOpen(false);
    };
    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    })

    const updateRiderStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.email }
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider status is set to ${status}.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleApproval = rider => {
        updateRiderStatus(rider, 'approved');
    }

    const handleRejection = rider => {
        updateRiderStatus(rider, 'rejected')
    }

    const handleDelete = id => {
        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/riders/${id}`)
                    .then(res => {
                        console.log(res.data);

                        if (res.data.deletedCount) {
                            // refresh the data in the ui
                            refetch();

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel request has been deleted.",
                                icon: "success"
                            });
                        }

                    })


            }
        });

    }

    return (
        <div>
            <h2 className="text-5xl">Riders Pending Approval: {riders.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Application Status</th>
                            <th>Work Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.district}</td>
                                <td>
                                    <p className={`${rider.status === 'approved' ? 'text-green-800' : 'text-red-500'}`}>{rider.status}</p>
                                </td>
                                <td>{rider.workStatus}</td>
                                <td>
                                    <button onClick={() => openModal(rider)} className='btn'>
                                        <FaEye />
                                    </button>
                                    <button
                                        onClick={() => handleApproval(rider)} className='btn'>
                                        <FaUserCheck />
                                    </button>
                                    <button
                                        onClick={() => handleRejection(rider)}
                                        className='btn'>
                                        <IoPersonRemoveSharp />
                                    </button>
                                    {rider.status === "pending" && (
                                        <button
                                            onClick={() => handleDelete(rider._id)}
                                            className="btn "
                                        >
                                            <FaTrashCan />
                                        </button>
                                    )}
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedRider && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl p-6 w-96 relative">
            <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={closeModal}
            >
                ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">Rider Details</h2>
            <p><strong>Name:</strong> {selectedRider.name}</p>
            <p><strong>Email:</strong> {selectedRider.email}</p>
            <p><strong>District:</strong> {selectedRider.district}</p>
            <p><strong>Status:</strong> {selectedRider.status}</p>
            <p><strong>Work Status:</strong> {selectedRider.workStatus}</p>
            <p><strong>Phone:</strong> {selectedRider.phone || 'N/A'}</p>
            <p><strong>Address:</strong> {selectedRider.address || 'N/A'}</p>
            {/* Add more fields as needed */}
        </div>
    </div>
)}

        </div>
    );
};

export default ApproveRiders;