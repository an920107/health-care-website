import AttachmentPreview from "@/components/attachment-preview";
import QuillViewer from "@/components/quill-viewer";
import AttachmentUsecase from "@/module/attachment/application/attachmentUsecase";
import AttachmentEntity from "@/module/attachment/domain/attachmentEntity";
import AttachmentRepoImpl from "@/module/attachment/presenter/attachmentRepoImpl";
import IndexMenuUsecase from "@/module/indexMenu/application/indexMenuUsecase";
import TopicEnum from "@/module/indexMenu/domain/topicEnum";
import StaticPostUsecase from "@/module/post/application/staticPostUsecase";
import PostRepoImpl from "@/module/post/presenter/postRepoImpl";
import PostViewModel from "@/module/post/presenter/postViewModel";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  params: {
    label: string;
    locale: string;
  };
};

export default async function StaticPage({ params }: Props) {
  const trans = await getTranslations("Topic");

  const postUsecase = new StaticPostUsecase(new PostRepoImpl());
  const attachmentUsecase = new AttachmentUsecase(new AttachmentRepoImpl());
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

  const attachments: AttachmentEntity[] = [];
  for (var attachmentId of viewModel?.attachments ?? []) {
    const attachment = await attachmentUsecase.getAttachmentInfo(attachmentId);
    attachments.push(attachment);
  }

  const isEn = params.locale === "en";

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h1>{trans(params.label)}</h1>
        <div className="flex flex-col text-sm">
          <span className="inline-flex items-center">
            <FontAwesomeIcon icon={faEye} className="size-4 me-2" />
            <span>{viewModel?.view ?? "Unknown"}</span>
          </span>
          <span className="inline-flex items-center">
            <FontAwesomeIcon icon={faClock} className="size-4 me-2" />
            <span>{viewModel?.releasedDate ?? "Unknown"}</span>
          </span>
        </div>
      </div>
      <hr className="my-3" />
      <QuillViewer value={(isEn ? viewModel?.contentEn : viewModel?.content) ?? ""} />
      {attachments.length > 0 && <AttachmentPreview attachments={attachments} />}
    </div>
  );
}
