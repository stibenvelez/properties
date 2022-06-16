import SpinnerButton from "components/SpinnerButton/SpinnerButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Card from "shared/Card";
import Input from "shared/Input/Input";
import { createUserAction } from "store/slice/user/userActions";

const FormCreateUser = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const [errors, setErrors] = useState({});

    const {loading} = useSelector(({users}) => users);
    console.log(loading);
    const validateForm = () => {
        let errors = {};
        if (user.firstname === "") errors.firstname = "El nombre es requerido";
        if (user.lastname === "") errors.lastname = "El apellido es requerido";
        if (user.email === "") errors.email = "El email es requerido";
        if (user.password === "")
            errors.password = "La contraseña es requerida";
        if (user.passwordConfirm === "")
            errors.passwordConfirm =
                "La confirmación de la contraseña es requerida";
        if (user.password !== user.passwordConfirm)
            errors.passwordConfirm = "Las contraseñas no coinciden";

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
           return true
        }
        setErrors(errors);
        return false
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const Errors = validateForm();
        if (Errors) return false
        dispatch(createUserAction(user));
    };
    
    return (
        <Card className=" max-w-4xl mx-auto">
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    <label className="block  w-1/2">
                        <span className="text-neutral-800 dark:text-neutral-200">
                            Primer nombre
                        </span>
                        <Input
                            type="text"
                            placeholder="Ingrese un primer nombre"
                            className="mt-1"
                            name="firstname"
                            value={user.firstname}
                            onChange={handleChange}
                        />
                        {errors.firstname && user.firstname === "" && (
                            <p className="text-sm text-red-500">
                                {errors.firstname}
                            </p>
                        )}
                    </label>
                    <label className="block w-1/2">
                        <span className="text-neutral-800 dark:text-neutral-200">
                            Primer apellido
                        </span>
                        <Input
                            type="text"
                            placeholder="Ingrese un apellido"
                            className="mt-1"
                            name="lastname"
                            value={user.lastname}
                            onChange={handleChange}
                        />
                        {errors.lastname && user.lastname === "" && (
                            <p className="text-sm text-red-500">
                                {errors.lastname}
                            </p>
                        )}
                    </label>
                </div>
                <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                        Email
                    </span>
                    <Input
                        type="email"
                        placeholder="example@example.com"
                        className="mt-1"
                        name="email"
                        autoComplete="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                    {errors.email && user.email === "" && (
                        <p className="text-sm text-red-500"> {errors.email}</p>
                    )}
                </label>
                <label className="block">
                    <span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
                        contraseña
                    </span>
                    <Input
                        type="password"
                        className="mt-1"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    {errors.password && user.password === "" && (
                        <p className="text-sm text-red-500">
                            {errors.password}
                        </p>
                    )}
                </label>
                <label className="block">
                    <span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
                        confirmar contraseña
                    </span>
                    <Input
                        type="password"
                        className="mt-1"
                        name="passwordConfirm"
                        value={user.passwordConfirm}
                        onChange={handleChange}
                    />
                    {errors.passwordConfirm && user.passwordConfirm === "" && (
                        <p className="text-sm text-red-500">
                            {errors.passwordConfirm}
                        </p>
                    )}
                </label>
                <ButtonPrimary className="flex gap-2" type="submit">
                    {loading? <><SpinnerButton /> Agregando</> :"Agregar usuario"}
                    
                </ButtonPrimary>
            </form>
        </Card>
    );
};

export default FormCreateUser;
