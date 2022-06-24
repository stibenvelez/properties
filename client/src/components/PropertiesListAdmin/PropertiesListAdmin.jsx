import {
    PencilAltIcon,
    TrashIcon,
    ViewBoardsIcon,
} from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OFFER_MAP = {
    rent: "Arriendo",
    sell: "Venta",
};

const PropertiesListAdmin = () => {
    const properties = useSelector(
        ({ properties }) => properties.properties?.results
    );
    console.log(properties);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            referencia
                        </th>
                        <th scope="col" className="px-6 py-3">
                            titulo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ciudad
                        </th>
                        <th scope="col" className="px-6 py-3">
                            tipo de inmueble
                        </th>
                        <th scope="col" className="px-6 py-3">
                            tipo de oferta
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800">
                    {properties &&
                        properties.map((property, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 dark:border-gray-600"
                            >
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    {property.reference}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    {property.title}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    {property.city}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    {property.propertyType}
                                </td>

                                <td className="px-6 py-4 whitespace-no-wrap">
                                    {OFFER_MAP[property.offer]}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <div className="flex gap-1 ">
                                        <button className=" hover:bg-gray-500 py-1 px-2 rounded hover:text-white text-gray-500 transition duration-200 ease-in-out">
                                            <Link
                                                to={`/admin/property/${property.idProperty}`}
                                                className="text-xs "
                                            >
                                                Ver
                                            </Link>
                                        </button>
                                        <button className=" hover:bg-indigo-500 py-1 px-2 rounded hover:text-white text-gray-500 transition duration-200 ease-in-out">
                                            <Link
                                                to={`/admin/editar-inmueble/${property.idProperty}`}
                                                className="text-xs "
                                            >
                                                <PencilAltIcon className="w-4 h-4" />
                                            </Link>
                                        </button>
                                        <button className=" hover:bg-red-500 py-1 px-2 rounded hover:text-white text-gray-500 transition duration-200 ease-in-out">
                                            <Link
                                                to={`/admin/property/${property.idProperty}`}
                                                className="text-xs"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </Link>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default PropertiesListAdmin;
