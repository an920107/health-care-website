import IndexMenuUsecase from "@/module/indexMenu/application/indexMenuUsecase";
import TopicEnum from "@/module/indexMenu/domain/topicEnum";
import StaticPostUsecase from "@/module/post/application/staticPostUsecase";
import PostRepoImpl from "@/module/post/presenter/postRepoImpl";
import PostViewModel from "@/module/post/presenter/postViewModel";
import { notFound } from "next/navigation";
import PageEditor from "./page-editor";

type Props = {
  params: { label: string };
};

export default async function EditStaticPostPage({ params }: Props) {
  const postUsecase = new StaticPostUsecase(new PostRepoImpl());
  const indexMenuUsecase = new IndexMenuUsecase();

  const topicGroups = indexMenuUsecase.getTopicGroupsExcept([
    TopicEnum.DownloadArea,
    TopicEnum.DiseasePrevension,
  ]);

  if (topicGroups.filter(
    (group) => group.topics.map((topic) => topic.label).includes(params.label as TopicEnum)
  ).length === 0) notFound();

  var viewModel: PostViewModel | null = null;
  try {
    const entity = await postUsecase.getStaticPost(params.label);
    viewModel = new PostViewModel(entity);
  } catch { }

  return (
    <PageEditor
      label={params.label as TopicEnum}
      defaultContent={viewModel?.content ?? ""}
      defaultContentEn={viewModel?.contentEn ?? ""}
      defaultAttachmentIds={viewModel?.attachments ?? []}
    />
  );
}