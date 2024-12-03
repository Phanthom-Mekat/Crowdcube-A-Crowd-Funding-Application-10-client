import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import RunningCampaign from "../components/home/RunningCampaign";
import WhyChooseUs from "../components/home/WhyChooseUs";

const Home = () => {
    return (
        <div>
            <Hero/>
            <RunningCampaign/>
            <WhyChooseUs/>
            <HowItWorks/>

        </div>
    );
};

export default Home;