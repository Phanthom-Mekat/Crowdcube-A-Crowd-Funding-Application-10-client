import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

import {  Trash2Icon } from "lucide-react";

const MyCampaign = () => {
    const { user } = useContext(AuthContext);
    const [campaigns, setCampaigns] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/campaigns/email/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setCampaigns(data);
                })
                .catch((error) => console.error("Failed to fetch campaigns:", error));
        }
    }, [user?.email]);

    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-12">My Campaigns</h1>

                {/* Loading State */}
                {campaigns === null && (
                    <div className="flex justify-center items-center">
                        <p className="text-lg text-gray-500">Loading campaigns...</p>
                    </div>
                )}

                {/* Empty State */}
                {campaigns?.length === 0 && (
                    <div className="flex justify-center items-center">
                        <p className="text-lg text-gray-500">No campaigns found.</p>
                    </div>
                )}

                {/* Campaign Table */}
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
                                            ${campaign?.minDonation?.toFixed(2)}
                                        </td>
                                        <td className="py-3 px-6">{campaign?.deadline}</td>
                                        <td className="py-3 px-6 text-center">
                                            <button
                                                className="btn bg-secondary btn-xs"
                                            >
                                              Update
                                            </button>
                                            <button><Trash2Icon className="w-6 h-6 inline ml-2 text-red-600 " /></button>
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
