import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginAction } from "store/slice/auth/authActions";
import AlertError from "./AlertError";

const INITIAL_STATE_USER = {
    user: "",
    password: "",
};

const FormLoginAdmin = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(INITIAL_STATE_USER);

    const { error, msg, auth } = useSelector(({ auth }) => auth);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAction(user));
    };
    useEffect(() => {
        if (auth) {
            console.log("auth");
            <Redirect
                to="/admin"
            />;
        }
    }, []);
    
    return (
        <div className="bg-white max-w-2xl mx-auto p-8 rounded-lg shadow ">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <div>
                        <label>usuario</label>
                        <input
                            type="text"
                            className="border border-gray-200 p-2 rounded-lg w-full"
                            name="user"
                            value={user.user}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>clave</label>
                        <input
                            type="password"
                            className="border border-gray-200 p-2 rounded-lg w-full"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <AlertError msg={msg}/>}
                    <div>
                        <button className="bg-indigo-800 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg">
                            Ingresar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormLoginAdmin;
