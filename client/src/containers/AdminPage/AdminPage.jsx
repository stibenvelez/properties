import FormUploadCSV from "components/FormUploadCSV/FormUploadCSV";
import FormUploadImages from "components/FormUploadImages/FormUploadImages";
import { Helmet } from "react-helmet";

const AdminPage = () => {
    return (
        <div className="">
            <Helmet>
                <title>Admin</title>
            </Helmet>   
            <div className="container lg:p-4">
                <div className="flex flex-col">
                    <div className="mb-4">
                        <h2 className="mb-4 text-xl font-medium text-gray-800">
                            Importar datos csv:
                        </h2>
                        <FormUploadCSV />
                    </div>
                    <div className="mb-4">
                        <h2 className="mb-4 text-xl font-medium text-gray-800">
                            Importar imagenes:
                        </h2>
                        <FormUploadImages />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
