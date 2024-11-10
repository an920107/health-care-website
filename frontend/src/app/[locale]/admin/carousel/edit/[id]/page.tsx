"use client";

import { usePathname, useRouter } from "next/navigation";
import CarouselEditor from "../../carousel-editor";
import CarouselUsecase from "@/module/carousel/application/carouselUsecase";
import CarouselRepoImpl from "@/module/carousel/presenter/carouselRepoImpl";
import CarouselViewModel from "@/module/carousel/presenter/carouselViewModel";
import { useEffect, useState } from "react";

type Props = {
  params: { locale: string; id: string };
};

const usecase = new CarouselUsecase(new CarouselRepoImpl());

export default function CarouselEditPage({ params }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [carousel, setCarousel] = useState<CarouselViewModel | undefined>(undefined);

  async function fetchAll() {
    const idNum = parseInt(params.id);
    const entity = await usecase.getCarouselInfo(idNum);
    setCarousel(new CarouselViewModel(entity));
  }

  useEffect(() => {
    fetchAll().catch((err) => {
      console.error(err);
      router.replace(`/${params.locale}/404?notfound=${pathname}`); 
    });
  }, []);

  return carousel === undefined
    ? (<></>)
    : (
      <CarouselEditor
        updateId={carousel.id}
        defaultTitle={carousel.title}
        defaultTitleEn={carousel.titleEn}
        defaultContent={carousel.content}
        defaultContentEn={carousel.contentEn}
        defaultReleaseStatus={carousel.releaseStatus}
        defaultImageUrl={carousel.imageUrl}
      />
    );
}
