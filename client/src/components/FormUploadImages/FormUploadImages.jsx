import SpinnerButton from "components/SpinnerButton/SpinnerButton";
import clientAxios from "config/axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { uploadImagesAction, uploadPropertiescsvAction } from "store/slice/properties/propertiesActions";
import Swal from "sweetalert2";

const FormUploadImages = () => {
    const dispatch = useDispatch();
    const [files, setFiles] = useState(null);

    const { response, loadingUploadImages } = useSelector(
        ({ properties }) => properties
    );

    const handleChange = (e) => {
        setFiles(e.target.files);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!files) {
                Swal.fire({
                    title: "Seleccione un archivo",
                    text: "Debe seleccionar un archivo formato .csv",
                    icon: "error",
                });
                return;
            }
            const data = new FormData();
            const appendedFiles = [...files].map(
                (file) => data.append("files", file)
            )
            data.append("files", appendedFiles);
            dispatch(uploadImagesAction(data));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="bg-whiterounded-lg">
            <form onSubmit={handleSubmit} encType="multipar/form-data">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col p-4 border border-gray-200 rounded-md shadow-sm dark:border-slate-600 border-1">
                        <label className="flex justify-center w-full px-4 py-10 border-2 border-green-200 border-dashed cursor-pointer dark:border-slate-600 bg-green-50 dark:bg-slate-900 ">
                            <input
                                type="file"
                                className="text-sm cursor-pointer text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-green-600 file:text-white hover:file:cursor-pointer hover:file:bg-green-800 hover:file:text-white underline-none focus-border-green-200 focus:green-green-500 focus:shadow-outline "
                                onChange={handleChange}
                                value={files && files.filename}
                                multiple
                            />
                        </label>
                    </div>

                    <div>
                        <ButtonPrimary type="submit" className="p-2">
                            {loadingUploadImages && <SpinnerButton />}
                            {loadingUploadImages
                                ? "importando"
                                : "Importar imagenes"}
                        </ButtonPrimary>
                    </div>

                    {response && response.errors && (
                        <div className="p-4 text-xs text-red-500 border rounded-md shadow-sm border-1 bg-gray-50">
                            <h3 className="text-xl font-bold text-center text-gray-700">
                                Lista de errores
                            </h3>
                            <p className="text-center text-gray-800">
                                {response.msg}
                            </p>
                            {response.errors &&
                                response.errors.map((error) => (
                                    <div className="flex flex-col gap-2 p-2 ">
                                        <div className="flex gap-2">
                                            <label className="font-bold">
                                                Referencia:
                                            </label>
                                            <p>{error?.reference}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <label className="font-bold">
                                                Columna:
                                            </label>
                                            <p>{error?.column}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <label className="font-bold">
                                                Error:
                                            </label>
                                            <p>{error?.error}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FormUploadImages;
