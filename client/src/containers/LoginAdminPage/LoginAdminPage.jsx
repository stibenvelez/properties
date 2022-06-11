import FormLoginAdmin from "components/FormLoginAdmin/FormLoginAdmin";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const LoginAdminPage = () => {
    const { auth } = useSelector(({ auth }) => auth);
    if (auth) { return <Redirect to="/admin" />}

    return (
        <div className="flex flex-col bg-slate-800 h-[calc(100vh-85px)] justify-center">
            <h2 className="text-white text-4xl text-center mb-4">
                Iniciar sesión
            </h2>
            <FormLoginAdmin />
        </div>
    );
};

export default LoginAdminPage;
