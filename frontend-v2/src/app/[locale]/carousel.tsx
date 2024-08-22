"use client";

import CarouselUsecase from "@/module/carousel/application/carouselUsecase";
import CarouselEntity from "@/module/carousel/domain/carouselEntity";
import CarouselRepoImpl from "@/module/carousel/presenter/carouselRepoImpl";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";
import CarouselViewModel from "@/module/carousel/presenter/carouselViewModel";
import { Link } from "@/navigation";

type Props = {
  className?: string;
  locale: string;
};

export default function Carousel({
  className,
  locale,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [carousels, setCarousels] = useState<CarouselEntity[]>([]);

  const usecase = new CarouselUsecase(new CarouselRepoImpl());

  useEffect(() => {
    usecase.getAllCarousels({ visibility: true})
      .then((entities) => setCarousels(entities))
      .catch((err) => console.error("Fetching carousel failed:", err));
  }, []);

  const getNextIndex = (value: number): number => ((value + 1) % carousels.length);
  const getPreviousIndex = (value: number): number => ((value - 1 + carousels.length) % carousels.length);

  const goNext = () => setCurrentIndex(getNextIndex);
  const goPrevious = () => setCurrentIndex(getPreviousIndex);

  const isEn = locale === "en";

  return (
    <div className={`${className ?? ""} ${carousels.length === 0 ? "hidden" : ""} relative rounded-xl aspect-video w-full h-auto overflow-hidden`}>
      {
        carousels.map((entity, index) => {
          const viewModel = new CarouselViewModel(entity);
          return (
            <Image
              key={index}
              alt={isEn ? viewModel.titleEn : viewModel.title}
              src={viewModel.imageUrl}
              fill={true}
              priority={true}
              sizes="50vw"
              className={`object-cover transform transition-all duration-500 ease-in-out overflow-hidden
              ${index > currentIndex ? "translate-x-full opacity-50" : (index < currentIndex ? "-translate-x-full opacity-50" : "translate-x-0 opacity-100")}`}
            />
          );
        })
      }
      <CarouselControl />
    </div>
  );

  function CarouselControl() {
    const [resetKey, setResetKey] = useState<number>(0);

    useEffect(() => {
      const timeout = setInterval(goNext, 3000);
      return () => { clearInterval(timeout) };
    }, [resetKey]);

    const handleButtonClick = () => setResetKey((value) => value + 1);

    return (
      <div id="carousel-control" className="absolute inset-0">
        {
          carousels[currentIndex] &&
          <Link href={`/carousel/${carousels[currentIndex].id}`} className="absolute inset-0" />
        }
        <FontAwesomeIcon
          id="carousel-left-button"
          icon={faAngleLeft}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 size-5 md:size-6 lg:size-7 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-70 transition-color duration-200 cursor-pointer"
          onClick={() => { goPrevious(); handleButtonClick() }}
        />
        <FontAwesomeIcon
          id="carousel-right-button"
          icon={faAngleRight}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 size-5 md:size-6 lg:size-7 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-70 transition-color duration-200 cursor-pointer"
          onClick={() => { goNext(); handleButtonClick() }}
        />
        <div className="absolute flex flex-row bottom-4 left-1/2 transform -translate-x-1/2 gap-1.5 md:gap-2">
          {
            Array.from({ length: carousels.length }).map((_, i) => (
              <Circle key={i} isSelected={i === currentIndex} onClick={() => { setCurrentIndex(i); handleButtonClick() }} />
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
}
