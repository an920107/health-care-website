import CarouselUsecase from "@/module/carousel/application/carouselUsecase";
import CarouselRepoImpl from "@/module/carousel/presenter/carouselRepoImpl";
import CarouselViewModel from "@/module/carousel/presenter/carouselViewModel";
import { notFound } from "next/navigation";
import Image from "next/image";
import HeadInfo from "@/components/head-info";
import QuillViewer from "@/components/quill-viewer";
import { Link } from "@/navigation";

type Props = {
  params: { locale: string; id: string };
}

export default async function CarouselPage({ params }: Props) {
  const idNum = Number.parseInt(params.id);
  if (idNum === Number.NaN) notFound();

  const usecase = new CarouselUsecase(new CarouselRepoImpl());
  var viewModel: CarouselViewModel;
  try {
    const entity = await usecase.getCarouselInfo(idNum);
    viewModel = new CarouselViewModel(entity);
  } catch (err) {
    notFound();
  }

  const isEn = params.locale === "en";

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h1>{isEn ? viewModel.titleEn : viewModel.title}</h1>
        <HeadInfo datetime={viewModel.releasedDate} />
      </div>
      <hr className="my-3" />
      <div className="w-full max-w-[960px]">
        <Link href={viewModel.imageUrl} target="_blank">
          <Image
            src={viewModel.imageUrl}
            alt={isEn ? viewModel.titleEn : viewModel.title}
            width={960}
            height={540}
          />
        </Link>
      </div>
      <QuillViewer value={isEn ? viewModel.contentEn : viewModel.content} />
    </>
  );
}
