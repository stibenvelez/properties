import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserList = () => {
    const { users, error, message } = useSelector(({ users }) => users);
    if (error) {
        return (
            <div className="relative py-2 px-3 bg-red-200 text-sm text-red-800 rounded shadow">
                {message}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
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
                    {users &&
                        users.map(
                            (
                                {
                                    firstName,
                                    lastName,
                                    email,
                                    state,
                                    role,
                                    idUser,
                                    confirmed,
                                },
                                index
                            ) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 dark:border-gray-600"
                                >
                                    <td className="px-6 py-4 whitespace-no-wrap">
                                        {firstName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap">
                                        {lastName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap">
                                        {email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap">
                                        {role}
                                    </td>
                                    <td
                                        className={` px-6 py-4 whitespace-no-wrap`}
                                    >
                                        <div className="flex flex-wrap gap-1">
                                            <div
                                                className={`${
                                                    state
                                                        ? "bg-green-200 text-green-700"
                                                        : "bg-red-300 text-red-800"
                                                } py-0.5 px-2 rounded-lg text-xs`}
                                            >
                                                {state ? "Activo" : "Inactivo"}
                                            </div>
                                            {!confirmed && (
                                                <div
                                                    className={`${
                                                        state
                                                            ? "bg-green-200 text-green-700"
                                                            : "bg-red-300 text-red-800"
                                                    } py-0.5 px-2 rounded-lg text-xs`}
                                                >
                                                    Sin confirmar
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-no-wrap">
                                        <div className="flex gap-2">
                                            <button className="bg-gray-500 py-1 px-2 rounded-md hover:bg-gray-400 transition duration-200 ease-in-out">
                                                <Link
                                                    to={`users/get-user/${idUser}`}
                                                    className="text-xs text-white"
                                                >
                                                    Ver
                                                </Link>
                                            </button>
                                            <button className="bg-gray-500 py-1 px-2 rounded-md hover:bg-indigo-500 transition duration-200 ease-in-out">
                                                <Link
                                                    to={`users/update-user/${idUser}`}
                                                    className="text-xs text-white "
                                                >
                                                    <PencilAltIcon className="h-4 w-4" />
                                                </Link>
                                            </button>
                                            <button className="bg-gray-500 py-1 px-2 rounded-md hover:bg-red-500 transition duration-200 ease-in-out text-xs text-white ">
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
