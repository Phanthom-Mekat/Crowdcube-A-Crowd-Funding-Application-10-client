import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        adaptiveHeight: true,
    };

    const slides = [
        {
            title: "Empower Your Ideas",
            description: "Raise funds for creative projects.",
            img: "./1.png"
        },
        {
            title: "Support Innovative Campaigns",
            description: "Help turn dreams into reality.",
            img: "./3.png"
        },
        {
            title: "Join the Community",
            description: "Make a difference by contributing.",
            img: "./2.png"
        }
    ];

    return (
        <section className="w-full">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative h-[400px]  lg:h-[600px]">
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-opacity-75 bg-black"
                            style={{ backgroundImage: `url(${slide.img})` }}
                        />
                        <div className="absolute inset-0 bg-black opacity-30"></div>
                        <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            <div className="text-center   p-6 md:p-10 rounded-lg max-w-2xl mx-4">
                                <h2 className="text-3xl h-font md:text-4xl font-bold text-white mb-4">{slide.title}</h2>
                                <p className="text-sm p-font md:text-lg text-gray-300">{slide.description}</p>
                                <button className="btn  bg-primary/80 border-none hover:bg-primary text-white font-bold py-2 px-4 rounded-xl mt-4" >Get Started</button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default Hero;