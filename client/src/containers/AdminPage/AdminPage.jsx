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
                        <h2 className="mb-4 text-xl font-medium text-gray-800 dark:dark:text-gray-50">
                            Importar datos csv:
                        </h2>
                        <div className="mb-4">
                            <p className="text-sm text-gray-700 dark:text-white">
                                Importe las propiedades por mediod e un archivo en formato csv.
                                <br />
                                Algunas consideraciones: <br />
                                <strong>1.</strong> La columna de referencia,
                                título, descripción, precio y ciudad son
                                obligatorias.
                                <br />
                                <strong>2.</strong> Las imagenes para cada
                                propiedad se importan a parte, permite maximo 6
                                imagenes para mostrar. Puede activar la cantidad
                                que requiera con el numero uno en cad auna de
                                las columnas de imagenes.<br />
                                Puede descargar la
                                plantilla en el siguinete link:{" "}
                            </p>
                            <a
                                className="font-semibold text-indigo-700 hover:text-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300"
                                href={`${process.env.REACT_APP_API_URL}/files/plantilla_propiedades.csv`}
                            >
                                Descargar plantilla
                            </a>
                        </div>
                        <FormUploadCSV />
                    </div>
                    <div className="mb-4">
                        <h2 className="mb-4 text-xl font-medium text-gray-800 dark:text-white">
                            Importar imagenes:
                        </h2>
                        <div className="mb-4">
                            <p className="text-sm text-gray-700 dark:text-gray-50">
                                Una vez las propiedades estén en la base de
                                datos, puede importar las imagenes en formato{" "}
                                <strong>jpg</strong> para cada una de estas. Las
                                imagenes se relacionan mediante la referencia de
                                la propiedad seguido de la palabra imagen y el
                                numero de la imagen. <br /> Ejemplo: Para
                                importar las imagenes a la propiedad con
                                referencia R00001, las imagenes tendrian como
                                nombre el siguiente: R00001-imagen1.jpg,
                                R00001-imagen2.jpg, R00001-imagen3.jpg.
                                <br />
                                Recuerde, solo se admite formato jpg.
                            </p>
                        </div>
                        <FormUploadImages />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
