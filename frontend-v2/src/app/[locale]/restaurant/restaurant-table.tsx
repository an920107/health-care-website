"use client";

import Card from "@/components/card";
import Pager from "@/components/pager";
import SearchBar from "@/components/search-bar";
import PagerEntity from "@/module/pager/domain/pagerEntity";
import RestaurantUsecase from "@/module/restaurant/application/restaurantUsecase";
import RestaurantEntity from "@/module/restaurant/domain/restaurantEntity";
import RestaurantRepoImpl from "@/module/restaurant/presenter/restaurantRepoImpl";
import RestaurantViewModel from "@/module/restaurant/presenter/restaurantViewModel";
import { Link } from "@/navigation";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Props = {
  locale: string;
  isEnableSearch?: boolean;
  isEnablePager?: boolean;
  isAdmin?: boolean;
  actions?: Readonly<React.ReactNode>;
};

const restaurantUsecase = new RestaurantUsecase(new RestaurantRepoImpl());

export default function RestaurantTable({
  locale,
  isEnableSearch = false,
  isEnablePager = false,
  isAdmin = false,
  actions = [],
}: Props) {
  const trans = useTranslations("Restaurant");
  const statusTrans = useTranslations("Status");

  const [restaurants, setRestaurants] = useState<RestaurantEntity[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [pagerEntity, setPagerEntity] = useState(new PagerEntity({ currentPage: 1, totalPage: 1 }));

  useEffect(() => {
    restaurantUsecase.getAllRestaurants({
      page: pagerEntity.currentPage,
      visibility: !isAdmin,
      search: searchText,
    })
      .then(([restaurants, pager]) => {
        setRestaurants(restaurants);
        setPagerEntity(prev => new PagerEntity({ currentPage: prev.currentPage, totalPage: pager.totalPage }));
      })
      .catch((err) => console.error("Fetching restaurants failed:", err))
  }, [searchText, pagerEntity.currentPage]);

  function handleSearchSubmit(text: string) {
    setPagerEntity(prev => new PagerEntity({ currentPage: 1, totalPage: prev.totalPage }));
    setSearchText(text);
  }

  const isEn = locale == "en";

  return (
    <div>
      {isEnableSearch && <SearchBar className="mt-6" onSubmit={handleSearchSubmit} />}
      <div className="mt-4 border shadow-md rounded-xl overflow-hidden">
        <Card className="w-full rounded-b-xl overflow-hidden" isRounded={false} isBorder={false}>
          <Table />
        </Card>
      </div>
      <div className="flex flex-row justify-between items-start md:items-center mt-4">
        <div>{actions ?? (<></>)}</div>
        {
          isEnablePager &&
          <div className="flex flex-row justify-end">
            <Pager entity={pagerEntity} onChange={setPagerEntity} />
          </div>
        }
      </div>
    </div>
  );

  function Table() {
    return restaurants.length === 0
      ? (
        <p className="py-12 text-center">
          {trans("not_found")}
        </p>
      )
      : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2">
                <th className="px-3 md:px-6 py-3 md:ps-10 ps-5 text-nowrap w-full">{trans("table_title")}</th>
                <th className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap">{trans("table_category")}</th>
                <th className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap">{trans("table_item")}</th>
                <th className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap">{trans("table_valid")}</th>
                <th className={`px-3 md:px-6 py-3 ${isAdmin ? "max-md:pe-5" : "md:pe-10"} text-nowrap`}>{trans("table_date")}</th>
                {
                  isAdmin &&
                  <>
                    <th className={`px-3 md:px-6 py-3 max-md:pe-5 text-nowrap`}>{statusTrans("status")}</th>
                    <th className="px-3 md:px-6 py-3 md:pe-10 text-nowrap">{trans("table_edit")}</th>
                  </>
                }
              </tr>
            </thead>
            <tbody>
              {
                restaurants.map((entity) => {
                  const viewModel = new RestaurantViewModel(entity);
                  return (
                    <tr key={viewModel.id} className="border-t">
                      <td className="px-3 md:px-6 py-3 md:ps-10 ps-5 text-nowrap"><Link href={`/restaurant/${viewModel.id}`} className="link">{isEn ? viewModel.titleEn : viewModel.title}</Link></td>
                      <td className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap">{isEn ? viewModel.itemEn : viewModel.item}</td>
                      <td className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap">{trans(viewModel.category)}</td>
                      <td className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap">{statusTrans(viewModel.valid ? "passed" : "failed")}</td>
                      <td className={`px-3 md:px-6 py-3 ${isAdmin ? "max-md:pe-5" : "md:pe-10"} text-nowrap`}>{viewModel.inspectedDateString}</td>
                      {
                        isAdmin &&
                        <>
                          <td className={`px-3 md:px-6 py-3 max-md:pe-5 text-nowrap`}>{statusTrans(viewModel.releaseStatus)}</td>
                          <td className="px-3 md:px-6 py-3 md:pe-10 text-nowrap">
                            <Link href={`/admin/restaurant/edit/${viewModel.id}`}>
                              <FontAwesomeIcon icon={faPen} className="size-4" />
                            </Link>
                          </td>
                        </>
                      }
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
