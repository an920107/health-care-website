"use client";

import { faSquareCaretRight, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "@/components/card";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import RestaurantRepoImpl from "@/module/restaurant/presenter/restaurantRepoImpl";
import RestaurantUsecase from "@/module/restaurant/application/restaurantUsecase";
import { useEffect, useState } from "react";
import RestaurantEntity from "@/module/restaurant/domain/restaurantEntity";
import RestaurantViewModel from "@/module/restaurant/presenter/restaurantViewModel";

type Props = {

};

export default function Restaurant({ }: Props) {
  const trans = useTranslations("Restaurant");

  return (
    <div>
      <div className="flex flex-row items-center">
        <FontAwesomeIcon icon={faStore} className="size-6 me-4" />
        <h2>{trans("title")}</h2>
      </div>
      <Card className="w-full mt-4">
        <RestaurantTiles />
      </Card>
      <Link href="/post" className="link">
        <div className="flex flex-row items-center justify-end mt-4">
          <FontAwesomeIcon icon={faSquareCaretRight} className="size-4 me-2" />
          {trans("more")}
        </div>
      </Link>
    </div>
  );

  function RestaurantTiles() {
    const restaurantRepo = new RestaurantRepoImpl();
    const restaurantUsecase = new RestaurantUsecase(restaurantRepo);

    const [restaurants, setRestaurants] = useState<RestaurantEntity[]>([]);

    useEffect(() => {
      restaurantUsecase.getAllRestaurants({})
        .then(setRestaurants)
        .catch((err) => {
          console.error("Failed to fetch restaurants", err);
          setRestaurants([]);
        })
    }, []);

    return restaurants.length === 0
      ? (
        <p className="py-12 text-center">
          {trans("not_found")}
        </p>
      )
      : (
        <div>
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2">
                <th className="px-3 md:px-6 py-3 md:ps-10 ps-5 text-nowrap w-[25%]">{trans("table_title")}</th>
                <th className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap w-[25%]">{trans("table_category")}</th>
                <th className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap w-[25%]">{trans("table_item")}</th>
                <th className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap w-[25%]">{trans("table_valid")}</th>
                <th className="px-3 md:px-6 py-3 md:pe-10 max-md:hidden text-nowrap">{trans("table_time")}</th>
              </tr>
            </thead>
            <tbody>
              {
                restaurants.map((restaurant) => {
                  const restaurantVM = new RestaurantViewModel(restaurant);
                  return (
                    <tr key={restaurantVM.id} className="border-t">
                      <td className="px-3 md:px-6 py-3 md:ps-10 ps-5 text-nowrap"><Link href={`/restaurant/${restaurantVM.id}`} className="link">{trans(restaurantVM.title)}</Link></td>
                      <td className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap">{restaurantVM.title}</td>
                      <td className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap">{restaurantVM.item}</td>
                      <td className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap">{restaurantVM.valid}</td>
                      <td className="px-3 md:px-6 py-3 md:pe-10 max-md:hidden text-nowrap">{restaurantVM.inspectedDate}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      );
  }
}