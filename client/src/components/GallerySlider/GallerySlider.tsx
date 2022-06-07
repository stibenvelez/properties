import Glide from "@glidejs/glide";
import useNcId from "hooks/useNcId";
import React, { FC, useEffect, useMemo } from "react";
import NcImage from "shared/NcImage/NcImage";
import NextPrev from "shared/NextPrev/NextPrev";

export interface GallerySliderProps {
    className?: string;
    galleryImgs: string[];
    ratioClass?: string;
    uniqueID: string;
}

const GallerySlider: FC<GallerySliderProps> = ({
    className = "",
    galleryImgs,
    ratioClass = "aspect-w-4 aspect-h-3",
    uniqueID = "uniqueID",
}) => {
    const UNIQUE_CLASS = `gallerySlider__${uniqueID}` + useNcId();

    let MY_GLIDEJS = useMemo(() => {
        return new Glide(`.${UNIQUE_CLASS}`, {
            perView: 1,
            gap: 0,
            keyboard: false,
        });
    }, [UNIQUE_CLASS]);

    useEffect(() => {
        setTimeout(() => {
            MY_GLIDEJS.mount();
        }, 10);
    }, [MY_GLIDEJS, UNIQUE_CLASS, galleryImgs]);

    const renderDots = () => {
        return (
            <div
                className="glide__bullets flex items-center justify-center absolute bottom-2 left-1/2 transform -translate-x-1/2 space-x-1.5"
                data-glide-el="controls[nav]"
            >
                {galleryImgs.map((_, i) => (
                    <button
                        className="glide__bullet w-1.5 h-1.5 rounded-full bg-neutral-300"
                        key={i}
                        data-glide-dir={`=${i}`}
                    />
                ))}
            </div>
        );
    };

    const renderSliderGallery = () => {
        return (
            <div className={`${UNIQUE_CLASS} relative group overflow-hidden`}>
                <div className="glide__track" data-glide-el="track">
                    <ul className="glide__slides">
                        {galleryImgs.length ? (
                            galleryImgs.map((item, index) => (
                                <li key={index} className="glide__slide">
                                    <div className={ratioClass}>
                                        <NcImage
                                            src={`${process.env.REACT_APP_API_PUBLIC_IMG}/${item}`}
                                        />
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="glide__slide">
                                <div className={ratioClass}>
                                    <NcImage src={``} />
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

                {/* DOTS */}
                <div className="absolute inset-x-0 h-10 -bottom-4 bg-gradient-to-t from-neutral-900"></div>
                {renderDots()}

                {/* NAV */}
                <div className="absolute flex justify-between bgtransition-opacity transform -translate-y-1/2 opacity-0 group-hover:opacity-100 top-1/2 inset-x-2">
                    <NextPrev
                        className="justify-between w-full"
                        btnClassName="w-8 h-8"
                    />
                </div>
            </div>
        );
    };

    return (
        <div
            className={`nc-GallerySlider ${className}`}
            data-nc-id="GallerySlider"
        >
            {renderSliderGallery()}
        </div>
    );
};

export default GallerySlider;
