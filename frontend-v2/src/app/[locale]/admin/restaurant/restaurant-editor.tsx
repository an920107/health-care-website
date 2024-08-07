"use client";

import AdminAttachmentPreview from "@/components/admin-attachment-preview";
import Button from "@/components/button";
import DateField from "@/components/date-field";
import DropdownButton from "@/components/dropdown-button";
import TextField from "@/components/text-field";
import AttachmentUsecase from "@/module/attachment/application/attachmentUsecase";
import AttachmentEntity from "@/module/attachment/domain/attachmentEntity";
import UploadingAttachmentEntity from "@/module/attachment/domain/uploadingAttachmentEntity";
import UploadingPregressMap from "@/module/attachment/domain/uploadingProgressMap";
import AttachmentFetchAction from "@/module/attachment/presenter/attachmentFetchAction";
import AttachmentRepoImpl from "@/module/attachment/presenter/attachmentRepoImpl";
import AttachmentUploadAction from "@/module/attachment/presenter/attachmentUploadAction";
import { RestaurantRequest } from "@/module/restaurant/application/restaurantDto";
import RestaurantUsecase from "@/module/restaurant/application/restaurantUsecase";
import RestaurantInspectCategoryEnum from "@/module/restaurant/domain/restaurantInspectCategoryEnum";
import RestaurantRepoImpl from "@/module/restaurant/presenter/restaurantRepoImpl";
import InspectionStatusEnum from "@/module/status/doamin/inspectionStatusEnum";
import ReleaseStatusEnum from "@/module/status/doamin/releaseStatusEnum";
import LengthValidationUsecase from "@/module/validation/application/lengthValidationUsecase";
import NotEmptyValidationUsecase from "@/module/validation/application/notEmptyValidationUsecase";
import { useRouter } from "@/navigation";
import { faSave, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Props = {
  locale?: string;
  updateId?: number;
  defaultCategory?: RestaurantInspectCategoryEnum;
  defaultReleaseStatus?: ReleaseStatusEnum;
  defaultInspectionStatus?: InspectionStatusEnum;
  defaultInspectedDate?: Date;
  defaultTitle?: string;
  defaultTitleEn?: string;
  defaultItem?: string;
  defaultItemEn?: string;
  defaultAttachmentIds?: number[];
}

export default function RestaurantEditor({
  locale,
  updateId,
  defaultCategory = RestaurantInspectCategoryEnum.Water,
  defaultReleaseStatus = ReleaseStatusEnum.Draft,
  defaultInspectionStatus = InspectionStatusEnum.Passed,
  defaultInspectedDate,
  defaultTitle = "",
  defaultTitleEn = "",
  defaultItem = "",
  defaultItemEn = "",
  defaultAttachmentIds = [],
}: Props) {
  const trans = useTranslations("Restaurant");
  const statusTrans = useTranslations("Status");
  const attachmentTrans = useTranslations("Attachment");

  const router = useRouter();

  const [category, setCategory] = useState<RestaurantInspectCategoryEnum>(defaultCategory);
  const [releaseStatus, setReleaseStatus] = useState<ReleaseStatusEnum>(defaultReleaseStatus);
  const [inspectionStatus, setInspectionStatus] = useState<InspectionStatusEnum>(defaultInspectionStatus);
  const [inspectedDate, setInspectedDate] = useState<Date | undefined>(defaultInspectedDate);
  const [chineseTitle, setChineseTitle] = useState<string>(defaultTitle);
  const [englishTitle, setEnglishTitle] = useState<string>(defaultTitleEn);
  const [chineseItem, setChineseItem] = useState<string>(defaultItem);
  const [englishItem, setEnglishItem] = useState<string>(defaultItemEn);
  const [attachments, setAttachments] = useState<AttachmentEntity[]>([]);
  const [uploadingAttachments, setUploadingAttachments] = useState<UploadingAttachmentEntity[]>([]);
  const [uploadingProgressMap, setUploadingProgressMap] = useState<UploadingPregressMap>({});
  const [toValidate, setToValidate] = useState<boolean>(false);
  const [isValidationPassed, setIsValidationPassed] = useState<boolean[]>([]);

  const restaurantUsecase = new RestaurantUsecase(new RestaurantRepoImpl());
  const attachmentUsecase = new AttachmentUsecase(new AttachmentRepoImpl());
  const attachmentUploadAction = new AttachmentUploadAction({
    usecase: attachmentUsecase,
    setAttachments: setAttachments,
    setUploadingAttachments: setUploadingAttachments,
    setUploadingProgressMap: setUploadingProgressMap,
  });

  const inspectedDateValidations = [
    new NotEmptyValidationUsecase(trans("validate_empty")),
  ];

  const titleValidations = [
    new NotEmptyValidationUsecase(trans("validate_empty")),
    new LengthValidationUsecase(40, trans("validate_length", { length: 40 })),
  ];

  const itemValidations = [
    new NotEmptyValidationUsecase(trans("validate_empty")),
    new LengthValidationUsecase(8, trans("validate_length", { length: 8 })),
  ];

  function handleValidate(result: boolean) {
    setToValidate(false);
    setIsValidationPassed((prev) => [...prev, result]);
  }

  function handleDelete() {
    if (updateId === undefined) return;
    restaurantUsecase.deleteRestaurant(updateId)
      .then(() => router.push("/admin/restaurant"))
      .catch((err) => console.error("Deleting restaurant failed:", err));
  }

  // To validate and change the values in `isValidationPassed` to invoke useEffect
  function handleSave() {
    setIsValidationPassed([]);
    setToValidate(true);
  }

  useEffect(() => {
    const attachmentFetchAction = new AttachmentFetchAction({
      usecase: attachmentUsecase,
      setAttachments: setAttachments,
    });
    attachmentFetchAction.invoke(defaultAttachmentIds);
  }, []);

  // If all the values in `isValidationPassed` are true, then the post will be created or updated
  useEffect(() => {
    if (isValidationPassed.length < 5 ||
      isValidationPassed.filter((value) => !value).length > 0) return;

    const restaurantRequest = new RestaurantRequest({
      category: category,
      title: chineseTitle,
      titleEn: englishTitle,
      item: chineseItem,
      itemEn: englishItem,
      valid: inspectionStatus === InspectionStatusEnum.Passed,
      visibility: releaseStatus === ReleaseStatusEnum.Released,
      inspectedTime: inspectedDate!,
      attachments: attachments.map((attachment) => attachment.id),
    });

    (
      updateId === undefined
        ? restaurantUsecase.createRestaurant(restaurantRequest)
        : restaurantUsecase.updateRestaurant(updateId, restaurantRequest)
    ).then(
      () => router.push("/admin/restaurant")
    ).catch(
      (err) => console.error(`${updateId === undefined ? "Creating" : "Updating"} restaurant failed:`, err)
    );
  }, [isValidationPassed]);

  return (
    <div>
      <h1>{updateId === undefined ? trans("new") : trans("edit")}</h1>
      <form className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <DropdownButton
            label={trans("category")}
            options={categoryOptions.map((option) => trans(option))}
            className="h-10"
            onChange={(index) => setCategory(categoryOptions[index])}
          />
          <DropdownButton
            label={statusTrans("status")}
            options={releaseStatusOptions.map((option) => statusTrans(option))}
            className="h-10"
            onChange={(index) => setReleaseStatus(releaseStatusOptions[index])}
          />
          <DropdownButton
            label={trans("result")}
            options={inspectionStatusOptions.map((option) => statusTrans(option))}
            className="h-10"
            onChange={(index) => setInspectionStatus(inspectionStatusOptions[index])}
          />
          <DateField
            label={trans("inspected_date")}
            locale={locale}
            value={inspectedDate}
            onChange={setInspectedDate}
            onValidate={handleValidate}
            validations={inspectedDateValidations}
            toValidate={toValidate}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            label={trans("chinese_title")}
            value={chineseTitle}
            onChange={setChineseTitle}
            onValidate={handleValidate}
            validations={titleValidations}
            toValidate={toValidate}
          />
          <TextField
            label={trans("english_title")}
            value={englishTitle}
            onChange={setEnglishTitle}
            onValidate={handleValidate}
            validations={titleValidations}
            toValidate={toValidate}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            label={trans("chinese_item")}
            value={chineseItem}
            onChange={setChineseItem}
            onValidate={handleValidate}
            validations={itemValidations}
            toValidate={toValidate}
          />
          <TextField
            label={trans("english_item")}
            value={englishItem}
            onChange={setEnglishItem}
            onValidate={handleValidate}
            validations={itemValidations}
            toValidate={toValidate}
          />
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

const categoryOptions = [
  RestaurantInspectCategoryEnum.Water,
  RestaurantInspectCategoryEnum.Food,
  RestaurantInspectCategoryEnum.Drink,
  RestaurantInspectCategoryEnum.Ice,
  RestaurantInspectCategoryEnum.Others,
];

const releaseStatusOptions = [
  ReleaseStatusEnum.Draft,
  ReleaseStatusEnum.Released,
];

const inspectionStatusOptions = [
  InspectionStatusEnum.Passed,
  InspectionStatusEnum.Failed,
];
