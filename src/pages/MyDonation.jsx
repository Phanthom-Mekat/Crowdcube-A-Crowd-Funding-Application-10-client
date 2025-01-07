import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import DonationCard from "../components/DonationCard";
import { HeartHandshake, Loader2, SearchX, BarChart3 } from 'lucide-react';

const MyDonation = () => {
    const { user } = useContext(AuthContext);
    const [myDonation, setMyDonation] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://batch-10-assignment-10-server.vercel.app/donate/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setMyDonation(data);
                    // Calculate total donation amount
                    const total = data?.reduce((sum, donation) => sum + parseFloat(donation.amount), 0) || 0;
                    setTotalAmount(total);
                })
                .catch((error) => {
                    console.error("Failed to fetch campaigns:", error);
                    setMyDonation([]);
                });
        }
    }, [user?.email]);

    const DonationStats = () => (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <HeartHandshake className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Donations</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {myDonation?.length || 0}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <BarChart3 className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            ${totalAmount.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const LoadingState = () => (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400">Loading your donations...</p>
        </div>
    );

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <SearchX className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Donations Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                You haven't made any donations yet. When you do, they'll appear here.
            </p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-2">
                            My Donations
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-center">
                            Track all your generous contributions in one place
                        </p>
                    </div>

                    {myDonation?.length > 0 && <DonationStats />}

                    {myDonation === null ? (
                        <LoadingState />
                    ) : myDonation?.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myDonation.map((donation) => (
                                <div key={donation._id} className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                    <DonationCard 
                                        campaigns={donation.campaignId} 
                                        amount={donation.amount} 
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyDonation;