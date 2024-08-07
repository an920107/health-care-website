import RestaurantUsecase from "@/module/restaurant/application/restaurantUsecase";
import RestaurantEntity from "@/module/restaurant/domain/restaurantEntity";
import RestaurantRepoImpl from "@/module/restaurant/presenter/restaurantRepoImpl";
import RestaurantViewModel from "@/module/restaurant/presenter/restaurantViewModel";
import { notFound } from "next/navigation";
import RestaurantEditor from "../../restaurant-editor";

type Props = {
  params: { id: string, locale: string };
};

export default async function EditRestaurantPage({ params }: Props) {
  const idNum = Number.parseInt(params.id);
  if (idNum === Number.NaN) notFound();

  const usecase = new RestaurantUsecase(new RestaurantRepoImpl());
  var entity: RestaurantEntity;
  try {
    entity = await usecase.getRestaurantById(idNum);
  } catch {
    notFound();
  }
  const viewModel = new RestaurantViewModel(entity);
  return (
    <RestaurantEditor
      locale={params.locale}
      updateId={viewModel.id}
      defaultCategory={viewModel.category}
      defaultTitle={viewModel.title}
      defaultTitleEn={viewModel.titleEn}
      defaultItem={viewModel.item}
      defaultItemEn={viewModel.itemEn}
      defaultInspectedDate={viewModel.inspectedDateObject}
      defaultInspectionStatus={viewModel.inspectionStatus}
      defaultReleaseStatus={viewModel.releaseStatus}
      defaultAttachmentIds={viewModel.attachments}
    />
  );
}
