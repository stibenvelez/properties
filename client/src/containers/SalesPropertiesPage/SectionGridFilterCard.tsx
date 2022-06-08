import { FC } from "react";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import PropertyList from "./PropertyList";

export interface SectionGridFilterCardProps {
    className?: string;
    properties?: any;
    setFilters?: any;
    filters?: any;
    loading?: boolean;
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
    className = "",
}) => {
    return (
        <div
            className={`nc-SectionGridFilterCard ${className}`}
            data-nc-id="SectionGridFilterCard"
        >
            <Heading2 heading={"Venta de apartamentos en Colombia"} />

            <div className="mb-8 lg:mb-11">
                <TabFilters />
            </div>
            <PropertyList />

            {/* <div className="flex items-center justify-center mt-16">
        <Pagination />
      </div> */}
        </div>
    );
};

export default SectionGridFilterCard;
