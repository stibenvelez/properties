import React from 'react'
import Input from 'shared/Input/Input'
import Textarea from 'shared/Textarea/Textarea';

const FormContactMe = () => {
  return (
      <div className="p-2">
          <form>
              <di className="grid lg:grid-cols-2 gap-2 ">
                  <div className="w-full">
                      <label htmlFor="firtName">Primer Nombre</label>
                      <Input name="firstName" />
                  </div>
                  <div className="w-full">
                      <label htmlFor="lastName">Primer apellido</label>
                      <Input name="lastName" />
                  </div>
              </di>
              <di className="flex gap-2">
                  <div>
                      <label htmlFor="email">Email</label>
                      <Input type={"email"} name="email" />
                  </div>
              </di>
              <div>
                  <label htmlFor="message">Mensaje</label>
                  <Textarea name="message" />
              </div>
          </form>
      </div>
  );
}

export default FormContactMe