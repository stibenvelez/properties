import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { formatDate, formatDateTime } from "helpers/formatDate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ToContactList = () => {
    const toContactList = useSelector(({ contact }) => contact.toContactList);

    const handleDeleteProperty = (id) => {
        console.log("eliminando", id);
    };
    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Mensaje
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fecha
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Estado
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800">
                    {toContactList &&
                        toContactList.map((toContact, index) => (
                            <tr
                                key={index}
                                className={`border-b  dark:border-gray-600 border-gray-200 hover:bg-gray-50 ${toContact.firstName}`}
                            >
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <div>
                                        <Link
                                            to={`/admin/property/${toContact.id}`}
                                            className="hover:text-indigo-500 text-lg"
                                        >
                                            {toContact.firstName}{" "}
                                            {toContact.lastName}
                                        </Link>
                                    </div>
                                    <p className="text-sm">{toContact.email}</p>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap truncate">
                                    {toContact.message}
                                </td>

                                <td className="px-6 py-4 whitespace-no-wrap">
                                    {formatDate(toContact.createdAt)}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    {toContact.state}
                                </td>

                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <div className="flex gap-1 ">
                                        <Link
                                            to={`to-contact/${toContact.id}`}
                                            className="text-xs
                                                hover:bg-gray-500 py-1 px-2
                                                rounded hover:text-white
                                                text-gray-500 transition
                                                duration-200 ease-in-out"
                                            
                                        >
                                            Ver
                                        </Link>
                                        <button className=" hover:bg-indigo-500 py-1 px-2 rounded hover:text-white text-gray-500 transition duration-200 ease-in-out">
                                            <Link to={`#`} className="text-xs ">
                                                <PencilAltIcon className="w-4 h-4" />
                                            </Link>
                                        </button>
                                        {toContact.id !== 2 && (
                                            <button
                                                onClick={() =>
                                                    handleDeleteProperty(
                                                        toContact.id
                                                    )
                                                }
                                                className=" hover:bg-red-500 py-1 px-2 text-xs rounded hover:text-white text-gray-500 transition duration-200 ease-in-out"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ToContactList;
