import { Link } from "react-router-dom";
import { HomeIcon, CloudUploadIcon } from "@heroicons/react/solid";
const   SideBarAdmin = () => {

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


    return (
        <div className="w-40 h-screen overflow-hidden bg-gray-900 shadow-md dark:bg-slate-800 rounded-r-3xl">
            <ul>
                {SIDEBAR_DATA.map((item, index) => (
                    
                <li key={index}>
                    <Link to={item.to} className="flex items-center gap-2 p-4 text-white transition duration-200 ease-in-out cursor-pointer first-letter:p-3 hover:bg-indigo-700">
                        {item.icon}
                        <span className="text-sm text-white">{item.name}</span>
                    </Link>
                </li>
                ))}
            </ul>
      
        </div>
    );
};

export default SideBarAdmin;
