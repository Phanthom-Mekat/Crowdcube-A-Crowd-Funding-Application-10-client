import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const AuthLayout = () => {
  return (
    <div className=" ">
      <header className="py-3 w-11/12 mx-auto">
        <Navbar/>
      </header>
      <Outlet></Outlet>
      <Footer/>
    </div>
  );
};

export default AuthLayout;