import React, { useState } from "react";
import { FC } from "react";
import { useEffect } from "react";
import ClearDataButton from "./ClearDataButton";
import { useRef } from "react";
import clientAxios from "config/axios";
import { useSelector } from "react-redux";

export interface LocationInputProps {
  defaultValue: string;
  onChange?: (value: string) => void;
  onInputDone?: (value: string) => void;
  placeHolder?: string;
  desc?: string;
  className?: string;
  autoFocus?: boolean;
}

const LocationInput: FC<LocationInputProps> = ({
  defaultValue,
  autoFocus = false,
  onChange,
  onInputDone,
  placeHolder = "Ciudad",
  desc = "¿En qué ciudad?",
  className = "nc-flex-1.5",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState(defaultValue);
  const [showPopover, setShowPopover] = useState(autoFocus);

  const cities = useSelector(({ cities }: any) => cities.cities);
  
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);



  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv);
    }
    showPopover && document.addEventListener("click", eventClickOutsideDiv);
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
  }, [showPopover]);

  useEffect(() => {
    onChange && onChange(value);
  }, [value]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;
    // CLICK IN_SIDE
    if (!showPopover || containerRef.current.contains(event.target as Node)) {
      return;
    }
    // CLICK OUT_SIDE
    setShowPopover(false);
  };

  const handleSelectLocation = (item: string) => {
    setValue(item);
    onInputDone && onInputDone(item);
    setShowPopover(false);
  };
  
  const renderRecentSearches = () => {
    return (
        <>
            <h3 className="block px-4 mt-2 text-base font-semibold sm:mt-0 sm:px-8 sm:text-lg text-neutral-800 dark:text-neutral-100">
                Busquedas recientes
            </h3>
            <div className="mt-2">
                {cities &&
                    cities.map((item: any) => (
                        <span
                            onClick={() => handleSelectLocation(item.city)}
                            key={item.cityId}
                            className="flex items-center px-4 py-4 space-x-3 cursor-pointer sm:px-8 sm:space-x-4 sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        >
                            <span className="block text-neutral-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 sm:h-6 sm:w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </span>
                            <span className="block font-medium text-neutral-700 dark:text-neutral-200">
                                {item.city}
                            </span>
                        </span>
                    ))}
            </div>
        </>
    );
  };
    const filteredPeople =
        value === ""
            ? cities
            : cities.filter((city:any) =>
                  city.city
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(value.toLowerCase().replace(/\s+/g, ""))
              );
  
  const renderSearchValue = () => {
    return (
        <>
            {filteredPeople.map((item: any) => (
                <span
                    onClick={() => handleSelectLocation(item?.city)}
                    key={item?.cityId}
                    className="flex items-center px-4 py-4 space-x-3 cursor-pointer sm:px-8 sm:space-x-4 sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                
                    <span className="block text-neutral-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 sm:h-6 sm:w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </span>
                    <div>
                        <span className="block font-medium text-neutral-700 dark:text-neutral-200">
                            {item?.city}
                        </span>
                        <span className="block text-neutral-700 dark:text-neutral-200">
                            {item?.departament}
                        </span>
                    </div>
                </span>
            ))}
        </>
    );
  };

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${
          showPopover ? "nc-hero-field-focused" : ""
        }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nc-icon-field"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div className="flex-grow">
          <input
            className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
            placeholder={placeHolder}
            value={value}
            autoFocus={showPopover}
            onChange={(e) => setValue(e.currentTarget.value)}
            ref={inputRef}
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
          </span>
          {value && showPopover && (
            <ClearDataButton onClick={() => setValue("")} />
          )}
        </div>
      </div>
      {showPopover && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[600px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-hidden">
          
          {value ? renderSearchValue() : renderRecentSearches()}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
