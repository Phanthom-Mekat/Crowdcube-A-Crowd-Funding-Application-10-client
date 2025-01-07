import { useLoaderData } from "react-router-dom";
import { Gift, User, Calendar, CreditCard, LucideBriefcaseBusiness, Moon, Sun, Heart, Share2, Users, Clock, Target, Lightbulb } from 'lucide-react';
import { useContext, useState, useEffect } from "react";
import { Toaster, toast } from 'react-hot-toast';
import { AuthContext } from "../provider/AuthProvider";

const CampaignDetails = () => {
    const { user } = useContext(AuthContext);
    const campaignData = useLoaderData();
    const [donationAmount, setDonationAmount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const progressPercentage = Math.min((campaignData?.minDonation / 1000) * 100, 100);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDonate = () => {
        const deadlineDate = new Date(campaignData?.deadline);
        const currentDate = new Date();

        if (currentDate > deadlineDate) {
            toast.error('Sorry, this campaign has ended.');
            return;
        }

        if(donationAmount < campaignData?.minDonation) {
            toast.error(`Minimum donation amount is $${campaignData?.minDonation}`);
            return;
        }

        const donation = {
            userName: user?.displayName,
            userEmail: user?.email,
            campaignId: campaignData._id,
            amount: donationAmount
        };

        fetch('https://batch-10-assignment-10-server.vercel.app/donate', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(donation)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Thank you for your donation!');
            });
    };

    const daysLeft = Math.ceil((new Date(campaignData?.deadline) - new Date()) / (1000 * 60 * 60 * 24));

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 relative">
            <Toaster />
            
            {/* Floating Header - Appears on Scroll */}
            <div className={`fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg transform transition-all duration-300 z-50 ${
                scrolled ? 'translate-y-0 shadow-lg' : '-translate-y-full'
            }`}>
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{campaignData?.title}</h2>
                    <button 
                        onClick={handleDonate}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-focus transition-colors"
                    >
                        Donate Now
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                {/* Campaign Title Section */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                        {campaignData?.title}
                    </h1>
                    <div className="flex items-center justify-center space-x-4">
                        <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                            {campaignData?.type}
                        </span>
                        <span className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{daysLeft} days left</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Image Section */}
                    <div className="relative group">
                        {/* Campaign Stats Cards */}
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10 w-full max-w-md">
                            <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 transform transition-transform hover:-translate-y-1">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Users className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Supporters</p>
                                        <p className="text-xl font-bold text-gray-800 dark:text-white">138</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 transform transition-transform hover:-translate-y-1">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Target className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Target</p>
                                        <p className="text-xl font-bold text-gray-800 dark:text-white">$1000</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Image */}
                        <div className="mt-8 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="relative group">
                                <img
                                    src={campaignData?.image}
                                    alt={campaignData?.title}
                                    className="w-full h-[500px] object-cover transform transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                {/* Impact Stats */}
                                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3">
                                        <Lightbulb className="w-5 h-5 text-primary mb-1" />
                                        <p className="text-xs text-gray-600 dark:text-gray-400">{campaignData?.type}</p>
                                        <p className="text-lg font-bold text-gray-800 dark:text-white">50+</p>
                                    </div>
                                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3">
                                        <Users className="w-5 h-5 text-primary mb-1" />
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Supporters</p>
                                        <p className="text-lg font-bold text-gray-800 dark:text-white">5</p>
                                    </div>
                                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3">
                                        <Target className="w-5 h-5 text-primary mb-1" />
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Impact</p>
                                        <p className="text-lg font-bold text-gray-800 dark:text-white">200+</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute -bottom-6 right-4 flex space-x-3">
                            <button 
                                onClick={() => setIsLiked(!isLiked)}
                                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110"
                            >
                                <Heart className={`w-6 h-6 ${isLiked ? 'fill-primary text-primary' : 'text-gray-600 dark:text-gray-400'}`} />
                            </button>
                            <button className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110">
                                <Share2 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                        {/* Creator Info */}
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Campaign Creator</p>
                                <p className="font-semibold text-gray-800 dark:text-white">{campaignData?.userName}</p>
                            </div>
                        </div>

                        {/* Progress Section */}
                        <div className="mb-8">
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full relative transition-all duration-500"
                                    style={{ width: `${progressPercentage}%` }}
                                >
                                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                </div>
                            </div>
                            <div className="flex justify-between mt-2">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Raised</p>
                                    <p className="text-xl font-bold text-gray-800 dark:text-white">${campaignData?.minDonation}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Goal</p>
                                    <p className="text-xl font-bold text-primary">$1000</p>
                                </div>
                            </div>
                        </div>

                        {/* Campaign Details */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                <Calendar className="w-5 h-5 text-primary mb-2" />
                                <p className="text-sm text-gray-600 dark:text-gray-400">End Date</p>
                                <p className="font-medium text-gray-800 dark:text-white">{campaignData?.deadline}</p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                <Gift className="w-5 h-5 text-primary mb-2" />
                                <p className="text-sm text-gray-600 dark:text-gray-400">Minimum</p>
                                <p className="font-medium text-gray-800 dark:text-white">${campaignData?.minDonation}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">About This Campaign</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {campaignData?.description}
                            </p>
                        </div>

                        {/* Donation Form */}
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <span className="text-gray-500 dark:text-gray-400">$</span>
                                </div>
                                <input
                                    type="number"
                                    onChange={(e) => setDonationAmount(e.target.value)}
                                    className="w-full pl-8 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition-all duration-300"
                                    placeholder="Enter donation amount"
                                    required
                                />
                            </div>

                            <button 
                                onClick={handleDonate}
                                className="w-full p-4 bg-primary hover:bg-primary-focus text-white rounded-xl transform transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-3 group"
                            >
                                <CreditCard className="w-5 h-5 transform transition-transform group-hover:scale-110" />
                                <span className="font-medium">Donate Now</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetails;