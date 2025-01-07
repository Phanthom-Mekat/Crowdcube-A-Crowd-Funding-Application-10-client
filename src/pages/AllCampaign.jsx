import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar, Users, DollarSign, ArrowUpDown, Clock } from 'lucide-react';

const AllCampaign = () => {
    const loadedCampaigns = useLoaderData();
    const [campaigns, setCampaigns] = useState(loadedCampaigns);
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        setCampaigns(loadedCampaigns);
    }, [loadedCampaigns]);

    const handleSort = () => {
        const sortedCampaigns = [...campaigns].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.minDonation - b.minDonation;
            } else {
                return b.minDonation - a.minDonation;
            }
        });
        setCampaigns(sortedCampaigns);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    // Function to calculate days remaining
    const getDaysRemaining = (deadline) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const timeDiff = deadlineDate.getTime() - today.getTime();
        const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysRemaining;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-black dark:text-white py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center mb-12">
                    <h1 className="text-4xl font-bold text-center mb-4">Discover Campaigns</h1>
                    <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl">
                        Join our community of changemakers and support incredible causes that make a difference in people's lives.
                    </p>
                    <button
                        onClick={handleSort}
                        className="btn bg-primary text-white gap-2 rounded-full hover:bg-primary/90 transition-all duration-300"
                    >
                        <ArrowUpDown className="w-4 h-4" />
                        Sort by Min Donation ({sortOrder === "asc" ? "Ascending" : "Descending"})
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {campaigns.map((campaign) => (
                        <div key={campaign._id} className="group">
                            <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                                {/* Image Container */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={campaign.image}
                                        alt={campaign.title}
                                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute top-4 right-4">
                                        <span className="px-4 py-1 bg-primary text-white rounded-full text-sm font-medium">
                                            {campaign.type}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                                            <img
                                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${campaign.userName}`}
                                                alt={campaign.userName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-sm">{campaign.userName}</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{campaign.userEmail}</p>
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-bold mb-3 line-clamp-2">{campaign.title}</h2>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                                        {campaign.description}
                                    </p>

                                    <div className="mt-auto space-y-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-primary" />
                                                <span className="font-semibold">${campaign.minDonation}</span>
                                                <span className="text-gray-500 dark:text-gray-400">min</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-primary" />
                                                <span className="font-semibold">{getDaysRemaining(campaign.deadline)}</span>
                                                <span className="text-gray-500 dark:text-gray-400">days left</span>
                                            </div>
                                        </div>

                                        <Link 
                                            to={`/campaigns/${campaign._id}`} 
                                            className="block w-full"
                                        >
                                            <button className="w-full btn btn-outline border-b-4 border-secondary  text-black dark:text-white hover:bg-primary/90 transition-all duration-300 rounded-lg">
                                                View Campaign
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllCampaign;