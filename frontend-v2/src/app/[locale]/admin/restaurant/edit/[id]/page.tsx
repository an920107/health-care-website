"use client";

import RestaurantUsecase from "@/module/restaurant/application/restaurantUsecase";
import RestaurantEntity from "@/module/restaurant/domain/restaurantEntity";
import RestaurantRepoImpl from "@/module/restaurant/presenter/restaurantRepoImpl";
import RestaurantViewModel from "@/module/restaurant/presenter/restaurantViewModel";
import { notFound, usePathname, useRouter } from "next/navigation";
import RestaurantEditor from "../../restaurant-editor";
import { useEffect, useState } from "react";

type Props = {
  params: { id: string, locale: string };
};

const usecase = new RestaurantUsecase(new RestaurantRepoImpl());

export default function EditRestaurantPage({ params }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [restaurant, setRestaurant] = useState<RestaurantViewModel | undefined>(undefined);

  async function fetchAll() {
    const idNum = parseInt(params.id);
    const entity = await usecase.getRestaurantById(idNum);
    setRestaurant(new RestaurantViewModel(entity));
  }

  useEffect(() => {
    fetchAll().catch((err) => {
      console.error(err);
      router.replace(`/${params.locale}/404?notfound=${pathname}`);
    });
  }, []);

  return restaurant === undefined
    ? (<></>)
    : (
      <RestaurantEditor
        locale={params.locale}
        updateId={restaurant.id}
        defaultCategory={restaurant.category}
        defaultTitle={restaurant.title}
        defaultTitleEn={restaurant.titleEn}
        defaultItem={restaurant.item}
        defaultItemEn={restaurant.itemEn}
        defaultInspectedDate={restaurant.inspectedDateObject}
        defaultInspectionStatus={restaurant.inspectionStatus}
        defaultReleaseStatus={restaurant.releaseStatus}
        defaultAttachmentIds={restaurant.attachments}
      />
    );
}
