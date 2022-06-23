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
        <div className="container">
            <h1 className="text-2xl">Lista de propiedades</h1>
            <PropertiesListAdmin />
        </div>
    );
};

export default PropertiesPage;
