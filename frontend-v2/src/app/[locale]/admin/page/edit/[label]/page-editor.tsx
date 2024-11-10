"use client";

import AdminAttachmentPreview from "@/components/admin-attachment-preview";
import Button from "@/components/button";
import QuillEditor from "@/components/quill-editor";
import AttachmentUsecase from "@/module/attachment/application/attachmentUsecase";
import AttachmentEntity from "@/module/attachment/domain/attachmentEntity";
import UploadingAttachmentEntity from "@/module/attachment/domain/uploadingAttachmentEntity";
import UploadingPregressMap from "@/module/attachment/domain/uploadingProgressMap";
import AttachmentFetchAction from "@/module/attachment/presenter/attachmentFetchAction";
import AttachmentRepoImpl from "@/module/attachment/presenter/attachmentRepoImpl";
import AttachmentUploadAction from "@/module/attachment/presenter/attachmentUploadAction";
import TopicEnum from "@/module/indexMenu/domain/topicEnum";
import { StaticPostRequest } from "@/module/post/application/postDto";
import StaticPostUsecase from "@/module/post/application/staticPostUsecase";
import PostRepoImpl from "@/module/post/presenter/postRepoImpl";
import PostViewModel from "@/module/post/presenter/postViewModel";
import { useRouter } from "@/navigation";
import { faSave, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Props = {
  label: TopicEnum;
  post?: PostViewModel;
}

export default function PageEditor({
  label,
  post,
}: Props) {
  const trans = useTranslations("Static");
  const topicTrans = useTranslations("Topic");
  const attachmentTrans = useTranslations("Attachment");

  const router = useRouter();

  const [chineseContent, setChineseContent] = useState<string>(post?.content ?? "");
  const [englishContent, setEnglishContent] = useState<string>(post?.contentEn ?? "");
  const [attachments, setAttachments] = useState<AttachmentEntity[]>([]);
  const [uploadingAttachments, setUploadingAttachments] = useState<UploadingAttachmentEntity[]>([]);
  const [uploadingProgressMap, setUploadingProgressMap] = useState<UploadingPregressMap>({});

  const postUsecase = new StaticPostUsecase(new PostRepoImpl());
  const attachmentUsecase = new AttachmentUsecase(new AttachmentRepoImpl());
  const attachmentUploadAction = new AttachmentUploadAction({
    usecase: attachmentUsecase,
    setAttachments: setAttachments,
    setUploadingAttachments: setUploadingAttachments,
    setUploadingProgressMap: setUploadingProgressMap,
  });

  function handleSave() {
    const postRequest = new StaticPostRequest({
      label: label,
      content: chineseContent,
      contentEn: englishContent,
      attachments: attachments.map((attachment) => attachment.id),
    });
    postUsecase.updateStaticPost(
      postRequest
    ).then(
      () => router.push("/admin/page")
    ).catch(
      (err) => console.error("Updating static post failed:", err)
    );
  }

  useEffect(() => {
    setChineseContent(post?.content ?? "");
    setEnglishContent(post?.contentEn ?? "");

    const attachmentFetchAction = new AttachmentFetchAction({
      usecase: attachmentUsecase,
      setAttachments: setAttachments,
    });
    attachmentFetchAction.invoke(post?.attachments ?? []);
  }, [post?.attachments, post?.content, post?.contentEn]);

  return (
    <div>
      <h1>{trans("edit", { name: topicTrans(label) })}</h1>
      <form className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <QuillEditor label={trans("chinese_content")} value={chineseContent} onChange={setChineseContent} />
          <QuillEditor label={trans("english_content")} value={englishContent} onChange={setEnglishContent} />
        </div>
        <div>
          <AdminAttachmentPreview
            label={attachmentTrans("preview")}
            attachments={attachments}
            uploadingAttachments={uploadingAttachments}
            uploadingProgressMap={uploadingProgressMap}
            onChange={setAttachments}
          />
        </div>
        <div className="flex flex-row justify-end gap-2">
          <Button className="border" onClick={() => { document.getElementById("upload")?.click() }}>
            <FontAwesomeIcon icon={faUpload} className="me-2 size-4" />
            <input id="upload" type="file" className="hidden" multiple={true}
              onChange={(event) => attachmentUploadAction.invoke(event.target.files)} />
            <span className="py-1">{attachmentTrans("upload")}</span>
          </Button>
          <Button className="border" onClick={handleSave}>
            <FontAwesomeIcon icon={faSave} className="me-2 size-4" />
            <span className="py-1">{trans("save")}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}