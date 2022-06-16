import { useState } from "react";
import { useDispatch } from "react-redux";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Card from "shared/Card";
import Input from "shared/Input/Input";
import { createUserAction } from "store/slice/user/userActions";

const FormForgetPassword = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        email: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //const Errors = validateForm();
        //if (Errors) return false;
        //dispatch(createUserAction(user));
    };
    return (
        <Card className=" max-w-4xl mx-auto">
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                        Email
                    </span>
                    <Input
                        type="email"
                        placeholder="example@example.com"
                        className="mt-1"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </label>
                <ButtonPrimary type="submit">Regenerar contraseña</ButtonPrimary>
            </form>
        </Card>
    );
};

export default FormForgetPassword;
