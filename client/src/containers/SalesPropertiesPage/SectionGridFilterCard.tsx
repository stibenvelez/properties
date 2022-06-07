import React, { FC } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { PropertyDataType, StayDataType } from "data/types";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import StayCard from "components/StayCard/StayCard";
import PropertyCard from "components/PropertyCard/PropertyCard";
import PropertyList from "./PropertyList";
import { useSelector } from "react-redux";

export interface SectionGridFilterCardProps {
    className?: string;
    properties?: any;
    setFilters?: any;
    filters?: any;
    loading?: boolean;
}

//const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
    className = ""
}) => {

    return (
        <div
            className={`nc-SectionGridFilterCard ${className}`}
            data-nc-id="SectionGridFilterCard"
        >
            <Heading2
                heading={"Venta de apartamentos en Colombia"}
            />

            <div className="mb-8 lg:mb-11">
                <TabFilters/>
            </div>
            <PropertyList />

            {/* <div className="flex items-center justify-center mt-16">
        <Pagination />
      </div> */}
        </div>
    );
};

export default SectionGridFilterCard;
