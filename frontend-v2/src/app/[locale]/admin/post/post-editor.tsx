"use client";

import AdminAttachmentPreview from "@/components/admin-attachment-preview";
import Button from "@/components/button";
import DropdownButton from "@/components/dropdown-button";
import QuillEditor from "@/components/quill-editor";
import TextField from "@/components/text-field";
import AttachmentUsecase from "@/module/attachment/application/attachmentUsecase";
import AttachmentEntity from "@/module/attachment/domain/attachmentEntity";
import UploadingAttachmentEntity from "@/module/attachment/domain/uploadingAttachmentEntity";
import UploadingPregressMap from "@/module/attachment/domain/uploadingProgressMap";
import AttachmentFetchAction from "@/module/attachment/presenter/attachmentFetchAction";
import AttachmentRepoImpl from "@/module/attachment/presenter/attachmentRepoImpl";
import AttachmentUploadAction from "@/module/attachment/presenter/attachmentUploadAction";
import NormalPostUsecase from "@/module/post/application/normalPostUsecase";
import { NormalPostRequest } from "@/module/post/application/postDto";
import PostColumnEnum from "@/module/post/domain/postColumnEnum";
import PostRepoImpl from "@/module/post/presenter/postRepoImpl";
import ImportanceEnum from "@/module/status/doamin/importanceEnum";
import ReleaseStatusEnum from "@/module/status/doamin/releaseStatusEnum";
import LengthValidationUsecase from "@/module/validation/application/lengthValidationUsecase";
import NotEmptyValidationUsecase from "@/module/validation/application/notEmptyValidationUsecase";
import { useRouter } from "@/navigation";
import { faSave, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";

type Props = {
  updateId?: number;
  defaultColumn?: PostColumnEnum;
  defaultReleaseStatus?: ReleaseStatusEnum;
  defaultImportance?: ImportanceEnum;
  defaultTitle?: string;
  defaultTitleEn?: string;
  defaultContent?: string;
  defaultContentEn?: string;
  defaultAttachmentIds?: number[];
};

export default function PostEditor({
  updateId,
  defaultColumn = PostColumnEnum.Latest,
  defaultReleaseStatus = ReleaseStatusEnum.Draft,
  defaultImportance = ImportanceEnum.Normal,
  defaultTitle = "",
  defaultTitleEn = "",
  defaultContent = "",
  defaultContentEn = "",
  defaultAttachmentIds = [],
}: Props) {
  const trans = useTranslations("Post");
  const statusTrans = useTranslations("Status");
  const attachmentTrans = useTranslations("Attachment");

  const router = useRouter();

  const [column, setColumn] = useState<PostColumnEnum>(defaultColumn);
  const [releaseStatus, setReleaseStatus] = useState<ReleaseStatusEnum>(defaultReleaseStatus);
  const [importance, setImportance] = useState<ImportanceEnum>(defaultImportance);
  const [chineseTitle, setChineseTitle] = useState<string>(defaultTitle);
  const [englishTitle, setEnglishTitle] = useState<string>(defaultTitleEn);
  const [chineseContent, setChineseContent] = useState<ReactQuill.Value>(defaultContent);
  const [englishContent, setEnglishContent] = useState<ReactQuill.Value>(defaultContentEn);
  const [attachments, setAttachments] = useState<AttachmentEntity[]>([]);
  const [uploadingAttachments, setUploadingAttachments] = useState<UploadingAttachmentEntity[]>([]);
  const [uploadingProgressMap, setUploadingProgressMap] = useState<UploadingPregressMap>({});
  const [toValidate, setToValidate] = useState<boolean>(false);
  const [isValidationPassed, setIsValidationPassed] = useState<boolean[]>([]);

  const postUsecase = new NormalPostUsecase(new PostRepoImpl());
  const attachmentUsecase = new AttachmentUsecase(new AttachmentRepoImpl());
  const attachmentUploadAction = new AttachmentUploadAction({
    usecase: attachmentUsecase,
    setAttachments: setAttachments,
    setUploadingAttachments: setUploadingAttachments,
    setUploadingProgressMap: setUploadingProgressMap,
  });

  const titleValidations = [
    new NotEmptyValidationUsecase(trans("validate_empty")),
    new LengthValidationUsecase(40, trans("validate_length", { length: 40 })),
  ];

  function handleValidate(result: boolean) {
    setToValidate(false);
    setIsValidationPassed((prev) => [...prev, result]);
  }

  function handleDelete() {
    if (updateId === undefined) return;
    postUsecase.deletePost(updateId)
      .then(() => router.push("/admin/post"))
      .catch((err) => console.error("Deleting post failed:", err));
  }

  // To validate and change the values in `isValidationPassed` to invoke useEffect
  function handleSave() {
    setIsValidationPassed([]);
    setToValidate(true);
  }

  useEffect(() => {
    router.refresh();
  }, []);

  useEffect(() => {
    const attachmentFetchAction = new AttachmentFetchAction({
      usecase: attachmentUsecase,
      setAttachments: setAttachments,
    });
    attachmentFetchAction.invoke(defaultAttachmentIds);
  }, [defaultAttachmentIds]);

  // If all the values in `isValidationPassed` are true, then the post will be created or updated
  useEffect(() => {
    if (isValidationPassed.length < 2 ||
      isValidationPassed.filter((value) => !value).length > 0) return;

    const postRequest = new NormalPostRequest({
      title: chineseTitle,
      titleEn: englishTitle,
      content: chineseContent.toString(),
      contentEn: englishContent.toString(),
      attachments: attachments.map((attachment) => attachment.id),
      column: column,
      visibility: releaseStatus === ReleaseStatusEnum.Released,
      importance: importance === ImportanceEnum.Important,
    });

    (
      updateId === undefined
        ? postUsecase.createPost(postRequest)
        : postUsecase.updatePost(updateId, postRequest)
    ).then(
      () => router.push("/admin/post")
    ).catch(
      (err) => console.error(`${updateId === undefined ? "Creating" : "Updating"} post failed:`, err)
    );
  }, [isValidationPassed]);

  return (
    <div>
      <h1>{updateId === undefined ? trans("new") : trans("edit")}</h1>
      <form className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <DropdownButton
            label={trans("column")}
            options={columnOptions.map((option) => trans(option))}
            className="h-10"
            onChange={(index) => setColumn(columnOptions[index])}
            deafultIndex={columnOptions.indexOf(defaultColumn)}
          />
          <DropdownButton
            label={statusTrans("status")}
            options={releaseStatusOptions.map((option) => statusTrans(option))}
            className="h-10"
            onChange={(index) => setReleaseStatus(releaseStatusOptions[index])}
            deafultIndex={releaseStatusOptions.indexOf(defaultReleaseStatus)}
          />
          <DropdownButton
            label={statusTrans("importance")}
            options={importanceOptions.map((option) => statusTrans(option))}
            className="h-10"
            onChange={(index) => setImportance(importanceOptions[index])}
            deafultIndex={importanceOptions.indexOf(defaultImportance)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <TextField
            label={trans("chinese_title")}
            value={chineseTitle}
            onChange={setChineseTitle}
            onValidate={handleValidate}
            validations={titleValidations}
            toValidate={toValidate}
          />
          <QuillEditor label={trans("chinese_content")} value={chineseContent} onChange={setChineseContent} />
          <TextField
            label={trans("english_title")}
            value={englishTitle}
            onChange={setEnglishTitle}
            onValidate={handleValidate}
            validations={titleValidations}
            toValidate={toValidate}
          />
          <QuillEditor label={trans("english_content")} value={englishContent} onChange={setEnglishContent} />
        </div>
        <AdminAttachmentPreview
          label={attachmentTrans("preview")}
          attachments={attachments}
          uploadingAttachments={uploadingAttachments}
          uploadingProgressMap={uploadingProgressMap}
          onChange={setAttachments}
        />
        <div className="flex flex-row justify-end gap-2">
          {
            updateId !== undefined &&
            <Button className="border" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} className="me-2 size-4" />
              <span className="py-1">{trans("delete")}</span>
            </Button>
          }
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
