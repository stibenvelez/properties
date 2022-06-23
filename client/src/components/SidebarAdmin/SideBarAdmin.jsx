import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";

import { useState } from "react";
import { ChevronRightIcon, MenuIcon, XIcon } from "@heroicons/react/solid";

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div className="">
            {!sidebar && (
                <button
                    className="fixed z-50 flex items-center justify-center w-12 h-12 rounded-r-md bg-slate-800 hover:bg-slate-700 top-3 button-3 left-0  sm:hidden shadow-sm"
                    onClick={showSidebar}
                >
                    <Link className="text-white" to="#">
                        <ChevronRightIcon className="w-5 h-5" />
                    </Link>
                </button>
            )}
            <nav
                className={`bg-slate-800 h-screen rounded-r-2xl sm:w-56 w-full overflow-y-auto flex justify-center transition-all duration-300 sm:relative sm:left-0 fixed ease-in-out ${
                    sidebar ? "left-0" : "-left-full "
                }`}
            >
                <div className="w-full ">
                    <div className=" p-4 flex justify-end sm:hidden ">
                        <XIcon
                            className="h-5 w- text-white hover:text-indigo-500 hover:cursor-pointer "
                            onClick={showSidebar}
                        />
                    </div>
                    <Link
                        className="absolute items-center justify-end text-xl font-bold text-white right-2 top-3 sm:hidden"
                        to="#"
                    >
                        <XIcon onClick={showSidebar} />
                    </Link>
                    {SidebarData.map((item, index) => {
                        return (
                            <SubMenu
                                item={item}
                                key={index}
                                showSidebar={showSidebar}
                            />
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
