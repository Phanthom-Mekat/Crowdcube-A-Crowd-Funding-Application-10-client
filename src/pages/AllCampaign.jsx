import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

const AllCampaign = () => {
    const loadedCampaigns = useLoaderData();
    const [campaigns, setCampaigns] = useState(loadedCampaigns);

    useEffect(() => {
        setCampaigns(loadedCampaigns);
    }, [loadedCampaigns]);

    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-12">All Campaigns</h1>
                <div className="overflow-x-auto">
                    <table className="table w-full bg-white shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Image</th>
                                <th className="py-3 px-6 text-left">Title</th>
                                <th className="py-3 px-6 text-left">Posted By</th>
                                <th className="py-3 px-6 text-left">Type</th>
                                <th className="py-3 px-6 text-left">Donation Amount</th>
                                <th className="py-3 px-6 text-center">Details</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {campaigns.map((campaign) => (
                                <tr
                                    key={campaign._id}
                                    className="border-b border-gray-200 hover:bg-gray-100"
                                >
                                    <td className="py-3 px-6 text-left flex items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={campaign.image}
                                                        alt={`${campaign.userName}'s campaign`}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{campaign?.name}</div>
                                                <div className="text-sm opacity-50">{campaign?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6">{campaign?.title}</td>
                                    <td className="py-3 px-6">{campaign?.userName}</td>
                                    <td className="py-3 px-6">{campaign?.type}</td>
                                    <td className="py-3 px-6">${campaign?.minDonation?.toFixed(3)}</td>
                                    <td className="py-3 px-6 text-center">
                                        <button className="btn bg-secondary btn-xs">
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllCampaign;
