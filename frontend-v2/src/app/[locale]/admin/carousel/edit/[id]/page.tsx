import { notFound } from "next/navigation";
import CarouselEditor from "../../carousel-editor";
import CarouselUsecase from "@/module/carousel/application/carouselUsecase";
import CarouselRepoImpl from "@/module/carousel/presenter/carouselRepoImpl";
import CarouselViewModel from "@/module/carousel/presenter/carouselViewModel";

type Props = {
  params: { locale: string; id: string };
};

export default async function CarouselEditPage({ params }: Props) {
  const idNum = Number.parseInt(params.id);
  if (idNum === Number.NaN) notFound();

  const usecase = new CarouselUsecase(new CarouselRepoImpl());
  var viewModel: CarouselViewModel;
  try {
    const entity = await usecase.getCarouselInfo(idNum);
    viewModel = new CarouselViewModel(entity);
  } catch {
    notFound();
  }

  return (
    <CarouselEditor
      updateId={viewModel.id}
      defaultTitle={viewModel.title}
      defaultTitleEn={viewModel.titleEn}
      defaultContent={viewModel.content}
      defaultContentEn={viewModel.contentEn}
      defaultReleaseStatus={viewModel.releaseStatus}
      defaultImageUrl={viewModel.imageUrl}
    />
  );
}
