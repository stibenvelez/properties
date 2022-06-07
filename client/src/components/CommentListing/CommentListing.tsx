import { StarIcon } from "@heroicons/react/solid";
import React, { FC } from "react";
import Avatar from "shared/Avatar/Avatar";

interface CommentListingDataType {
  name: string;
  avatar?: string;
  date: string;
  comment: string;
  starPoint: number;
}

export interface CommentListingProps {
  className?: string;
  data?: CommentListingDataType;
  hasListingTitle?: boolean;
}

const DEMO_DATA: CommentListingDataType = {
  name: "Laura",
  date: "May 20, 2022",
  comment:
    "Exelente propiedad, estoy itneresada",
  starPoint: 5,
};

const CommentListing: FC<CommentListingProps> = ({
  className = "",
  data,
  hasListingTitle,
}) => {
  return (
      <div
          className={`nc-CommentListing flex space-x-4 ${className}`}
          data-nc-id="CommentListing"
      >
          <div className="pt-0.5">
              <Avatar
                  sizeClass="h-10 w-10 text-lg"
                  radius="rounded-full"
                  userName={data && data.name}
                  imgUrl={data && data.avatar}
              />
          </div>
          <div className="flex-grow">
              <div className="flex justify-between space-x-3">
                  <div className="flex flex-col">
                      <div className="text-sm font-semibold">
                          <span>{data && data.name}</span>
                          {hasListingTitle && (
                              <>
                                  <span className="font-normal text-neutral-500 dark:text-neutral-400">
                                      {` review in `}
                                  </span>
                                  <a href="/">The Lounge & Bar</a>
                              </>
                          )}
                      </div>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                          {data && data.date}
                      </span>
                  </div>
                  <div className="flex text-yellow-500">
                      <StarIcon className="w-4 h-4" />
                      <StarIcon className="w-4 h-4" />
                      <StarIcon className="w-4 h-4" />
                      <StarIcon className="w-4 h-4" />
                      <StarIcon className="w-4 h-4" />
                  </div>
              </div>
              <span className="block mt-3 text-neutral-6000 dark:text-neutral-300">
                  {data && data.comment}
              </span>
          </div>
      </div>
  );
};

export default CommentListing;
