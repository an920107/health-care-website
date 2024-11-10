"use client";

import Button from "@/components/button";
import DropdownButton from "@/components/dropdown-button";
import TextField from "@/components/text-field";
import { DownloadRequest } from "@/module/download/application/downloadDto";
import DownloadUsecase from "@/module/download/application/downloadUsecase";
import DownloadColumnEnum from "@/module/download/domain/downloadColumnEnum";
import DownloadRepoImpl from "@/module/download/presenter/downloadRepoImpl";
import DownloadViewModel from "@/module/download/presenter/downloadViewModel";
import ReleaseStatusEnum from "@/module/status/doamin/releaseStatusEnum";
import LengthValidationUsecase from "@/module/validation/application/lengthValidationUsecase";
import NotEmptyValidationUsecase from "@/module/validation/application/notEmptyValidationUsecase";
import { useRouter } from "@/navigation";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { set } from "date-fns";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
  download?: DownloadViewModel;
}

const usecase = new DownloadUsecase(new DownloadRepoImpl());

export default function DownloadEditor({
  className,
  download,
}: Props) {
  const trans = useTranslations("Download");
  const statusTrans = useTranslations("Status");

  const router = useRouter();

  const [column, setColumn] = useState<DownloadColumnEnum>(download?.column ?? DownloadColumnEnum.FreshmenCheckUp);
  const [title, setTitle] = useState<string>(download?.title ?? "");
  const [titleEn, setTitleEn] = useState<string>(download?.titleEn ?? "");
  const [releaseStatus, setReleaseStatus] = useState<ReleaseStatusEnum>(download?.releaseStatus ?? ReleaseStatusEnum.Draft);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [toValidate, setToValidate] = useState<boolean>(false);
  const [isValidationPassed, setIsValidationPassed] = useState<boolean[]>([]);

  useEffect(() => {
    setTitle(download?.title ?? "");
    setTitleEn(download?.titleEn ?? "");
    setColumn(download?.column ?? DownloadColumnEnum.FreshmenCheckUp);
    setReleaseStatus(download?.releaseStatus ?? ReleaseStatusEnum.Draft);
  }, [download]);

  const titleValidations = (length: number) => [
    new NotEmptyValidationUsecase(trans("validate_empty")),
    new LengthValidationUsecase(length, trans("validate_length", { length: length })),
  ];

  function handleValidate(result: boolean) {
    setToValidate(false);
    setIsValidationPassed((prev) => [...prev, result]);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files === null || files.length === 0) return;
    const file = files[0];
    if (file === undefined) return;

    setFile(file);
  }

  function handleDelete() {
    if (download === undefined) return;
    usecase.deleteDownload(download.id)
      .then(() => router.push("/admin/download_area"));
  }

  function handleSave() {
    setIsValidationPassed([]);
    setToValidate(true);
  }

  useEffect(() => {
    if (isValidationPassed.length < 2 ||
      isValidationPassed.filter((value) => !value).length > 0) return;

    if (file === undefined && download === undefined) {
      alert("Please upload a file.");
      return;
    }

    const request = new DownloadRequest({
      column: column,
      title: title,
      titleEn: titleEn,
      visibility: releaseStatus === ReleaseStatusEnum.Released,
    });

    (download === undefined
      ? usecase.createDownload(file!, request)
      : usecase.updateDownload(download.id, request)
    ).then(
      () => router.push("/admin/download_area")
    );
  }, [isValidationPassed]);

  return (
    <form className={`${className ?? ""} flex flex-col gap-4`}>
      <DropdownButton
        label={trans("column")}
        options={columnOptions.map((option) => trans(option))}
        className="h-10"
        onChange={(index) => setColumn(columnOptions[index])}
        index={columnOptions.indexOf(column)}
      /><DropdownButton
        label={statusTrans("status")}
        options={releaseStatusOptions.map((option) => statusTrans(option))}
        className="h-10"
        onChange={(index) => setReleaseStatus(releaseStatusOptions[index])}
        index={releaseStatusOptions.indexOf(releaseStatus)}
      />
      <div>
        <label htmlFor={trans("upload")} className="label">{trans("upload")}</label>
        <input type="file" onChange={handleFileChange} disabled={download !== undefined} />
      </div>
      <TextField
        label={trans("chinese_title")}
        value={title}
        onChange={setTitle}
        onValidate={handleValidate}
        validations={titleValidations(40)}
        toValidate={toValidate}
      />
      <TextField
        label={trans("english_title")}
        value={titleEn}
        onChange={setTitleEn}
        onValidate={handleValidate}
        validations={titleValidations(100)}
        toValidate={toValidate}
      />
      <div className="flex flex-row justify-end gap-2">
        {
          download !== undefined &&
          <Button className="border" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} className="me-2 size-4" />
            <span className="py-1">{trans("delete")}</span>
          </Button>
        }
        <Button className="border" onClick={handleSave}>
          <FontAwesomeIcon icon={faSave} className="me-2 size-4" />
          <span className="py-1">{trans("save")}</span>
        </Button>
      </div>
    </form>
  );
}

const releaseStatusOptions = [
  ReleaseStatusEnum.Draft,
  ReleaseStatusEnum.Released,
];

const columnOptions = [
  DownloadColumnEnum.FreshmenCheckUp,
  DownloadColumnEnum.StudentGroupInsurance,
  DownloadColumnEnum.StaffCheckUp,
  DownloadColumnEnum.MedicalEquipmentLoan,
  DownloadColumnEnum.Others,
];
