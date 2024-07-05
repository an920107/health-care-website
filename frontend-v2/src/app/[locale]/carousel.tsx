"use client";

import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";

type Props = {
  className?: string;
  images: string[];
  interval?: number;
};

export default function Carousel({ className, images, interval = 3000 }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const getNextIndex = (value: number): number => ((value + 1) % images.length);
  const getPreviousIndex = (value: number): number => ((value - 1 + images.length) % images.length);

  const handleNext = () => setCurrentIndex(getNextIndex);
  const handlePrevious = () => setCurrentIndex(getPreviousIndex);

  return (
    <div className={className}>
      <div className="relative rounded-xl aspect-video w-full h-auto overflow-hidden">
        {
          images.map((image, index) => (
            <Image
              key={index} alt="carousel" src={image} fill={true}
              className={`object-cover transform transition-all duration-500 ease-in-out overflow-hidden
          ${index > currentIndex ? "translate-x-full opacity-50" : (index < currentIndex ? "-translate-x-full opacity-50" : "translate-x-0 opacity-100")}`}
            />
          ))
        }
        <CarouselControl
          index={currentIndex}
          total={images.length}
          interval={interval}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onJump={setCurrentIndex}
        />
      </div>
    </div>
  )
}

function CarouselControl({
  index,
  total,
  interval,
  onNext,
  onPrevious,
  onJump,
}: {
  index: number,
  total: number,
  interval: number,
  onNext?: () => void,
  onPrevious?: () => void,
  onJump?: (index: number) => void,
}) {
  const [resetKey, setResetKey] = useState<number>(0);

  useEffect(() => {
    const timeout = setInterval(() => {
      onNext?.();
    }, interval);

    return () => {
      clearInterval(timeout);
    }
  }, [resetKey]);

  const handleButtonClick = () => setResetKey((value) => value + 1);

  return (
    <div id="carousel-control" className="absolute inset-0">
      <FontAwesomeIcon
        id="carousel-left-button"
        icon={faAngleLeft}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 size-5 md:size-6 lg:size-7 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-70 transition-color duration-200 cursor-pointer"
        onClick={() => { onPrevious?.(); handleButtonClick() }}
      />
      <FontAwesomeIcon
        id="carousel-right-button"
        icon={faAngleRight}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 size-5 md:size-6 lg:size-7 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-70 transition-color duration-200 cursor-pointer"
        onClick={() => { onNext?.(); handleButtonClick() }}
      />
      <div className="absolute flex flex-row bottom-4 left-1/2 transform -translate-x-1/2 gap-1.5 md:gap-2">
        {
          Array.from({ length: total }).map((_, i) => (
            <Circle key={i} isSelected={i === index} onClick={() => { onJump?.(i); handleButtonClick() }} />
          ))
        }
      </div>
    </div>
  )
}

function Circle({
  isSelected,
  onClick,
}: {
  isSelected: boolean,
  onClick?: MouseEventHandler<HTMLDivElement>,
}) {
  return (
    <div className={`group relative size-3 md:size-4 rounded-full ${isSelected ? "bg-opacity-70" : "bg-opacity-40"} bg-black cursor-pointer`} onClick={onClick}>
      <div className={`absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isSelected ? "size-1.5" : "size-0 group-hover:size-1"} transition-all duration-200 rounded-full bg-white bg-opacity-80`}></div>
    </div>
  )
}