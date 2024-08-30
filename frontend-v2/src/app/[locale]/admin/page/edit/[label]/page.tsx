"use client";

import IndexMenuUsecase from "@/module/indexMenu/application/indexMenuUsecase";
import TopicEnum from "@/module/indexMenu/domain/topicEnum";
import StaticPostUsecase from "@/module/post/application/staticPostUsecase";
import PostRepoImpl from "@/module/post/presenter/postRepoImpl";
import PostViewModel from "@/module/post/presenter/postViewModel";
import PageEditor from "./page-editor";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  params: { locale: string, label: string };
};

const indexMenuUsecase = new IndexMenuUsecase();
const topicGroups = indexMenuUsecase.getTopicGroupsExcept([
  TopicEnum.DownloadArea,
  TopicEnum.DiseasePrevension,
]);

const postUsecase = new StaticPostUsecase(new PostRepoImpl());

export default function EditStaticPostPage({ params }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [post, setPost] = useState<PostViewModel | undefined>(undefined);

  function notFound() {
    router.replace(`/${params.locale}/404?notfound=${pathname}`);
  }

  async function fetchAll() {
    const entity = await postUsecase.getStaticPost(params.label);
    setPost(new PostViewModel(entity));
  }

  useEffect(() => {
    if (topicGroups.filter(
      (group) => group.topics.map((topic) => topic.label).includes(params.label as TopicEnum)
    ).length === 0) notFound();

    fetchAll().catch((err) => {
      console.error(err);
      notFound();
    });
  }, []);

  return (
    <PageEditor
      label={params.label as TopicEnum}
      defaultContent={post?.content ?? ""}
      defaultContentEn={post?.contentEn ?? ""}
      defaultAttachmentIds={post?.attachments ?? []}
    />
  );
}
