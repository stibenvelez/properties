import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
                                    {property.offer}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <div className="flex gap-4">
                                        <button className="bg-gray-500 py-1 px-2 rounded-md">
                                            <Link
                                                to={`/admin/property/${property.idProperty}`}
                                                className="text-xs text-white"
                                            >
                                                Ver
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
