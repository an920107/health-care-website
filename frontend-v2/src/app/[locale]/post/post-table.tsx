"use client";

import NormalPostUsecase from "@/module/post/application/normalPostUsecase";
import PostEntity from "@/module/post/domain/postEntity";
import PostRepoImpl from "@/module/post/presenter/postRepoImpl";
import PostViewModel from "@/module/post/presenter/postViewModel";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import DropdownButton from "@/components/dropdown-button";
import GroupedButton from "@/components/grouped-button";
import Card from "@/components/card";
import SearchBar from "@/components/search-bar";
import Pager from "@/components/pager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { ColumnSelectionType, normalPostColumnSelections } from "@/module/post/presenter/columnSelection";

type Props = {
  locale: string;
  isEnableSearch?: boolean;
  isEnablePager?: boolean;
  isAdmin?: boolean;
  columnSelections: ColumnSelectionType[];
  actions?: Readonly<React.ReactNode>;
};

export default function PostTable({
  locale,
  isEnableSearch = false,
  isEnablePager = false,
  isAdmin = false,
  columnSelections,
  actions,
}: Props) {
  const trans = useTranslations("Post");
  const statusTrans = useTranslations("Status");

  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [columnSelected, setColumnSelected] =
    useState<ColumnSelectionType>(columnSelections[0]);

  function handleColumnSelectionChange(index: number) {
    setColumnSelected(columnSelections[index]);
  }

  function handleSearchSubmit(text: string) {
    setCurrentPage(1);
    setSearchText(text);
  }

  return (
    <div>
      {
        isEnableSearch &&
        <SearchBar className="max-md:hidden mt-6" onSubmit={handleSearchSubmit} />
      }
      <div className="md:hidden mt-3 flex flex-row items-center gap-2">
        <DropdownButton
          className={isEnableSearch ? "h-[2.625rem]" : ""}
          options={columnSelections.map((e) => (trans(e.label)))}
          onChange={handleColumnSelectionChange}
        />
        {
          isEnableSearch &&
          <SearchBar onSubmit={handleSearchSubmit} />
        }
      </div>
      <div className="mt-4 border shadow-md rounded-xl overflow-hidden">
        <GroupedButton
          className="w-full rounded-t-md overflow-hidden max-md:hidden border-b-2"
          textClassName="font-bold"
          options={columnSelections.map((e) => (trans(e.label)))}
          onChange={handleColumnSelectionChange}
        />
        <Card className="w-full rounded-b-xl overflow-hidden" isRounded={false} isBorder={false}>
          <Table></Table>
        </Card>
      </div>
      <div className="flex flex-row justify-between items-start md:items-center mt-4">
        <div>{actions ?? (<></>)}</div>
        {
          isEnablePager &&
          <div className="flex flex-row justify-end">
            <Pager totalPage={totalPage} onChange={setCurrentPage} />
          </div>
        }
      </div>
    </div>
  )

  function Table() {

    const [posts, setPosts] = useState<PostEntity[]>([]);

    const postRepo = new PostRepoImpl();
    const postUsecase = new NormalPostUsecase(postRepo);

    useEffect(() => {
      postUsecase.getAllPosts({
        page: currentPage,
        column: columnSelected.value,
        visibility: !isAdmin,
        search: searchText
      })
        .then(([posts, pager]) => {
          setPosts(posts);
          setTotalPage(pager.totalPage);
        })
        .catch(err => console.error("Fetching posts failed:", err));
    }, [columnSelected, searchText, currentPage]);

    const isEn = locale === "en";

    return posts.length === 0
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
                <th className="px-3 md:px-6 py-3 md:ps-10 ps-5 text-nowrap">{trans("table_column")}</th>
                <th className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap w-full">{trans("table_title")}</th>
                <th className={`px-3 md:px-6 py-3 ${isAdmin ? "max-md:pe-5" : "md:pe-10"} max-md:hidden text-nowrap`}>{trans("table_date")}</th>
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
                posts.map((entity) => {
                  const viewModel = new PostViewModel(entity);
                  return (
                    <tr key={viewModel.id} className="border-t">
                      <td className="px-3 md:px-6 py-3 md:ps-10 ps-5 text-nowrap">
                        {trans(viewModel.column)}
                      </td>
                      <td className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap">
                        <Link href={`/post/${viewModel.id}`} className="link">
                          {isEn ? viewModel.titleEn : viewModel.title}
                        </Link>
                      </td>
                      <td className={`px-3 md:px-6 py-3 ${isAdmin ? "max-md:pe-5" : "md:pe-10"} max-md:hidden text-nowrap`}>
                        {viewModel.releasedDate}
                      </td>
                      {
                        isAdmin &&
                        <>
                          <td className={`px-3 md:px-6 py-3 max-md:pe-5 text-nowrap`}>{statusTrans(viewModel.releaseStatus)}</td>
                          <td className="px-3 md:px-6 py-3 md:pe-10 text-nowrap">
                            <Link href={`/admin/post/edit/${viewModel.id}`}>
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