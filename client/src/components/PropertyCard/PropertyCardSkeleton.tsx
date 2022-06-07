import React, { FC } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { PropertyDataType, StayDataType } from "data/types";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import formatMoney from "utils/formatMoney";

export interface StayCardProps {
    className?: string;
    property?: PropertyDataType;
    size?: "default" | "small";
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const PropertyCardSkeleton: FC<StayCardProps> = ({
    size = "default",
    className = "",

}) => {

    const renderContent = () => {
        return (
            <div
                className={
                    size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"
                }
            >
                <div className="space-y-2">
                    <div className="flex gap-3"></div>
                    <div className="flex items-center space-x-2">
                        <div className="block bg-gray-200 h-4 w-full"></div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <div className="block bg-gray-200 h-2 w-full"></div>
                    </div>
                </div>
                <div className="border-b w-14 border-neutral-100 dark:border-neutral-800"></div>
                <div className="flex items-center justify-between">
                    <div className="block  font-semibold bg-gray-200 h-2 w-full"></div>
                </div>
            </div>
        );
    };

    return (
        <div
            className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow animate-pulse ${className}`}
            data-nc-id="StayCard "
        >
            <Link to={'#'}>
                           <div className="relative w-full h-52 bg-gray-100">
                
            </div>
                {renderContent()}
            </Link>
        </div>
    );
};

export default PropertyCardSkeleton;
