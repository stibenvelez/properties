import Label from "components/Label/Label";
import { useSelector } from "react-redux";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";

const FormUpdateContact = () => {
    const { toContact, loading, error, msg } = useSelector(
        ({ contact }) => contact
    );

    return (
        <div className="w-full" >
            <h2 className="text-center mb-2 font-bold">Registrar Gestión</h2>
            <div className="grid space-y-4">
                
                    <Label>
                        Estado <span className="text-red-500"> *</span>
                    </Label>
                    <Select
                        className="mt-1.5"
                        defaultValue={toContact.state}
                        name="state"
                        readOnly

                        //defaultValue={property.reference}
                    >
                        <option value="">Seleccione</option>
                        <option value="1">Contactado</option>
                        <option value="2">No Contactado</option>
                        <option value="3">No responde</option>
                        <option value="4">Descartado</option>
                    </Select>
              
               
                    <Label>Observaciones</Label>
                    <Textarea
                        className="mt-1.5 w-full"
                        defaultValue={
                            toContact.observations || "sin información"
                        }
                        name="observation"
                        readOnly
                        //defaultValue={property.reference}
                    />
                
            </div>
        </div>
    );
};

export default FormUpdateContact;
