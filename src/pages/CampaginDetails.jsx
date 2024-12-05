import { useLoaderData } from "react-router-dom";
import { Gift, User, Calendar, CreditCard } from 'lucide-react';
import { useContext, useState } from "react";
import { Toaster, toast } from 'react-hot-toast';
import { AuthContext } from "../provider/AuthProvider";

const CampaignDetails = () => {
    const { user } = useContext(AuthContext);
    const campaignData = useLoaderData();
    const [donationAmount, setDonationAmount] = useState(0);
    const progressPercentage = Math.min((campaignData?.minDonation / 1000) * 100, 100);

    const handleDonate = () => {
        const deadlineDate = new Date(campaignData?.deadline);
        const currentDate = new Date();

        if (currentDate > deadlineDate) {
            toast.error('Sorry, this campaign has ended. Donations are no longer accepted.', {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#ff4444',
                    color: 'white',
                    border: '1px solid #ff4444'
                }
            });
            return;
        }

        const donation = {
            userName: user?.displayName,
            userEmail: user?.email,
            campaignId: campaignData._id,
            amount: donationAmount
        };
        

        fetch('http://localhost:5000/donate', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(donation)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Donation successful!', {
                    duration: 4000,
                    position: 'top-center'
                });
            })
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <Toaster />
            
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Image Section */}
                    <div className="relative">
                        <img
                            src={campaignData?.image}
                            alt={campaignData?.title}
                            className="w-full rounded-2xl shadow-2xl object-cover h-[500px]"
                        />
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
                        <h1 className="text-2xl font-bold text-gray-800">{campaignData?.title}</h1>

                        <div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                                <div
                                    className="bg-primary h-2.5 rounded-full transition-all duration-500"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>$100 raised</span>
                                <span>Goal: $1000</span>
                            </div>
                        </div>

                        {/* Campaign Info */}
                        <div className="space-y-4 text-sm">
                            <div className="flex items-center space-x-2">
                                <User className="w-5 h-5 text-primary" />
                                <span>{campaignData?.userName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                <span>{campaignData?.deadline}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Gift className="w-5 h-5 text-primary" />
                                <span>Minimum Donation: ${campaignData?.minDonation}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {campaignData?.description}
                        </p>
                        <div className="flex items-center space-x-2 mb-4">
                            <input
                                type="number"
                                value={donationAmount}
                                onChange={(e) => setDonationAmount(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter donation amount"
                            />
                        </div>
                        <button 
                            onClick={handleDonate} 
                            className="w-full btn bg-primary text-white py-3 rounded-lg hover:bg-primary-focus transition-colors flex items-center justify-center space-x-2"
                        >
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