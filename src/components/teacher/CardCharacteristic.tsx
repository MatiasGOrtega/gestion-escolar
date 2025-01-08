import Image from "next/image";
import React from "react";

interface Props {
  name: string;
  value: number | string;
  imageLink: string;
}

function CardCharacteristic({name, value, imageLink}: Props) {
  return (
    <div className="p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow">
      <Image
        src={imageLink}
        alt=""
        width={24}
        height={24}
        className="w-6 h-6"
      />
      <div className="">
        <h1 className="text-xl font-semibold">{value}</h1>
        <span className="text-sm text-gray-400">{name}</span>
      </div>
    </div>
  );
}

export default CardCharacteristic;
