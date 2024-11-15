"use client";

import React from "react";
import Image from "next/image";
import classNames from "classnames";

interface HomeCardProps {
  className: string;
  img: string;
  title: string;
  description: string;
  handleClick: () => void;
}

const HomeCard = ({
  className,
  img,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <div
      className={classNames("w-full bg-orange-1 px-4 py-6 flex flex-col justify-between xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer", className)}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image
          src={img}
          width={27}
          height={27}
          alt={title}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
