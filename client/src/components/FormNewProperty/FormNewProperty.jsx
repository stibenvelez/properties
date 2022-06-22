import { useCallback, useEffect, useMemo, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Checkbox from "shared/Checkbox/Checkbox";
import {
    INITIAL_STATE_NEW_PROPERTY,
    TEST_INITIAL_STATE_NEW_PROPERTY,
} from "./utils";
import clientAxios from "config/axios";
import GoogleMapReact from "google-map-react";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import { formValidate } from "./utils/FormValidate";
import { TrashIcon } from "@heroicons/react/solid";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { createPropertyAction } from "store/slice/properties/propertiesActions";

const FormNewProperty = () => {
    const dispatch = useDispatch()
    const [newProperty, setNewProperty] = useState(
        TEST_INITIAL_STATE_NEW_PROPERTY
    );
    const [errors, setErrors] = useState({});
    const [departaments, setDepartaments] = useState([]);
    const [cities, setCities] = useState([]);

    const handleOnChange = (data) => {
        setNewProperty({
            ...newProperty,
            [data.name]: data.value,
        });
    };

    const handleImages = (e) => {
        const { files } = e.target;
        const images = [];
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let id = Math.random().toString(36)
            file.id = id;
            images.push(file);
        }
        const limitImages = newProperty.images.concat(images).slice(0,5)

        setNewProperty({
            ...newProperty,
            images: limitImages,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('enviando')
        const result = await formValidate(newProperty);
        if (Object.keys(result).length > 0) {
            setErrors(result);
            Swal.fire({
                icon: "error",
                title: "Faltan campos por llenar",
                text: "Verifique que todos los campos obligatorios se encuentren diligenciados",
            });
            return;
        }
        setErrors({});
        dispatch(createPropertyAction(newProperty));
    };

    useMemo(() => {
        const getDepartaments = async () => {
            const response = await clientAxios.get("/departaments");
            setDepartaments(response.data);
        };
        getDepartaments();
    }, []);
    useMemo(() => {
        const getCities = async () => {
            const response = await clientAxios.get("/cities");
            let filteredCities = response.data.filter(
                (city) => city.IdDepartament === newProperty.departament * 1
            );
            setCities(filteredCities);
        };
        getCities();
    }, [newProperty.departament]);

    useEffect(() => {
        (async () => {
            try {
                if (newProperty.reference === "") {
                    return false;
                }
                const res = await clientAxios.get(
                    `properties?reference=${newProperty.reference}`
                );
                if (res.data.results.length > 0) {
                    setErrors({
                        ...errors,
                        reference: "La referencia ya existe",
                    });
                    return;
                }

                setErrors({
                    ...errors,
                    reference: "",
                });
            } catch (error) {
                console.log(error);
            }
        })();
    }, [newProperty.reference]);

    const handleDeleteImage = (item) => {
        const newArrayImages = newProperty.images.filter(
            (image) => image.id !== item.id
        );
        setNewProperty({
            ...newProperty,
            images: newArrayImages,
        });
    };

    return (
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <div className="flex flex-col md:flex-row">
                <div className="flex-grow w-full mt-10 space-y-6 md:mt-0 md:pl-16">
                    <h3>Información del inmueble</h3>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>
                                Reference{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                defaultValue={newProperty.reference}
                                name="reference"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.reference &&
                                newProperty.reference === "" && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.reference}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>
                                Title <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                defaultValue={newProperty.title}
                                name="title"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.title && newProperty.title === "" && (
                                <p className="py-1 text-sm text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                        <div className="w-full">
                            <Label>
                                Tipo de oferta{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Select
                                className="mt-1.5"
                                defaultValue={newProperty.offer}
                                name="offer"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="1">Venta</option>
                                <option value="2">Arriendo</option>
                            </Select>
                            {errors.offer && newProperty.offer === "" && (
                                <p className="py-1 text-sm text-red-500">
                                    {errors.offer}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <Label>
                                Tipo de inmueble{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Select
                                className="mt-1.5"
                                defaultValue={newProperty.propertyType}
                                name="propertyType"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            >
                                <option hidden value="">
                                    {" "}
                                    Seleccione
                                </option>
                                <option value="1">Casa</option>
                                <option value="2">Apartamento</option>
                                <option value="3">Oficina</option>
                                <option value="4">Lote</option>
                            </Select>
                            {errors.propertyType &&
                                newProperty.propertyType === "" && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.propertyType}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>
                                Valor <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="text"
                                placeholder="$ 0"
                                defaultValue={newProperty.price}
                                name="price"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.price &&
                                (newProperty.price === "" ||
                                    newProperty.price === 0) && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.price}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>Descuento</Label>
                            <Input
                                className="mt-1.5"
                                type="text"
                                placeholder="$ 0"
                                defaultValue={newProperty.saleOff}
                                name="saleOff"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <div className="w-full">
                            <Label>
                                Departamento{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Select
                                className="mt-1.5"
                                value={newProperty.departament}
                                name="departament"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            >
                                <option hidden value="">
                                    Seleccione un departamento
                                </option>
                                {departaments &&
                                    departaments.map((departament) => (
                                        <option
                                            key={departament.idDepartament}
                                            value={departament.idDepartament}
                                        >
                                            {departament.departament}
                                        </option>
                                    ))}
                            </Select>
                            {errors.departament &&
                                newProperty.departament === "" && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.departament}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>
                                Ciudad <span className="text-red-500"> *</span>
                            </Label>
                            <Select
                                className="mt-1.5"
                                value={newProperty.city}
                                name="city"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                                disabled={
                                    newProperty.departament === ""
                                        ? true
                                        : false
                                }
                            >
                                <option hidden value="">
                                    Seleccione un aciudad
                                </option>
                                {cities &&
                                    cities.map((city) => (
                                        <option
                                            key={city.cityId}
                                            value={city.cityId}
                                        >
                                            {city.city}
                                        </option>
                                    ))}
                            </Select>
                            {errors.city && newProperty.city === "" && (
                                <p className="py-1 text-sm text-red-500">
                                    {errors.city}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <Label>Barrio</Label>
                            <Input
                                className="mt-1.5"
                                placeholder="barrio donde esta ubicado el inmuble"
                                name="neighborhood"
                                defaultValue={newProperty.neighborhood}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>Direccion</Label>
                            <Input
                                className="mt-1.5"
                                placeholder="direccion del inmuble"
                                name="address"
                                defaultValue={newProperty.address}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="w-full">
                            <Label>Edificio</Label>
                            <Input
                                className="mt-1.5"
                                placeholder="direccion del inmuble"
                                name="building"
                                defaultValue={newProperty.building}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                        <div className="w-full">
                            <Label>
                                Area (m²){" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="area del inmuble"
                                name="area"
                                defaultValue={newProperty.area}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.area &&
                                (newProperty.area === "" ||
                                    newProperty.area === 0) && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.area}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>estrato</Label>
                            <Select
                                className="mt-1.5"
                                defaultValue={newProperty.stratum}
                                name="stratum"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            >
                                <option hidden value="">
                                    ninguno
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Label>Antiguedad</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="antiguedad del inmuble"
                                name="antiquityYears"
                                defaultValue={newProperty.antiquityYears}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="w-full">
                            <Label>Remodelaciones</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="remodelaciones del inmuble"
                                name="remodelation"
                                defaultValue={newProperty.remodelation}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="w-full">
                            <Label>Administración</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="$ 0000"
                                name="lastAdminprice"
                                defaultValue={newProperty.lastAdminprice}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
                        <div className="w-full">
                            <Label>
                                Habitaciones{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="habitaciones del inmuble"
                                name="bedrooms"
                                defaultValue={newProperty.bedrooms}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.bedrooms &&
                                (newProperty.bedrooms === "" ||
                                    newProperty.bedrooms === 0) && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.bedrooms}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>
                                Baños <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                name="bathrooms"
                                defaultValue={newProperty.bathrooms}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.bathrooms &&
                                newProperty.bathrooms === "" && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.bathrooms}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>Piso</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                name="numFloor"
                                defaultValue={newProperty.numFloor}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="w-full">
                            <Label>Asensores</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                name="numElevators"
                                defaultValue={newProperty.numElevators}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>Garage</Label>
                            <Select
                                className="mt-1.5"
                                defaultValue={newProperty.garage}
                                name="garage"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            >
                                <option value="0">no</option>
                                <option value="1">sí</option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Label>Parqueadero</Label>
                            <Select
                                className="mt-1.5"
                                defaultValue={newProperty.parking}
                                name="parking"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            >
                                <option value="0">no</option>
                                <option value="1">sí</option>
                            </Select>
                        </div>
                    </div>

                    <h3>Informacion de contacto</h3>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>
                                Nombre del contacto{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="text"
                                placeholder="nombre del contacto"
                                name="contactName"
                                defaultValue={newProperty.contactName}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.contactName &&
                                (newProperty.contactName === "" ||
                                    newProperty.contactName === 0) && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.contactName}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>Email</Label>
                            <Input
                                className="mt-1.5"
                                type="email"
                                placeholder="ejemplo@correo.com"
                                name="email"
                                defaultValue={newProperty.email}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>
                                Celular <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="text"
                                placeholder="000 000 0000"
                                name="cellPhone"
                                defaultValue={newProperty.cellPhone}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.cellPhone &&
                                newProperty.cellPhone === "" && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.cellPhone}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>telefono fijo</Label>
                            <Input
                                className="mt-1.5"
                                type="text"
                                placeholder="60 0 000  0000"
                                name="phone"
                                defaultValue={newProperty.phone}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Publicar inmuble</Label>
                        <Checkbox
                            className="mt-1.5"
                            type="checkbox"
                            name="published"
                            defaultChecked={newProperty.published}
                            onChange={(e) =>
                                handleOnChange({
                                    name: e.target.name,
                                    value: e.target.checked,
                                })
                            }
                        />
                    </div>
                    <div>
                        <h3>Hubicación</h3>
                        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                            <div className="overflow-hidden rounded-xl">
                                <GoogleMapReact
                                    bootstrapURLKeys={{
                                        key: "AIzaSyDkDFnRyELEsM8J-lfKlKEq0zc0HQZzkaU",
                                    }}
                                    yesIWantToUseGoogleMapApiInternals
                                    defaultZoom={10}
                                    defaultCenter={{
                                        lat: 6.247956,
                                        lng: -75.582671,
                                    }}
                                    onClick={(e) => {
                                        setNewProperty({
                                            ...newProperty,
                                            latitude: e.lat,
                                            longitude: e.lng,
                                        });
                                    }}
                                >
                                    <LocationMarker
                                        lat={newProperty.latitude}
                                        lng={newProperty.longitude}
                                    />
                                </GoogleMapReact>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3>Imagenes</h3>
                        <p className="text-sm text-gray-400">
                            Aqui puedes subir las imagenes del inmueble. Puedes
                            cargar hasta 6 imagenes
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 py-4 lg:justify-start">
                            {newProperty.images &&
                                newProperty.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative overflow-hidden bg-gray-200 rounded shadow w-44 h-28"
                                    >
                                        <button
                                            onClick={() =>
                                                handleDeleteImage(image)
                                            }
                                            type="button"
                                            className="absolute p-1 rounded-full bottom-1 right-1 text-gray-50 bg-gray-100/70 hover:bg-red-100/80 hover:text-red-400 "
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                        <img
                                            className="object-contain object-center"
                                            src={URL.createObjectURL(image)}
                                        />
                                    </div>
                                ))}
                        </div>
                        <div className="border-gray-200 boder">
                            <label className="block">
                                <span className="sr-only">Choose File</span>
                                <input
                                    multiple
                                    type="file"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 hover:file:text-white focus:outline-none focus:shadow-outline hover:file:cursor-pointer"
                                    aria-describedby="user_avatar_help"
                                    id="user_avatar"
                                    name="images"
                                    onChange={handleImages}
                                />
                            </label>
                            <div className="py-2">
                                {newProperty.images &&
                                    newProperty.images.map((image, index) => (
                                        <p
                                            key={index}
                                            className="text-sm text-gray-500"
                                        >
                                            {image.name}
                                        </p>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <ButtonPrimary type="submit">
                            Registrar inmueble
                        </ButtonPrimary>
                        <ButtonSecondary>Cancelar</ButtonSecondary>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default FormNewProperty;
