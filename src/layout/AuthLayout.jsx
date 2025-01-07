import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const AuthLayout = () => {
  return (
    <div className=" ">
      <header className="bg-white dark:bg-gray-800 text-black dark:text-white">
        <Navbar/>
      </header>
      <Outlet></Outlet>
      <Footer/>
    </div>
  );
};

export default AuthLayout;