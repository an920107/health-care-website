import NormalPostUsecase from "@/module/post/application/normalPostUsecase";
import PostRepoImpl from "@/module/post/presenter/postRepoImpl";
import PostViewModel from "@/module/post/presenter/postViewModel";
import { notFound } from "next/navigation";
import PostEditor from "../../post-editor";

type Props = {
  params: { id: string };
};

export default async function EditPostPage({ params }: Props) {
  const repo = new PostRepoImpl();
  const usecase = new NormalPostUsecase(repo);

  const idNum = Number.parseInt(params.id);
  if (idNum === Number.NaN) {
    notFound();
  }

  const entity = await usecase.getPostById(idNum);
  const viewModel = new PostViewModel(entity);

  return (
    <PostEditor
      updateId={viewModel.id}
      defaultColumn={viewModel.column}
      defaultReleaseStatus={viewModel.releaseStatus}
      defaultImportance={viewModel.importanceStatus}
      defaultTitle={viewModel.title}
      defaultTitleEn={viewModel.titleEn}
      defaultContent={viewModel.content}
      defaultContentEn={viewModel.contentEn}
      defaultAttachmentIds={viewModel.attachments}
    />
  );
}
