import { useState } from "react";
import { useDispatch } from "react-redux";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Card from "shared/Card";
import Input from "shared/Input/Input";


const FormNewPassword = () => {
        const dispatch = useDispatch();
        const [newPassword, setNewPassword] = useState({
            password: "",
        });
        const [errors, setErrors] = useState({});


        const handleChange = (e) => {
            setNewPassword({
                ...newPassword,
                [e.target.name]: e.target.value,
            });
        };

        const handleSubmit = (e) => {
            e.preventDefault();

        };

  return (
      <Card className=" max-w-4xl mx-auto">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
              <label className="block">
                  <span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
                      contraseña
                  </span>
                  <Input
                      type="password"
                      className="mt-1"
                      name="password"
                      value={newPassword.password}
                      onChange={handleChange}
                  />
              </label>
              <ButtonPrimary type="submit">Regenerar contraseña</ButtonPrimary>
          </form>
      </Card>
  );
}

export default FormNewPassword