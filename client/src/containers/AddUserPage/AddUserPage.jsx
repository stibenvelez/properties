import FormCreateUser from "components/FormCreateUser/FormCreateUser";
import { Helmet } from "react-helmet";


const AddUserPage = () => {

    return (
        <div
            className={`nc-PageAbout overflow-hidden relative h-full `}
            data-nc-id="PageAbout"
        >
            <Helmet>
                <title>Agregar usuario</title>
            </Helmet>

            <div className="container py-4 space-y-16 lg:py-4 lg:space-y-28 ">
                <div className="py-4">
                    <h1 className="text-2xl text-gray-800">Agregar usaurio</h1>
                </div>
                <FormCreateUser/>
            </div>
        </div>
    );
};

export default AddUserPage;
