import React, { FC, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/outline";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import CommentListing from "components/CommentListing/CommentListing";
import FiveStartIconForRate from "components/FiveStartIconForRate/FiveStartIconForRate";
import GuestsInput from "components/HeroSearchForm/GuestsInput";
import StayDatesRangeInput from "components/HeroSearchForm/StayDatesRangeInput";
import { DateRage } from "components/HeroSearchForm/StaySearchForm";
import StartRating from "components/StartRating/StartRating";
import GoogleMapReact from "google-map-react";
import useWindowSize from "hooks/useWindowResize";
import moment from "moment";
import { DayPickerRangeController, FocusedInputShape } from "react-dates";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonCircle from "shared/Button/ButtonCircle";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Input from "shared/Input/Input";
import NcImage from "shared/NcImage/NcImage";
import LikeSaveBtns from "./LikeSaveBtns";
import ModalPhotos from "./ModalPhotos";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { useParams } from "react-router-dom";
import clientAxios from "config/axios";
import formatMoney from "utils/formatMoney";
import { LOADIPHLPAPI } from "dns";

export interface ListingStayDetailPageProps {
    className?: string;
    isPreviewMode?: boolean;
}
const COMMENTS = [
    {
        name: "Laura",
        date: "May 20, 2022",
        comment: "Exelente propiedad, estoy itneresada",
        starPoint: 5,
    },
    {
        name: "Jorge",
        date: "May 25, 2022",
        comment: "Excelente atencion, mil gracias",
        starPoint: 5,
    },
    {
        name: "Carlos",
        date: "May 28, 2022",
        comment: "Me brindaron informacion a tiempo, muy agradable",
        starPoint: 5,
    },
];

const PHOTOS: string[] = [
    "https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    "https://images.pexels.com/photos/7163619/pexels-photo-7163619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/6527036/pexels-photo-6527036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/6438752/pexels-photo-6438752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/2861361/pexels-photo-2861361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/2677398/pexels-photo-2677398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];

const Amenities_demos = [
    { name: "la-key", icon: "la-key" },
    { name: "la-luggage-cart", icon: "la-luggage-cart" },
    { name: "la-shower", icon: "la-shower" },
    { name: "la-smoking", icon: "la-smoking" },
    { name: "la-snowflake", icon: "la-snowflake" },
    { name: "la-spa", icon: "la-spa" },
    { name: "la-suitcase", icon: "la-suitcase" },
    { name: "la-suitcase-rolling", icon: "la-suitcase-rolling" },
    { name: "la-swimmer", icon: "la-swimmer" },
    { name: "la-swimming-pool", icon: "la-swimming-pool" },
    { name: "la-tv", icon: "la-tv" },
    { name: "la-umbrella-beach", icon: "la-umbrella-beach" },
    { name: "la-utensils", icon: "la-utensils" },
    { name: "la-wheelchair", icon: "la-wheelchair" },
    { name: "la-wifi", icon: "la-wifi" },
    { name: "la-baby-carriage", icon: "la-baby-carriage" },
    { name: "la-bath", icon: "la-bath" },
    { name: "la-bed", icon: "la-bed" },
    { name: "la-briefcase", icon: "la-briefcase" },
    { name: "la-car", icon: "la-car" },
    { name: "la-cocktail", icon: "la-cocktail" },
    { name: "la-coffee", icon: "la-coffee" },
    { name: "la-concierge-bell", icon: "la-concierge-bell" },
    { name: "la-dice", icon: "la-dice" },
    { name: "la-dumbbell", icon: "la-dumbbell" },
    { name: "la-hot-tub", icon: "la-hot-tub" },
    { name: "la-infinity", icon: "la-infinity" },
];

const TEST_IMAGES = [
    "image1",
    "image2",
    "image3",
    "image4",
    "image5",
    "image6",
    "image7",
];

const PropertyDetailPage: FC<ListingStayDetailPageProps> = ({
    className = "",
    isPreviewMode,
}) => {
    const [property, setProperty] = useState<any>({});
    const [isOpen, setIsOpen] = useState(false);
    const [openFocusIndex, setOpenFocusIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState<DateRage>({
        startDate: moment(),
        endDate: moment().add(4, "days"),
    });

    const [focusedInputSectionCheckDate, setFocusedInputSectionCheckDate] =
        useState<FocusedInputShape>("startDate");
    let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);

    const { id }: any = useParams();

    useEffect(() => {
        if (id) {
            (async () => {
                const { data } = await clientAxios(`/properties/${id}`);
                setProperty(data);
            })();
        }
    }, []);

    const windowSize = useWindowSize();

    const getDaySize = () => {
        if (windowSize.width <= 375) {
            return 34;
        }
        if (windowSize.width <= 500) {
            return undefined;
        }
        if (windowSize.width <= 1280) {
            return 56;
        }
        return 48;
    };

    function closeModalAmenities() {
        setIsOpenModalAmenities(false);
    }

    function openModalAmenities() {
        setIsOpenModalAmenities(true);
    }

    const handleOpenModal = (index: number) => {
        setIsOpen(true);
        setOpenFocusIndex(index);
    };

    const handleCloseModal = () => setIsOpen(false);

    const renderSection1 = () => {
        return (
            <div className="listingSection__wrap !space-y-6">
                {/* 1 */}
                {/* <div className="flex items-center justify-between">
                    <Badge name="Wooden house" />
                    <LikeSaveBtns />
                </div> */}

                {/* 2 */}
                <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                    {property.title}
                </h2>

                {/* 3 */}
                <div className="flex items-center space-x-4">
                    <StartRating />
                    <span>·</span>
                    <span>
                        <i className="las la-map-marker-alt"></i>
                        <span className="ml-1">{property.city}</span>
                    </span>
                    <span>·</span>
                    <span>
                        <i className="las la-home"></i>
                        <span className="ml-1">{property.reference}</span>
                    </span>
                </div>

                {/* 4 */}
                <div className="flex items-center">
                    <Avatar
                        hasChecked
                        sizeClass="h-10 w-10"
                        radius="rounded-full"
                    />
                    <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
                        Contacto{" "}
                        <span className="font-medium text-neutral-900 dark:text-neutral-200">
                            {property.contactName}
                        </span>
                    </span>
                </div>

                {/* 5 */}
                <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

                {/* 6 */}
                <div className="flex items-center justify-between space-x-8 text-sm xl:justify-start xl:space-x-12 text-neutral-700 dark:text-neutral-300">
                    <div className="flex items-center space-x-3 ">
                        <i className="text-2xl las la-ruler-horizontal"></i>
                        <span className="">
                            {property.area}{" "}
                            <span className="hidden sm:inline-block">m2</span>
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <i className="text-2xl las la-bath"></i>
                        <span className="">
                            {property.bathrooms}{" "}
                            <span className="hidden sm:inline-block">
                                baños
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <i className="text-2xl las la-house"></i>
                        <span className="">
                            {property.stratum}{" "}
                            <span className="hidden sm:inline-block">
                                estrato
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <i className="text-2xl las la-door-open"></i>
                        <span className="">
                            {property.bedrooms}{" "}
                            <span className="hidden sm:inline-block">hab</span>
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <i className="text-2xl las la-parking"></i>
                        <span className="">
                            <span className="hidden sm:inline-block">
                                Parqueadero
                            </span>{" "}
                            {property.parking ? "si" : "no"}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    const renderSection2 = () => {
        return (
            <div className="listingSection__wrap">
                <h2 className="text-2xl font-semibold">Descripción</h2>
                <div className="border-b w-14 border-neutral-200 dark:border-neutral-700"></div>
                <div className="text-neutral-6000 dark:text-neutral-300">
                    <span>{property.description}</span>
                </div>
            </div>
        );
    };

    const renderSection3 = () => {
        return (
            <div className="listingSection__wrap">
                <div>
                    <h2 className="text-2xl font-semibold">Amenities </h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        About the property's amenities and services
                    </span>
                </div>
                <div className="border-b w-14 border-neutral-200 dark:border-neutral-700"></div>
                {/* 6 */}
                <div className="grid grid-cols-1 gap-6 text-sm xl:grid-cols-3 text-neutral-700 dark:text-neutral-300 ">
                    {Amenities_demos.filter((_, i) => i < 12).map((item) => (
                        <div
                            key={item.name}
                            className="flex items-center space-x-3"
                        >
                            <i className={`text-3xl las ${item.icon}`}></i>
                            <span className="">{item.name}</span>
                        </div>
                    ))}
                </div>

                {/* ----- */}
                <div className="border-b w-14 border-neutral-200"></div>
                <div>
                    <ButtonSecondary onClick={openModalAmenities}>
                        View more 20 amenities
                    </ButtonSecondary>
                </div>
                {renderMotalAmenities()}
            </div>
        );
    };

    const renderMotalAmenities = () => {
        return (
            <Transition appear show={isOpenModalAmenities} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto"
                    onClose={closeModalAmenities}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full h-screen py-8">
                                <div className="inline-flex flex-col w-full h-full max-w-4xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100">
                                    <div className="relative flex-shrink-0 px-6 py-4 text-center border-b border-neutral-200 dark:border-neutral-800">
                                        <h3
                                            className="text-lg font-medium leading-6 text-gray-900"
                                            id="headlessui-dialog-title-70"
                                        >
                                            Amenities
                                        </h3>
                                        <span className="absolute left-3 top-3">
                                            <ButtonClose
                                                onClick={closeModalAmenities}
                                            />
                                        </span>
                                    </div>
                                    <div className="px-8 overflow-auto divide-y text-neutral-700 dark:text-neutral-300 divide-neutral-200">
                                        {Amenities_demos.filter(
                                            (_, i) => i < 1212
                                        ).map((item) => (
                                            <div
                                                key={item.name}
                                                className="flex items-center py-6 space-x-8"
                                            >
                                                <i
                                                    className={`text-4xl text-neutral-6000 las ${item.icon}`}
                                                ></i>
                                                <span>{item.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        );
    };

    const renderSection4 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <div>
                    <h2 className="text-2xl font-semibold">Room Rates </h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        Prices may increase on weekends or holidays
                    </span>
                </div>
                <div className="border-b w-14 border-neutral-200 dark:border-neutral-700"></div>
                {/* CONTENT */}
                <div className="flow-root">
                    <div className="-mb-4 text-sm sm:text-base text-neutral-6000 dark:text-neutral-300">
                        <div className="flex items-center justify-between p-4 space-x-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                            <span>Monday - Thursday</span>
                            <span>$199</span>
                        </div>
                        <div className="flex items-center justify-between p-4 space-x-4 rounded-lg">
                            <span>Monday - Thursday</span>
                            <span>$199</span>
                        </div>
                        <div className="flex items-center justify-between p-4 space-x-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                            <span>Friday - Sunday</span>
                            <span>$219</span>
                        </div>
                        <div className="flex items-center justify-between p-4 space-x-4 rounded-lg">
                            <span>Rent by month</span>
                            <span>-8.34 %</span>
                        </div>
                        <div className="flex items-center justify-between p-4 space-x-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                            <span>Minimum number of nights</span>
                            <span>1 night</span>
                        </div>
                        <div className="flex items-center justify-between p-4 space-x-4 rounded-lg">
                            <span>Max number of nights</span>
                            <span>90 nights</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderSectionCheckIndate = () => {
        return (
            <div className="overflow-hidden listingSection__wrap">
                {/* HEADING */}
                <div>
                    <h2 className="text-2xl font-semibold">Availability</h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        Prices may increase on weekends or holidays
                    </span>
                </div>
                <div className="border-b w-14 border-neutral-200 dark:border-neutral-700"></div>
                {/* CONTENT */}

                <div className="flow-root listingSection__wrap__DayPickerRangeController">
                    <div className="-mx-4 sm:mx-auto xl:mx-[-22px]">
                        <DayPickerRangeController
                            startDate={selectedDate.startDate}
                            endDate={selectedDate.endDate}
                            onDatesChange={(date) => setSelectedDate(date)}
                            focusedInput={focusedInputSectionCheckDate}
                            onFocusChange={(focusedInput) =>
                                setFocusedInputSectionCheckDate(
                                    focusedInput || "startDate"
                                )
                            }
                            initialVisibleMonth={null}
                            numberOfMonths={windowSize.width < 1280 ? 1 : 2}
                            daySize={getDaySize()}
                            hideKeyboardShortcutsPanel={false}
                        />
                    </div>
                </div>
            </div>
        );
    };

    const renderSection5 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold">Contacto</h2>
                <div className="border-b w-14 border-neutral-200 dark:border-neutral-700"></div>

                {/* host */}
                <div className="flex items-center space-x-4">
                    <Avatar
                        hasChecked
                        hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
                        sizeClass="h-14 w-14"
                        radius="rounded-full"
                    />
                    <div>
                        <a className="block text-xl font-medium" href="##">
                            {property.contactName}
                        </a>
                        {/* <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                            <StartRating />
                            <span className="mx-2">·</span>
                            <span> 12 places</span>
                        </div> */}
                    </div>
                </div>

                {/* info */}
                <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
                    <div className="flex items-center space-x-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span>{property.phone}</span>
                    </div>
                </div>
                {/* email */}
                {property.email && (
                    <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
                        <div className="flex items-center space-x-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                            </svg>
                            <span>{property.email}</span>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderSection6 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold">
                    Comentarios (3 comentarios)
                </h2>
                <div className="border-b w-14 border-neutral-200 dark:border-neutral-700"></div>

                {/* Content */}
                {/* <div className="space-y-5">
                    <FiveStartIconForRate
                        iconClass="w-6 h-6"
                        className="space-x-0.5"
                    />
                    <div className="relative">
                        <Input
                            fontClass=""
                            sizeClass="h-16 px-4 py-3"
                            rounded="rounded-3xl"
                            placeholder="Share your thoughts ..."
                        />
                        <ButtonCircle
                            className="absolute transform -translate-y-1/2 right-2 top-1/2"
                            size=" w-12 h-12 "
                        >
                            <ArrowRightIcon className="w-5 h-5" />
                        </ButtonCircle>
                    </div>
                </div> */}

                {/* comment */}
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {COMMENTS.map((data: any) => (
                        <CommentListing data={data} className="py-8" />
                    ))}

                    {/* <div className="pt-8">
                        <ButtonSecondary>View more 20 reviews</ButtonSecondary>
                    </div> */}
                </div>
            </div>
        );
    };

    const renderSection7 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <div>
                    <h2 className="text-2xl font-semibold">Ubicacion</h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        {property.building} - {property.address} -{" "}
                        <span className="capitalize">{property.city} </span>
                    </span>
                </div>
                <div className="border-b w-14 border-neutral-200 dark:border-neutral-700" />

                {/* MAP */}
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
                        >
                            <LocationMarker
                                lat={property.latitude}
                                lng={property.longitude}
                            />
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
        );
    };

    const renderSection8 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold">Things to know</h2>
                <div className="border-b w-14 border-neutral-200 dark:border-neutral-700" />

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold">
                        Cancellation policy
                    </h4>
                    <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                        Refund 50% of the booking value when customers cancel
                        the room within 48 hours after successful booking and 14
                        days before the check-in time. <br />
                        Then, cancel the room 14 days before the check-in time,
                        get a 50% refund of the total amount paid (minus the
                        service fee).
                    </span>
                </div>
                <div className="border-b w-14 border-neutral-200 dark:border-neutral-700" />

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold">Check-in time</h4>
                    <div className="max-w-md mt-3 text-sm text-neutral-500 dark:text-neutral-400 sm:text-base">
                        <div className="flex justify-between p-3 space-x-10 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                            <span>Check-in</span>
                            <span>08:00 am - 12:00 am</span>
                        </div>
                        <div className="flex justify-between p-3 space-x-10">
                            <span>Check-out</span>
                            <span>02:00 pm - 04:00 pm</span>
                        </div>
                    </div>
                </div>
                <div className="border-b w-14 border-neutral-200 dark:border-neutral-700" />

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold">Special Note</h4>
                    <div className="prose sm:prose">
                        <ul className="mt-3 space-y-2 text-neutral-500 dark:text-neutral-400">
                            <li>
                                Ban and I will work together to keep the
                                landscape and environment green and clean by not
                                littering, not using stimulants and respecting
                                people around.
                            </li>
                            <li>Do not sing karaoke past 11:30</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    const renderSidebar = () => {
        return (
            <div className="shadow-xl listingSectionSidebar__wrap">
                {/* PRICE */}
                <div className="flex flex-col items-center justify-between">
                    <span className="text-3xl font-semibold">
                        {formatMoney.format(property.price)}
                    </span>
                    <span className="text-sm">
                        Administracion{" "}
                        {formatMoney.format(property.lastAdminprice)}
                    </span>
                    {/* <StartRating /> */}
                </div>

                {/* SUM */}
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                        <span>¿Te interesó este inmueble?</span>
                    </div>
                </div>

                {/* SUBMIT */}
                <ButtonPrimary>Quiero que me contacten</ButtonPrimary>
            </div>
        );
    };

    return (
        <div
            className={`nc-ListingStayDetailPage  ${className}`}
            data-nc-id="ListingStayDetailPage"
        >
            {/* SINGLE HEADER */}
            <>
                <header className="container rounded-md 2xl:px-14 sm:rounded-xl">
                    <div className="relative grid grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-2">
                        <div
                            className={` ${
                                property.galleryImgs &&
                                property.galleryImgs.length <= 1
                                    ? "col-span-3"
                                    : "col-span-2"
                            } relative  row-span-3 overflow-hidden rounded-md cursor-pointer sm:row-span-2 sm:rounded-xl`}
                            onClick={() => handleOpenModal(0)}
                        >
                           
                            <NcImage
                                containerClassName={`${
                                    property.galleryImgs &&
                                    property.galleryImgs.length <= 1
                                        ? "relative"
                                        : "absolute"
                                } inset-0`}
                                className="object-cover w-full h-full rounded-md sm:rounded-xl"
                                src={
                                    (property.galleryImgs?.length &&
                                        `${process.env.REACT_APP_API_PUBLIC_IMG}/${property.galleryImgs[0]}`) 
                                }
                            />
                            <div className="absolute inset-0 transition-opacity opacity-0 bg-neutral-900 bg-opacity-20 hover:opacity-100"></div>
                        </div>
                        {property.galleryImgs &&
                            property.galleryImgs
                                .filter((_: any, i: number) => i >= 1 && i < 5)
                                .map((item: any, index: any) => (
                                    <div
                                        key={index}
                                        className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                                            index >= 3 ? "hidden sm:block" : ""
                                        }`}
                                    >
                                        <NcImage
                                            containerClassName="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5"
                                            className="object-cover w-full h-full rounded-md sm:rounded-xl "
                                            src={
                                                `${process.env.REACT_APP_API_PUBLIC_IMG}/${item}`
                                            }
                                        />

                                        {/* OVERLAY */}
                                        <div
                                            className="absolute inset-0 transition-opacity opacity-0 cursor-pointer bg-neutral-900 bg-opacity-20 hover:opacity-100"
                                            onClick={() =>
                                                handleOpenModal(index + 1)
                                            }
                                        />
                                    </div>
                                ))}

                        <div
                            className="absolute z-10 hidden px-4 py-2 cursor-pointer md:flex md:items-center md:justify-center left-3 bottom-3 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                            onClick={() => handleOpenModal(0)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                />
                            </svg>
                            <span className="ml-2 text-sm font-medium text-neutral-800">
                                Ver todas las fotos
                            </span>
                        </div>
                    </div>
                </header>
                {/* MODAL PHOTOS */}
                {property.galleryImgs && (
                    <ModalPhotos
                        imgs={property.galleryImgs}
                        isOpen={isOpen}
                        onClose={handleCloseModal}
                        initFocus={openFocusIndex}
                        uniqueClassName="nc-ListingStayDetailPage-modalPhotos"
                    />
                )}
            </>

            {/* MAIn */}
            <main className="container relative z-10 flex flex-col mt-11 lg:flex-row ">
                {/* CONTENT */}
                <div className="w-full space-y-8 lg:w-3/5 xl:w-2/3 lg:space-y-10 lg:pr-10">
                    {renderSection1()}
                    {property.desciption && renderSection2()}
                    {/* {renderSection3()} */}
                    {/* {renderSection4()} */}
                    {/* {renderSectionCheckIndate()} */}
                    {renderSection5()}
                    {renderSection6()}
                    {renderSection7()}
                    {/* {renderSection8()} */}
                </div>

                {/* SIDEBAR */}
                <div className="flex-grow block mt-14 lg:mt-0">
                    <div className="sticky top-24">{renderSidebar()}</div>
                </div>
            </main>

            {/* STICKY FOOTER MOBILE */}
            {!isPreviewMode && (
                <div className="fixed inset-x-0 bottom-0 z-20 block py-4 bg-white border-t lg:hidden text-neutral-900 border-neutral-200">
                    <div className="container flex items-center justify-between">
                        <span className="text-2xl font-semibold">
                            $311
                            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                                /night
                            </span>
                        </span>

                        <ButtonPrimary href="##">Reserve</ButtonPrimary>
                    </div>
                </div>
            )}

            {/* OTHER SECTION */}
            {!isPreviewMode && (
                <div className="container py-24 lg:py-32">
                    {/* SECTION 1 */}
                    {/*  <div className="relative py-16">
                        <BackgroundSection />
                      <SectionSliderNewCategories
                            heading="Explore by types of stays"
                            subHeading="Explore houses based on 10 types of stays"
                            categoryCardType="card5"
                            itemPerRow={5}
                            sliderStyle="style2"
                            uniqueClassName={"ListingStayDetailPage1"}
                        /> 
                    </div>*/}

                    {/* SECTION */}
                    <SectionSubscribe2 className="pt-24 lg:pt-32" />
                </div>
            )}
        </div>
    );
};

export default PropertyDetailPage;
