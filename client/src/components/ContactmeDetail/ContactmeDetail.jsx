import Label from "components/Label/Label";
import SpinnerButton from "components/SpinnerButton/SpinnerButton";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "shared/Card";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";

const ContactmeDetail = () => {
    const { toContact, loading, error, msg } = useSelector(
        ({ contact }) => contact
    );

    useEffect(() => {}, []);

    if (loading)
        return (
            <div className="w-full py-10 flex justify-center items-center">
                <SpinnerButton />
            </div>
        );

    if (error) {
        return <p className="text-3xl text-gray-700 text-center">{msg}</p>;
    }

    return (
        <>
            <Card>
                <h2 className="text-center mb-2 font-bold">
                    Datos del prospecto
                </h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>
                                Primer Nombre{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                name="firstName"
                                defaultValue={toContact.firstName}
                                readOnly
                                //defaultValue={property.reference}
                            />
                            {/* {errors.reference && (
                  <p className="py-1 text-sm text-red-500">
                      {errors.reference}
                  </p>
              )} */}
                        </div>
                        <div className="w-full">
                            <Label>
                                Apellido{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                defaultValue={toContact.lastName}
                                name="lastName"
                                readOnly
                            />
                            {/* {errors.reference && (
                  <p className="py-1 text-sm text-red-500">
                      {errors.reference}
                  </p>
              )} */}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>
                                Email <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="email"
                                defaultValue={toContact.email}
                                name="email"
                                readOnly
                                //defaultValue={property.reference}
                            />
                            {/* {errors.reference && (
                  <p className="py-1 text-sm text-red-500">
                      {errors.reference}
                  </p>
              )} */}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
                        <div className="w-full">
                            <Label>
                                Mensaje <span className="text-red-500"> *</span>
                            </Label>
                            <Textarea
                                className="mt-1.5"
                                defaultValue={toContact.message}
                                name="message"
                                readOnly
                                //defaultValue={property.reference}
                            />
                            {/* {errors.reference && (
                  <p className="py-1 text-sm text-red-500">
                      {errors.reference}
                  </p>
              )} */}
                        </div>
                    </div>
                </div>
            </Card>
            <Card>
                <h2 className="text-center mb-2 font-bold">Gestion</h2>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="w-full">
                        <Label>
                            Estado <span className="text-red-500"> *</span>
                        </Label>
                        <Input
                            className="mt-1.5"
                            defaultValue={toContact.state}
                            name="state"
                            readOnly
                            //defaultValue={property.reference}
                        />
                        {/* {errors.reference && (
                  <p className="py-1 text-sm text-red-500">
                      {errors.reference}
                  </p>
              )} */}
                    </div>
                    {toContact.contactedBy && (
                        <div className="w-full">
                            <Label>
                                Contactado por{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                value={toContact.contactedBy}
                                name="state"
                                //defaultValue={property.reference}
                            />
                            {/* {errors.reference && (
                  <p className="py-1 text-sm text-red-500">
                      {errors.reference}
                  </p>
              )} */}
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
                    {" "}
                    <div className="w-full">
                        <Label>Observaciones</Label>
                        <Textarea
                            className="mt-1.5"
                            defaultValue={
                                toContact.observations || "sin información"
                            }
                            name="observation"
                            readOnly
                            //defaultValue={property.reference}
                        />
                        {/* {errors.reference && (
                  <p className="py-1 text-sm text-red-500">
                      {errors.reference}
                  </p>
              )} */}
                    </div>
                </div>
            </Card>
        </>
    );
};

export default ContactmeDetail;