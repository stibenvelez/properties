import { Tab } from "@headlessui/react";
import CarCard from "components/CarCard/CarCard";
import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";
import StayCard from "components/StayCard/StayCard";
import {
    DEMO_CAR_LISTINGS,
    DEMO_EXPERIENCES_LISTINGS,
    DEMO_STAY_LISTINGS,
} from "data/listings";
import React, { Fragment, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Avatar from "shared/Avatar/Avatar";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Checkbox from "shared/Checkbox/Checkbox";

const INITIAL_STATE_NEW_PROPERTY = {
    reference: "",
    title: "",
    description: "",
    price: 0,
    address: "",
    building: "",
    contactName: "",
    email: "",
    phone: "",
    cellPhone: "",
    antiquityYears: "",
    published: false,
    lastAdminprice: "",
    neighborhood: "",
    propertyType: "",
    offer: "",
    area: "",
    stratum: "",
    bedrooms: 0,
    numElevators: 0,
    numFloor: 0,
    bathrooms: 0,
    garage: 0,
    parking: 0,
    remodelation: 0,
    latitude: 6.228418741427521,
    longitude: -75.5626006542638,
    city: 1,
    saleOff: 0,
};

const FormNewProperty = () => {
    const [newProperty, setNewProperty] = useState(INITIAL_STATE_NEW_PROPERTY);
    const handleOnChange = data => {
        setNewProperty({
            ...newProperty,
            [data.name]: data.value,
        });
    };

    return (
        <form encType="multipart/form-data">
            <div className="flex flex-col md:flex-row">
                <div className="flex-grow w-full mt-10 space-y-6 md:mt-0 md:pl-16">
                    <h3>Información del inmueble</h3>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                        <div className="w-full">
                            <Label>Reference</Label>
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
                        </div>
                        <div className="w-full">
                            <Label>Title</Label>
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
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
                        <div className="w-full">
                            <Label>Tipo de oferta</Label>
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
                                <option value="1">Venta</option>
                                <option value="2">Arriendo</option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Label>Tipo de inmueble</Label>
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
                                <option value="1">Casa</option>
                                <option value="2">Apartamento</option>
                                <option value="3">Oficina</option>
                                <option value="4">Lote</option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Label>Valor</Label>
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
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                        <div className="w-full">
                            <Label>Departamento</Label>
                            <Select
                                className="mt-1.5"
                                defaultValue={newProperty.neighborhood}
                                name="neighborhood"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Label>Ciudad</Label>
                            <Select
                                className="mt-1.5"
                                defaultValue={newProperty.city}
                                name="city"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </Select>
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
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
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
                                defaultValue=""
                                placeholder="direccion del inmuble"
                            />
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-5 grid-cols-1 gap-4">
                        <div className="w-full">
                            <Label>Area (m²)</Label>
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
                                name="antiquity"
                                defaultValue={newProperty.antiquity}
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
                                placeholder="administracion del inmuble"
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
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                        <div className="w-full">
                            <Label>Habitaciones</Label>
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
                        </div>
                        <div className="w-full">
                            <Label>Baños</Label>
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
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
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
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                        <div className="w-full">
                            <Label>Nombre del contacto</Label>
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
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                        <div className="w-full">
                            <Label>Celular</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
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
                        </div>
                        <div className="w-full">
                            <Label>telefono fijo</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
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
                        <h3>Imagenes</h3>
                        <div className="py-4 flex flex-wrap gap-4 lg:justify-start justify-center">
                            <div className="bg-gray-200 w-44 h-28 rounded"></div>
                            <div className="bg-gray-200 w-44 h-28 rounded"></div>
                            <div className="bg-gray-200 w-44 h-28 rounded"></div>
                            <div className="bg-gray-200 w-44 h-28 rounded"></div>
                            <div className="bg-gray-200 w-44 h-28 rounded"></div>
                            <div className="bg-gray-200 w-44 h-28 rounded"></div>
                        </div>
                        <di className="boder border-gray-200">
                            <label className="block">
                                <span className="sr-only">Choose File</span>
                                <input
                                    multiple
                                    type="file"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 hover:file:text-white focus:outline-none focus:shadow-outline hover:file:cursor-pointer"
                                    aria-describedby="user_avatar_help"
                                    id="user_avatar"
                                    name="images"
                                    onChange={(e) =>
                                        handleOnChange({
                                            name: e.target.name,
                                            value: e.target.files,
                                        })
                                    }

                                />
                            </label>
                        </di>
                    </div>
                    <div className="pt-2">
                        <ButtonPrimary>Registrar inmueble</ButtonPrimary>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default FormNewProperty;
