import AttachmentPreview from "@/components/attachment-preview";
import HeadInfo from "@/components/head-info";
import AttachmentUsecase from "@/module/attachment/application/attachmentUsecase";
import AttachmentEntity from "@/module/attachment/domain/attachmentEntity";
import AttachmentRepoImpl from "@/module/attachment/presenter/attachmentRepoImpl";
import RestaurantUsecase from "@/module/restaurant/application/restaurantUsecase";
import RestaurantEntity from "@/module/restaurant/domain/restaurantEntity";
import RestaurantRepoImpl from "@/module/restaurant/presenter/restaurantRepoImpl";
import RestaurantViewModel from "@/module/restaurant/presenter/restaurantViewModel";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  params: { locale: string, id: string };
};

export default async function RestaurantPage({params}: Props) {
  const trans = await getTranslations("Restaurant");
  const statusTrans = await getTranslations("Status");

  const restaurantUsecase = new RestaurantUsecase(new RestaurantRepoImpl());
  const attachmentUsecase = new AttachmentUsecase(new AttachmentRepoImpl());

  const idNum = Number.parseInt(params.id);
  if (idNum === Number.NaN) notFound();

  var entity: RestaurantEntity;
  try {
    entity = await restaurantUsecase.getRestaurantById(idNum);
  } catch {
    notFound();
  }
  const viewModel = new RestaurantViewModel(entity);

  const attachments: AttachmentEntity[] = [];
  for (var attachmentId of viewModel?.attachments ?? []) {
    const attachment = await attachmentUsecase.getAttachmentInfo(attachmentId);
    attachments.push(attachment);
  }

  const isEn = params.locale === "en";

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h1>{isEn ? viewModel.titleEn : viewModel.title}</h1>
        <HeadInfo view={viewModel.view} datetime={viewModel.inspectedDateString} />
      </div>
      <hr className="my-3" />
      <p>{trans("category")}: {trans(viewModel.category)}</p>
      <p>{trans("item")}: {isEn ? viewModel.itemEn : viewModel.item}</p>
      <p>{trans("result")}: {statusTrans(viewModel.inspectionStatus)}</p>
      {
        attachments.length > 0 &&
        <AttachmentPreview className="mt-12" attachments={attachments} />
      }
    </div>
  );
}
