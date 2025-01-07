import { Heart, ArrowRight, Clock, DollarSign, Tag, Flame } from 'lucide-react';
import { useEffect, useState } from 'react';

const DonationCard = ({ campaigns, amount }) => {
    const [campaign, setCampaign] = useState(null);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        fetch(`https://batch-10-assignment-10-server.vercel.app/campaigns/${campaigns}`)
            .then((res) => res.json())
            .then((data) => setCampaign(data))
            .catch((error) => console.error("Failed to fetch campaign:", error));
    }, [campaigns]);

    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2">
            {/* Card Inner Shadow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            
            {/* Image Container */}
            <div className="relative overflow-hidden">
                <div className="relative h-48">
                    {/* Image with Zoom Effect */}
                    <img
                        src={campaign?.image}
                        alt={campaign?.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Like Button */}
                    <button 
                        onClick={() => setIsLiked(!isLiked)}
                        className="absolute top-4 right-4 p-2 backdrop-blur-md bg-white/10 rounded-full transform transition-all duration-300 hover:scale-110 hover:bg-white/20"
                    >
                        <Heart 
                            className={`w-5 h-5 transition-colors duration-300 ${
                                isLiked ? 'text-red-500 fill-red-500' : 'text-white'
                            }`}
                        />
                    </button>

                    {/* Campaign Type Badge */}
                    <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 text-white text-sm font-medium">
                            <Tag className="w-4 h-4" />
                            {campaign?.type}
                        </div>
                    </div>

                    {/* Deadline Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                            {new Date(campaign?.deadline).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
                {/* Title with Line Clamp */}
                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {campaign?.title}
                </h3>

                {/* Donation Information */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Minimum Donation</p>
                        <div className="flex items-center gap-1 text-primary font-bold">
                            <DollarSign className="w-4 h-4" />
                            <span>{campaign?.minDonation}</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Your Contribution</p>
                        <div className="flex items-center gap-1 text-primary font-bold">
                            <Flame className="w-4 h-4" />
                            <span>${amount}</span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <button className="relative w-full overflow-hidden group/button">
                    <div className="relative px-6 py-3 bg-primary rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-transform duration-300 group-hover/button:-translate-y-[120%]">
                        <span>View Details</span>
                        <ArrowRight className="w-5 h-5" />
                    </div>
                    <div className="absolute inset-0 px-6 py-3 bg-primary rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-transform duration-300 translate-y-[120%] group-hover/button:translate-y-0">
                        <span>Explore More</span>
                        <ArrowRight className="w-5 h-5 animate-bounce-x" />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default DonationCard;

// Add this to your CSS/Tailwind config
const customStyles = `
@keyframes bounce-x {
    0%, 100% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(25%);
    }
}
.animate-bounce-x {
    animation: bounce-x 1s infinite;
}
`;