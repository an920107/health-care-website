"use client";

import Button from "@/components/button";
import DropdownButton from "@/components/dropdown-button";
import QuillEditor from "@/components/quill-editor";
import TextField from "@/components/text-field";
import { CarouselRequest } from "@/module/carousel/application/carouselDto";
import CarouselUsecase from "@/module/carousel/application/carouselUsecase";
import CarouselRepoImpl from "@/module/carousel/presenter/carouselRepoImpl";
import ReleaseStatusEnum from "@/module/status/doamin/releaseStatusEnum";
import LengthValidationUsecase from "@/module/validation/application/lengthValidationUsecase";
import NotEmptyValidationUsecase from "@/module/validation/application/notEmptyValidationUsecase";
import { useRouter } from "@/navigation";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";

type Props = {
  updateId?: number;
  defaultTitle?: string;
  defaultTitleEn?: string;
  defaultContent?: string;
  defaultContentEn?: string;
  defaultReleaseStatus?: ReleaseStatusEnum;
  defaultImageUrl?: string;
};

export default function CarouselEditor({
  updateId,
  defaultTitle = "",
  defaultTitleEn = "",
  defaultContent = "",
  defaultContentEn = "",
  defaultReleaseStatus = ReleaseStatusEnum.Draft,
  defaultImageUrl,
}: Props) {
  const trans = useTranslations("Carousel");
  const statusTrans = useTranslations("Status");

  const router = useRouter();

  const [chineseTitle, setChineseTitle] = useState<string>(defaultTitle);
  const [englishTitle, setEnglishTitle] = useState<string>(defaultTitleEn);
  const [chineseContent, setChineseContent] = useState<ReactQuill.Value>(defaultContent);
  const [englishContent, setEnglishContent] = useState<ReactQuill.Value>(defaultContentEn);
  const [releaseStatus, setReleaseStatus] = useState<ReleaseStatusEnum>(defaultReleaseStatus);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(defaultImageUrl ?? null);
  const [toValidate, setToValidate] = useState<boolean>(false);
  const [isValidationPassed, setIsValidationPassed] = useState<boolean[]>([]);

  const usecase = new CarouselUsecase(new CarouselRepoImpl());

  const titleValidations = [
    new NotEmptyValidationUsecase(trans("validate_empty")),
    new LengthValidationUsecase(40, trans("validate_length", { length: 40 })),
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

    setImageFile(file);
    setImageFileUrl(URL.createObjectURL(file));
  }

  function handleDelete() {
    if (updateId === undefined) return;
    usecase.deleteCarousel(updateId)
      .then(() => router.push("/admin/carousel"))
  }

  // To validate and change the values in `isValidationPassed` to invoke useEffect
  function handleSave() {
    setIsValidationPassed([]);
    setToValidate(true);
  }

  useEffect(() => {
    router.refresh();
  }, []);

  // If all the values in `isValidationPassed` are true, then the post will be created or updated
  useEffect(() => {
    if (isValidationPassed.length < 2 ||
      isValidationPassed.filter((value) => !value).length > 0) return;

    if (imageFile === null && imageFileUrl === null) {
      alert("Please upload an image file.");
      return;
    }

    const carouselRequest = new CarouselRequest({
      title: chineseTitle,
      titleEn: englishTitle,
      content: chineseContent.toString(),
      contentEn: englishContent.toString(),
      visibility: releaseStatus === ReleaseStatusEnum.Released,
    });

    (
      updateId === undefined
        ? usecase.createCarousel(imageFile!, carouselRequest)
        : usecase.updateCarousel(updateId, carouselRequest)
    ).then(
      () => router.push("/admin/carousel")
    );
  }, [isValidationPassed]);

  return (
    <>
      <h1>{updateId === undefined ? trans("new") : trans("edit")}</h1>
      <form className="mt-6 flex flex-col gap-4">
        <DropdownButton
          label={statusTrans("status")}
          options={releaseStatusOptions.map((option) => statusTrans(option))}
          className="h-10"
          onChange={(index) => setReleaseStatus(releaseStatusOptions[index])}
          index={releaseStatusOptions.indexOf(defaultReleaseStatus)}
        />
        <div>
          <label htmlFor={trans("upload")} className="label">{trans("upload")}</label>
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={defaultImageUrl !== undefined} />
        </div>
        {
          imageFileUrl !== null &&
          <Image
            src={imageFileUrl}
            alt="Preview"
            width={960}
            height={540}
            style={{ objectFit: "cover" }}
            className="w-[960px] h-[540px] min-w-[960px] min-h-[540px]"
          />
        }
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
        <div className="flex flex-row justify-end gap-2">
          {
            updateId !== undefined &&
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
    </>
  );
}

const releaseStatusOptions = [
  ReleaseStatusEnum.Draft,
  ReleaseStatusEnum.Released,
];
