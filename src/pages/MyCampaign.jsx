import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

import {  Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyCampaign = () => {
    const { user } = useContext(AuthContext);
    const [campaigns, setCampaigns] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://batch-10-assignment-10-server.vercel.app/campaigns/email/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setCampaigns(data);
                })
                .catch((error) => console.error("Failed to fetch campaigns:", error));
        }
    }, [user?.email]);  

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://batch-10-assignment-10-server.vercel.app/campaigns/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            const updatedCampaigns = campaigns.filter((campaign) => campaign._id !== id);
                            setCampaigns(updatedCampaigns);
                            Swal.fire(
                                'Deleted!',
                                'Your campaign has been deleted.',
                                'success'
                            );
                        }
                    })
                    .catch((error) => console.error("Failed to delete campaign:", error));
            }
        });
    };


    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-12">My Campaigns</h1>

                {campaigns === null && (
                    <div className="flex justify-center items-center">
                        <div className="p-44 text-center text-2xl text-green-500"><span className="loading loading-dots loading-lg"></span></div>
                    </div>
                )}

                {campaigns?.length === 0 && (
                    <div className="flex justify-center items-center">
                        <p className="text-lg text-gray-500">No campaigns found.</p>
                    </div>
                )}

                {campaigns?.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="table w-full bg-white shadow-lg rounded-lg">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Image</th>
                                    <th className="py-3 px-6 text-left">Title</th>
                                    <th className="py-3 px-6 text-left">Posted By</th>
                                    <th className="py-3 px-6 text-left">Type</th>
                                    <th className="py-3 px-6 text-left">Donation Amount</th>
                                    <th className="py-3 px-6 text-left">Deadline</th>
                                    <th className="py-3 px-6 text-center">Details</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {campaigns.map((campaign) => (
                                    <tr
                                        key={campaign._id}
                                        className="border-b border-gray-200 hover:bg-gray-100"
                                    >
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={campaign.image}
                                                            alt={`${campaign.userName}'s campaign`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">{campaign?.title}</td>
                                        <td className="py-3 px-6">{campaign?.userName}</td>
                                        <td className="py-3 px-6">{campaign?.type}</td>
                                        <td className="py-3 px-6">
                                            ${campaign?.minDonation}
                                        </td>
                                        <td className="py-3 px-6">{campaign?.deadline}</td>
                                        <td className="py-3 px-6 text-center">
                                            <Link
                                                to={`/updateCampaign/${campaign._id}`}
                                                className="btn bg-secondary btn-xs"
                                            >
                                              Update
                                            </Link>
                                            <button 
                                            onClick={() => handleDelete(campaign._id)}
                                            ><Trash2Icon className="w-6 h-6 inline ml-2 text-red-600 " /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCampaign;
