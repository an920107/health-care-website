"use client";

import AttachmentPreview from "@/components/attachment-preview";
import Button from "@/components/button";
import DropdownButton from "@/components/dropdown-button";
import Editor from "@/components/editor";
import TextField from "@/components/text-field";
import AttachmentUsecase from "@/module/attachment/application/attachmentUsecase";
import AttachmentEntity from "@/module/attachment/domain/attachmentEntity";
import UploadingAttachmentEntity from "@/module/attachment/domain/uploadingAttachmentEntity";
import UploadingPregressMap from "@/module/attachment/domain/uploadingProgressMap";
import AttachmentRepoImpl from "@/module/attachment/presenter/attachmentRepoImpl";
import NormalPostUsecase from "@/module/post/application/normalPostUsecase";
import PostColumnEnum from "@/module/post/domain/postColumnEnum";
import PostRepoImpl from "@/module/post/presenter/postRepoImpl";
import ImportanceEnum from "@/module/status/doamin/importanceEnum";
import ReleaseStatusEnum from "@/module/status/doamin/releaseStatusEnum";
import { faSave, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function NewPostPage() {
  const trans = useTranslations("Post");
  const statusTrans = useTranslations("Status");

  const [chineseTitle, setChineseTitle] = useState<string>("");
  const [englishTitle, setEnglishTitle] = useState<string>("");
  const [attachments, setAttachments] = useState<AttachmentEntity[]>([]);
  const [uploadingAttachments, setUploadingAttachments] = useState<UploadingAttachmentEntity[]>([]);
  const [uploadingProgressMap, setUploadingProgressMap] = useState<UploadingPregressMap>({});

  const postRepo = new PostRepoImpl();
  const postUsecase = new NormalPostUsecase(postRepo);
  const attachmentRepo = new AttachmentRepoImpl();
  const attachmentUsecase = new AttachmentUsecase(attachmentRepo);

  function handleUpload(files: FileList | null) {
    if (files === null) return;

    for (var i = 0; i < files.length; i++) {
      if (files.item(i) === null) continue;

      const file = files.item(i)!;
      const state = Math.floor(Math.random() * 1e16);

      setUploadingAttachments((prev) => [
        ...prev,
        new UploadingAttachmentEntity({
          state: state,
          file: file,
          uploadPromise: attachmentUsecase.uploadFile(
            file, (progress) => setUploadingProgressMap((prev) => ({ ...prev, [state]: progress })),
          ).then((attachment) => {
            setAttachments((prev) => [...prev, attachment]);
            return attachment;
          }).catch((err) => {
            console.error("Failed to upload attachment", err)
          }).finally(() => {
            setUploadingProgressMap((prev) => {
              delete prev[state];
              return { ...prev };
            });
            setUploadingAttachments((prev) => prev.filter((e) => e.state !== state));
          }),
        }),
      ]);
    }
  }

  return (
    <div>
      <h1>{trans("new")}</h1>
      <form className="mt-6 flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <DropdownButton label="Post Column" options={columnOptions.map((option) => trans(option))} className="h-10" />
          <DropdownButton label="Status" options={releaseStatusOptions.map((option) => statusTrans(option))} className="h-10" />
          <DropdownButton label="Importance" options={importanceOptions.map((option) => statusTrans(option))} className="h-10" />
        </div>
        <div className="flex flex-row gap-4">
          <TextField label="Chinese Title" value={chineseTitle} onChange={setChineseTitle} />
          <TextField label="English Title" value={englishTitle} onChange={setEnglishTitle} />
        </div>
        <div className="flex flex-row gap-4">
          <Editor label="Chinese Content" />
          <Editor label="Englist Content" />
        </div>
        <div>
          <label className="label">{trans("upload-preview")}</label>
          <AttachmentPreview
            attachments={attachments}
            uploadingAttachments={uploadingAttachments}
            uploadingProgressMap={uploadingProgressMap}
          />
        </div>
        <div className="flex flex-row justify-end gap-2">
          <Button className="border">
            <FontAwesomeIcon icon={faTrash} className="me-2 size-4" />
            <span className="py-1">{trans("delete")}</span>
          </Button>
          <Button className="border">
            <label htmlFor="upload" className="cursor-pointer">
              <FontAwesomeIcon icon={faUpload} className="me-2 size-4" />
              <input id="upload" type="file" className="hidden" multiple={true}
                onChange={(event) => handleUpload(event.target.files)} />
              <span className="py-1">{trans("upload")}</span>
            </label>
          </Button>
          <Button className="border">
            <FontAwesomeIcon icon={faSave} className="me-2 size-4" />
            <span className="py-1">{trans("save")}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

const columnOptions = [
  PostColumnEnum.Latest,
  PostColumnEnum.Activity,
  PostColumnEnum.Health,
  PostColumnEnum.Nutrition,
];

const releaseStatusOptions = [
  ReleaseStatusEnum.Draft,
  ReleaseStatusEnum.Released,
];

const importanceOptions = [
  ImportanceEnum.Normal,
  ImportanceEnum.Important,
];
