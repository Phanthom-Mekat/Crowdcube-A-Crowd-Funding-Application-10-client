import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RunningCampaign = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/campaigns')
            .then((res) => res.json())
            .then((data) => {
                const runningCampaigns = data.filter((campaign) => {
                    const today = new Date();
                    const deadline = new Date(campaign.deadline);
                    return deadline >= today;
                });
                setCampaigns(runningCampaigns.slice(0, 6));
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-20">
                    Running Campaigns
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
                    {campaigns.map((campaign) => (
                        <div
                            key={campaign._id}
                            className="relative flex w-full flex-col rounded-xl border bg-blue-50 bg-clip-border text-gray-700 shadow-2xl"
                        >
                            <div className="relative mx-4 border-4 border-primary/20 -mt-6 h-40 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                                <img
                                    src={campaign.image}
                                    alt={campaign.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="p-6">
                                <h2 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                    {campaign.title}
                                </h2>
                                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                    {campaign.description.slice(0, 100)}...
                                </p>
                                <div className="text-sm text-gray-500 space-y-2 mt-2">
                                    <p>
                                        <span className="font-medium text-gray-700">Type:</span> {campaign.type}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-700">Min Donation:</span> ${campaign.minDonation}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-700">Deadline:</span>{" "}
                                        {new Date(campaign.deadline).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 pt-0">
                                <Link
                                    to={`/campaigns/${campaign._id}`}
                                    className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                >
                                    See More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RunningCampaign;
