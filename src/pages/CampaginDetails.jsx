import { useLoaderData } from "react-router-dom";
import { Gift, User, Calendar, CreditCard } from 'lucide-react';

const CampaignDetails = () => {
    const campaignData = useLoaderData();
    const progressPercentage = Math.min((campaignData.currentAmount / campaignData.targetAmount) * 100, 100);

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Image Section */}
                    <div className="relative">
                        <img
                            src={campaignData.image}
                            alt={campaignData.title}
                            className="w-full rounded-2xl shadow-2xl object-cover h-[500px]"
                        />
                    </div>

                    {/* Campaign Details Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
                        <h1 className="text-2xl font-bold text-gray-800">{campaignData.title}</h1>

                        {/* Progress Bar */}
                        <div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                                <div 
                                    className="bg-primary h-2.5 rounded-full transition-all duration-500" 
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>${campaignData.currentAmount} raised</span>
                                <span>Goal: ${campaignData.targetAmount}</span>
                            </div>
                        </div>

                        {/* Campaign Info */}
                        <div className="space-y-4 text-sm">
                            <div className="flex items-center space-x-2">
                                <User className="w-5 h-5 text-primary" />
                                <span>{campaignData.userName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                <span>{campaignData.deadline}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Gift className="w-5 h-5 text-primary" />
                                <span>Minimum Donation: ${campaignData.minDonation}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {campaignData.description}
                        </p>

                        {/* Donation Button */}
                        <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-focus transition-colors flex items-center justify-center space-x-2">
                            <CreditCard className="w-5 h-5" />
                            <span>Donate Now</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetails;