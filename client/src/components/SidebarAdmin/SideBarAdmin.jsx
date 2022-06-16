import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";

import { useState } from "react";
import { HomeIcon, CloudUploadIcon, XIcon } from "@heroicons/react/solid";
import { MenuIcon } from "@heroicons/react/outline";
const SidebarAdmin = () => {
    const SIDEBAR_DATA = [
        {
            name: "Importar inmuebles",
            icon: <HomeIcon className="w-6 h-6" />,
            to: "/admin",
        },
        {
            name: "Inmuebles",
            icon: <CloudUploadIcon className="w-6 h-6" />,
            to: "/admin/inmuebles",
        },
    ];
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div className="w-48 h-screen overflow-hidden bg-gray-900 shadow-md dark:bg-slate-800 rounded-r-3xl">
            <div
                className="absolute flex items-center justify-center w-12 h-12 rounded-md bg-slate-800 hover:bg-slate-700 button-3 -right-14 sm:hidden"
                onClick={showSidebar}
            >
                <Link className="text-white" to="#">
                    <MenuIcon />
                </Link>
            </div>
            <nav
                className={`bg-slate-800 h-screen  w-full  flex justify-center transition-all duration-75 sm:relative sm:left-0 fixed ease-out ${
                    sidebar ? "left-0" : "-left-full "
                }`}
            >
                <div className="w-full ">
                    <Link
                        className="absolute items-center justify-end text-xl font-bold text-white right-2 top-3 sm:hidden"
                        to="#"
                    >
                        <XIcon onClick={showSidebar} />
                    </Link>
                    {SidebarData.map((item, index) => {
                        return <SubMenu item={item} key={index} />;
                    })}
                </div>
            </nav>
        </div>
    );
};

export default SidebarAdmin;
