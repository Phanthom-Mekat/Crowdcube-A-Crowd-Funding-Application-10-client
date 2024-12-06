import { FaSignInAlt, FaPlusSquare, FaDonate } from "react-icons/fa";

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaSignInAlt className="text-5xl text-primary" />,
            title: "Quick Registration",
            description: "Create a verified profile in minutes. Link social media or use email, with advanced security protocols.",
            time: "2-3 mins"
        },
        {
            icon: <FaPlusSquare className="text-5xl text-primary" />,
            title: "Campaign Creation",
            description: "Use AI-guided templates to craft compelling campaigns. Set transparent goals and compelling storytelling elements.",
            time: "15-30 mins"
        },
        {
            icon: <FaDonate className="text-5xl text-primary" />,
            title: "Fundraising",
            description: "Share across networks, leverage platform's recommendation engine. Real-time analytics and instant fund transfers.",
            time: "Ongoing"
        }
    ];

    return (
        <section className="py-24 bg-white text-black dark:bg-gray-900 dark:text-white" data-aos="fade-up" >
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 ">
                    Launch Your Fundraising Journey
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div 
                            key={index} 
                            className="group relative bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-5 p-4 bg-white rounded-full shadow-sm">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {step.description}
                                </p>
                                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                                    Estimated Time: {step.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;