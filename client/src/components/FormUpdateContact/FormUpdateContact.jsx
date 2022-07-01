import Label from "components/Label/Label";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";

const FormUpdateContact = () => {
    const { id } = useParams();
    const [management, setManagement] = useState({});
    const { toContact, loading, error, msg } = useSelector(
        ({ contact }) => contact
    );

    const handleChange = (e) => {
        setManagement({ ...management, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("registrando gestion", id);
    }


    return (
        <div className="">
            <h2 className="text-center mb-2 font-bold">Registrar Gestión</h2>
            <div className="grid space-y-4">
                <div className="w-full">
                    <Label>
                        Estado <span className="text-red-500"> *</span>
                    </Label>
                    <Select
                        className="mt-1.5"
                        value={management.state}
                        name="state"
                        
                        onChange={handleChange}
                    >
                        <option value="">Seleccione</option>
                        <option value="1">Contactado</option>
                        <option value="2">No Contactado</option>
                        <option value="3">No responde</option>
                        <option value="4">Descartado</option>
                    </Select>
                </div>
                <div className="w-full">
                    <Label>Observaciones</Label>
                    <Textarea
                        className="mt-1.5 w-full"
                        value={
                            management.observations 
                        }
                        name="observation"
                        
                        onChange={handleChange}
                    />
                </div>
                <div className="py-2 flex gap-2">
                    <button
                        type="button"
                        className="bg-indigo-600 text-white py-1 px-4 rounded hover:bg-indigo-500"
                        onClick={handleSubmit}
                    >
                        Registrar
                    </button>
                    <button
                        type="button"
                        className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormUpdateContact;
