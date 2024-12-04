import { useLoaderData } from "react-router-dom";
import CampaignCard from "../components/CampaignCard";
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                    {campaigns.map((campaign) => (
                        <CampaignCard key={campaign._id} campaign={campaign} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllCampaign;
