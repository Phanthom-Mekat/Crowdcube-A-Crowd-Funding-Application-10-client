import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

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
        <>
            <div className="navbar bg-base-100 w-11/12 mx-auto">
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {list}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Crowd<span className="text-primary">Cube</span></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {list}
                    </ul>
                </div>
                <div className="navbar-end">
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
                                        src={user?.photoURL || "https://via.placeholder.com/150"}
                                        alt="User Avatar"
                                    />
                                </div>
                            </label>
                            <button className="btn bg-primary ml-2" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/auth/login" className="btn bg-secondary">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
