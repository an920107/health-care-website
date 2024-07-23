import QuillViewer from "@/components/quill-viewer";
import NormalPostUsecase from "@/module/post/application/normalPostUsecase";
import PostRepoImpl from "@/module/post/presenter/postRepoImpl";
import PostViewModel from "@/module/post/presenter/postViewModel";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
    locale: string;
  };
}

export default async function PostPage({ params }: Props) {
  const repo = new PostRepoImpl();
  const usecase = new NormalPostUsecase(repo);

  const idNum = Number.parseInt(params.id);
  if (idNum === Number.NaN) {
    notFound();
  }

  const entity = await usecase.getPostById(idNum);
  const viewModel = new PostViewModel(entity);
  const isEn = params.locale === "en";

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h1>{isEn ? viewModel.titleEn : viewModel.title}</h1>
        <div className="flex flex-col text-sm">
          <span className="inline-flex items-center">
            <FontAwesomeIcon icon={faEye} className="size-4 me-2" />
            <span>{viewModel.view}</span>
          </span>
          <span className="inline-flex items-center">
            <FontAwesomeIcon icon={faClock} className="size-4 me-2" />
            <span>{viewModel.releasedDate}</span>
          </span>
        </div>
      </div>
      <hr className="my-3" />
      <QuillViewer value={isEn ? viewModel.contentEn : viewModel.content} />
    </div>
  );
}