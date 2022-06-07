import React, { FC } from "react";
import ButtonCircle from "shared/Button/ButtonCircle";
import rightImg from "./PR_Monochromatic.svg";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";
import Input from "shared/Input/Input";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="text-4xl font-semibold">Recibe actualizaciones 🎉</h2>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          Puedes estar tranquilo, nostros te enviaremos las ultimas actualziaciones y notificaciones del inmueble que estas buscando.
        </span>
        <form className="relative max-w-sm mt-10">
          <Input
            required
            aria-required
            placeholder="Ingresa tu Email"
            type="email"
          />
          <ButtonCircle
            type="submit"
            className="absolute transform -translate-y-1/2 top-1/2 right-1"
          >
            <i className="text-xl las la-arrow-right"></i>
          </ButtonCircle>
        </form>
      </div>
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
    </div>
  );
};

export default SectionSubscribe2;
