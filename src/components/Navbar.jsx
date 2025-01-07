import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../provider/ThemeProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
    const [isSticky, setIsSticky] = useState(false);

    // Handle sticky navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    };

    const list = (
        <>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/campaigns'>All Campaign</NavLink></li>
            <li><NavLink to='/addCampaign'>Add New Campaign</NavLink></li>
            <li><NavLink to='/myCampaign'>My Campaign</NavLink></li>
            <li><NavLink to='/myDonations'>My Donations</NavLink></li>
        </>
    );

    return (
        <div className={`navbar bg-white dark:bg-gray-800  w-full md:px-20 mx-auto sticky top-0 z-50 transition-all duration-300 ${isSticky ? 'shadow-lg' : ''}`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 text-black dark:text-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {list}
                    </ul>
                </div>
                <a className="text-xl">Crowd<span className="text-primary">Cube</span></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {list}
                </ul>
            </div>
            <div className="navbar-end flex items-center gap-4">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        value="synthwave"
                        className="sr-only peer"
                        onChange={toggleDarkMode}
                        checked={isDarkMode}
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary">
                        <div className="absolute inset-0 flex items-center justify-between px-1">
                            <svg
                                className="w-4 h-4 text-yellow-400 dark:text-transparent"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="12" r="5" />
                                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                            </svg>
                            <svg
                                className="w-4 h-4 text-transparent dark:text-gray-200"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        </div>
                    </div>
                </label>
                {user ? (
                    <div className="dropdown z-10 flex items-center dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                            data-tip={user?.displayName || "User"}
                            role="button"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    src={user?.photoURL?.split("?")[0] || "https://via.placeholder.com/150"}
                                    alt="User Avatar"
                                />
                            </div>
                        </label>
                        <button className="btn bg-primary ml-2" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="space-x-2 flex">
                        <Link to="/auth/login" className="btn bg-secondary btn-sm">
                            Login
                        </Link>
                        <Link to="/auth/register" className="btn bg-secondary btn-sm">
                            SignUp
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;