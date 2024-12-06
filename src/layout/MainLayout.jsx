import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white">
            <Navbar/>
            <Outlet />
            <Footer/>
        </div>
    );
};

export default MainLayout;