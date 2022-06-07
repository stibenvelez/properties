import Heading from "shared/Heading/Heading";
import NcImage from "shared/NcImage/NcImage";
import NcPlayIcon from "shared/NcPlayIcon/NcPlayIcon";
import NcPlayIcon2 from "shared/NcPlayIcon2/NcPlayIcon2";
import React, { FC, useState } from "react";

export interface VideoType {
  id: string;
  title: string;
  thumbnail: string;
}

export interface SectionVideosProps {
  videos?: VideoType[];
  className?: string;
}

const VIDEOS_DEMO: VideoType[] = [
    {
        id: "y9j-BL5ocW8",
        title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
        thumbnail: "https://i.ytimg.com/vi/SulT6yU9PDg/maxresdefault.jpg",
    },
    {
        id: "a5V6gdu5ih8",
        title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
        thumbnail:
            "https://cf.bstatic.com/xdata/images/xphoto/max1440/48385397.jpg?k=e7b48ee8f9232b57f6729cb751b77dcfea53b8a2f00ae1aaa1ac6216de812c57&o=",
    },
    {
        id: "MuB7HHeuNbc",
        title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
        thumbnail:
            "https://construccionesprisma.com.co/images/listing_photos/14_fuenteclarafachada002.jpg",
    },
    {
        id: "eEaZvEZye84",
        title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
        thumbnail: "https://i.ytimg.com/vi/szYedG4ixnQ/maxresdefault.jpg",
    },
    {
        id: "EuDJZDaSP0Q",
        title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
        thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8YAaGGB3pxCZmidBZZLGMo1VGfFYYaTyMVw&usqp=CAU",
    },
];

const SectionVideos: FC<SectionVideosProps> = ({
  videos = VIDEOS_DEMO,
  className = "",
}) => {
  const [isPlay, setIsPlay] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);

  const renderMainVideo = () => {
    const video: VideoType = videos[currentVideo];
    return (
      <div
        className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-3xl overflow-hidden border-4 border-white dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px] will-change-transform"
        title={video.title}
      >
        {isPlay ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <div
              onClick={() => setIsPlay(true)}
              className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
            >
              <NcPlayIcon />
            </div>
            <NcImage
              containerClassName="absolute inset-0 "
              className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-105 nc-will-change-transform"
              src={video.thumbnail}
              title={video.title}
              alt={video.title}
            />
          </>
        )}
      </div>
    );
  };

  const renderSubVideo = (video: VideoType, index: number) => {
    if (index === currentVideo) return null;
    return (
      <div
        className="relative overflow-hidden cursor-pointer group aspect-h-16 aspect-w-16 rounded-2xl sm:aspect-h-12 sm:rounded-3xl lg:aspect-h-9 will-change-transform"
        onClick={() => {
          setCurrentVideo(index);
          !isPlay && setIsPlay(true);
        }}
        title={video.title}
        key={String(index)}
      >
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <NcPlayIcon2 />
        </div>
        <NcImage
          containerClassName="absolute inset-0 w-full h-full"
          className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-110 nc-will-change-transform"
          src={video.thumbnail}
          title={video.title}
          alt={video.title}
        />
      </div>
    );
  };

  return (
    <div className={`nc-SectionVideos ${className}`}>
      <Heading
        desc="Conoce algunos de los inmuebles que tenemos disponibles para ti"
      >
        🎬 Videos
      </Heading>

      <div className="relative flex flex-col sm:pr-4 sm:py-4 md:pr-6 md:py-6 xl:pr-14 xl:py-14 lg:flex-row">
        <div className="absolute -top-4 -bottom-4 -right-4 w-2/3 rounded-3xl bg-primary-100 bg-opacity-40 z-0 sm:rounded-[50px] md:top-0 md:bottom-0 md:right-0 xl:w-1/2 dark:bg-neutral-800 dark:bg-opacity-40"></div>
        <div className="relative flex-grow pb-2 sm:pb-4 lg:pb-0 lg:pr-5 xl:pr-6">
          {renderMainVideo()}
        </div>
        <div className="grid flex-shrink-0 grid-cols-4 gap-2 sm:gap-6 lg:grid-cols-1 lg:w-36 xl:w-40">
          {videos.map(renderSubVideo)}
        </div>
      </div>
    </div>
  );
};

export default SectionVideos;
