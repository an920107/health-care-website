import NormalPostUsecase from "@/module/post/application/normalPostUsecase";
import PostRepoImpl from "@/module/post/presenter/postRepoImpl";
import PostViewModel from "@/module/post/presenter/postViewModel";
import { notFound } from "next/navigation";
import PostEntity from "@/module/post/domain/postEntity";
import PostColumnEnum from "@/module/post/domain/postColumnEnum";
import PostEditor from "../../../post/post-editor";

type Props = {
  params: { id: string };
};

export default async function EditPostPage({ params }: Props) {
  const idNum = Number.parseInt(params.id);
  if (idNum === Number.NaN) notFound();

  const usecase = new NormalPostUsecase(new PostRepoImpl());
  var entity: PostEntity;
  try {
    entity = await usecase.getPostById(idNum);
  } catch {
    notFound();
  }
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
      backUrl="/admin/disease_prevention"
      columnOptions={[
        PostColumnEnum.Influenza,
        PostColumnEnum.Dengue,
        PostColumnEnum.Tuberculosis,
        PostColumnEnum.Chickenpox,
      ]}
    />
  );
}

