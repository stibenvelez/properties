import PropertiesListAdmin from "components/PropertiesListAdmin/PropertiesListAdmin";
import SpinnerButton from "components/SpinnerButton/SpinnerButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllPropertiesByUser } from "store/slice/properties/propertiesActions";

const PropertiesPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        (() => dispatch(fetchAllPropertiesByUser()))();
    }, []);

    const { loading } = useSelector(({ properties }) => properties);

    if (loading)
        return (
            <div className="w-full py-10 flex justify-center items-center">
                <SpinnerButton />
            </div>
        );
    return (
        <div className="nc-CommonLayoutProps bg-neutral-50 dark:bg-neutral-900">
            <div className="container pt-4 sm:pt-8 pb-24 lg:pb-32">
                <div className="space-y-6 sm:space-y-8">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-semibold">Lista de inmuebles</h1>
                        </div>
                        <p className="text-sm text-gray-600">Lista de los inmuebles creadosy sus diferentes estados</p>
                    </div>
                    <PropertiesListAdmin />
                </div>
            </div>
        </div>
    );
};

export default PropertiesPage;
