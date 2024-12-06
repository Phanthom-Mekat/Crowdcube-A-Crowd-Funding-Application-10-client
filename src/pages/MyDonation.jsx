import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import DonationCard from "../components/DonationCard";
const MyDonation = () => {
    const { user } = useContext(AuthContext);
    const [myDonation, setMyDonation] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://batch-10-assignment-10-server.vercel.app/donate/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setMyDonation(data);
                })
                .catch((error) => console.error("Failed to fetch campaigns:", error));
        }
    }, [user?.email]);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-6">My Donation Campaigns</h1>
                {myDonation === null && (
                    <div className="flex justify-center items-center">
                        <div className="p-44 text-center text-2xl text-green-500"><span className="loading loading-dots loading-lg"></span></div>
                    </div>
                )}
                {myDonation?.length === 0 && (
                    <div className="flex justify-center items-center">
                        <p className="text-lg text-gray-500">No donation campaigns found.</p>
                    </div>
                )}
                {myDonation?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myDonation.map((campaigns) => (
                        <DonationCard key={campaigns._id} campaigns={campaigns.campaignId} amount={campaigns.amount} />
                    ))}
                </div>
                )}
            </div>
        </div>
    );
};

export default MyDonation;