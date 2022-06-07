import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, UploadIcon, CloudUploadIcon } from "@heroicons/react/solid";
const SideBarAdmin = () => {

    const SIDEBAR_DATA = [
        {
            name: "Importar inmuebles",
            icon: <HomeIcon className="h-6 w-6" />,
            to: "/admin",
        },
        {
            name: "Inmuebles",
            icon: <CloudUploadIcon className="h-6 w-6" />,
            to: "/admin/inmuebles",
        },
    ];


    return (
        <div className="w-40 h-screen overflow-hidden bg-gray-900 shadow-md rounded-r-3xl">
            <ul>
                {SIDEBAR_DATA.map((item, index) => (
                    
                <li key={index}>
                    <Link to={item.to} className="flex items-center gap-2 p-4 transition duration-200 ease-in-out cursor-pointer first-letter:p-3 hover:bg-indigo-700 text-white">
                        {item.icon}
                        <span className="text-white text-sm">{item.name}</span>
                    </Link>
                </li>
                ))}
            </ul>
      
        </div>
    );
};

export default SideBarAdmin;
