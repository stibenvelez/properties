import { useState } from "react";
import LocationInput from "./LocationInput";
import { FocusedInputShape } from "react-dates";
import moment from "moment";
import { FC } from "react";
import NeighborhoodInput from "./NeighborhoodInput";
import PropertyTypeSelect from "./PropertyTypeSelect";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFilters } from "store/slice/properties";

export interface DateRage {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
}

export interface StaySearchFormProps {
    haveDefaultValue?: boolean;
    stateForm?: string;
}

const STATE_FORM: any = {
    Venta: "venta",
    Arriendo: "arriendo",
};

const StaySearchForm: FC<StaySearchFormProps> = ({
    haveDefaultValue = false,
    stateForm = "Venta",
}) => {
    const [neighborhoodValue, setNeighborhoodInputValue] = useState("");
    const [searchValues, setSearchValues] = useState({
        city: "",
        neighborhood: "",
        propertyType: "",
        rangePrices: [0, 0],
    });

    const [dateFocused, setDateFocused] = useState<FocusedInputShape | null>(
        null
    );
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSearch = () => {
        dispatch(setFilters(searchValues));
        history.push(`/${STATE_FORM[stateForm]}`);
    };
    const handleChange = (item: any) => {
        setSearchValues({
            ...searchValues,
            [item.name]: item.value,
        });
    };

    const renderForm = () => {
        return (
            <form className="relative flex flex-col w-full mt-8 bg-white divide-y shadow-xl md:flex-row rounded-3xl lg:rounded-full dark:shadow-2xl dark:bg-neutral-800 divide-neutral-200 dark:divide-neutral-700 md:divide-y-0">
                <LocationInput
                    defaultValue={searchValues?.city || ""}
                    onChange={(e) => handleChange({ name: "city", value: e })}
                    onInputDone={() => setDateFocused("startDate")}
                />
                <NeighborhoodInput
                    defaultValue={neighborhoodValue}
                    onChange={(e) =>
                        handleChange({ name: "neighborhood", value: e })
                    }
                    onInputDone={() => setDateFocused("startDate")}
                />
                <PropertyTypeSelect
                    onChange={(e) =>
                        handleChange({
                            name: "propertyType",
                            value: e.target.value,
                        })
                    }
                    value={searchValues.propertyType}
                />
                {/* BUTTON SUBMIT OF FORM */}
                <div className="flex items-center justify-center px-4 py-4 lg:py-0">
                    <button
                        type="button"
                        className="flex items-center justify-center w-full rounded-full h-14 md:h-16 md:w-16 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none"
                        onClick={handleSearch}
                    >
                        <span className="mr-3 md:hidden">Buscar</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        );
    };

    return renderForm();
};

export default StaySearchForm;
