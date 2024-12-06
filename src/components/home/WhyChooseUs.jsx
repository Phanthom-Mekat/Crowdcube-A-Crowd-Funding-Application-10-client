import { FaHandshake, FaShieldAlt,  FaGlobe, FaTrophy, FaHeart } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const WhyChooseUs = () => {
    const features = [
        {
            icon: <FaHandshake className="text-5xl text-primary transition-transform duration-300 group-hover:scale-110" />,
            title: "Trusted Platform",
            description: "Thousands of successful campaigns with millions raised for impactful causes.",
            bgColor: "bg-blue-50"
        },
        {
            icon: <FaShieldAlt className="text-5xl text-primary transition-transform duration-300 group-hover:scale-110" />,
            title: "Secure Transactions",
            description: "Advanced encryption ensures your donations are processed safely and transparently.",
            bgColor: "bg-green-50"
        },
        {
            icon: <DotLottieReact
                src="https://lottie.host/bb300e6e-c62e-4c98-8482-25d4e954f1f7/HWcirc4ZCY.lottie"
                loop
                autoplay
                style={{ width: '80px', height: '50px', background: 'transparent' }}
            />,
            title: "Fast & Easy Setup",
            description: "Launch campaigns in minutes with our intuitive, user-friendly interface.",
            bgColor: "bg-purple-50"
        },
        {
            icon: <FaGlobe className="text-5xl text-primary transition-transform duration-300 group-hover:scale-110" />,
            title: "Global Impact",
            description: "Connect with campaigns that create meaningful change across continents.",
            bgColor: "bg-indigo-50"
        },
        {
            icon: <FaTrophy className="text-5xl text-primary transition-transform duration-300 group-hover:scale-110" />,
            title: "Proven Success",
            description: "95% of campaigns on our platform successfully reach their funding goals.",
            bgColor: "bg-yellow-50"
        },
        {
            icon: <FaHeart className="text-5xl text-primary transition-transform duration-300 group-hover:scale-110" />,
            title: "Community-Driven",
            description: "Every donation supports real people and transformative community initiatives.",
            bgColor: "bg-red-50"
        }
    ];

    return (
        <section className="py-16  bg-white dark:bg-gray-800 text-black dark:text-white" data-aos="fade-up" >
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center mb-12 ">
                    Why Choose Our Platform - {' '}
                    <span className="text-primary">

                        <Typewriter
                            words={['Trusted', 'Secure', 'Fast', 'Easy!']}
                            loop={true}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </span>

                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group ${feature.bgColor} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-primary/20`}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-5 p-4 rounded-full bg-white shadow-md">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;