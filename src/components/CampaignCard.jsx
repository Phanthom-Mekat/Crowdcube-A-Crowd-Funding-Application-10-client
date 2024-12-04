/* eslint-disable react/prop-types */

import { Heart, ArrowRight, Clock } from 'lucide-react';

const CampaignCard = ({ campaign }) => {
    return (
        <div className="group relative bg-white border-2 border-gray-100 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            {/* Gradient Overlay & Image */}
            <div className="relative">
                <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="h-48 w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Favorite Button */}
                <button className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/40 transition-colors">
                    <Heart className="text-white w-5 h-5 fill-current" />
                </button>
            </div>

            {/* Card Content */}
            <div className="p-5 space-y-3">
                {/* Campaign Type & Deadline */}
                <div className="flex justify-between items-center">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                        {campaign.type}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(campaign.deadline).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Campaign Title */}
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                    {campaign.title}
                </h3>
                {/* Donation Details */}
                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-700">
                        Min Donation: <span className="font-semibold text-primary">${campaign.minDonation}</span>
                    </div>
                </div>

                {/* See More Button */}
                <button className="w-full flex items-center justify-center bg-primary text-white py-3 rounded-lg hover:bg-primary-focus transition-colors group/button">
                    See More
                    <ArrowRight className="ml-2 w-5 h-5 transform group-hover/button:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default CampaignCard;