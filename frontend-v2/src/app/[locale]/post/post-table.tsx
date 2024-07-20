"use client";

import NormalPostUsecase from "@/module/post/application/normalPostUsecase";
import PostEntity from "@/module/post/domain/postEntity";
import PostRepoImpl from "@/module/post/presenter/postRepoImpl";
import PostViewModel, { ColumnSelectionType } from "@/module/post/presenter/postViewModel";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import DropdownButton from "@/components/dropdown-button";
import GroupedButton from "@/components/grouped-button";
import Card from "@/components/card";
import SearchBar from "@/components/search-bar";
import Pager from "@/components/pager";
import PagerEntity from "@/module/pager/domain/pagerEntity";

type Props = {
  isEnableSearch?: boolean;
  isEnablePager?: boolean;
};

export default function PostTable({
  isEnableSearch = false,
  isEnablePager = false,
}: Props) {
  const trans = useTranslations("Post");

  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [columnSelected, setColumnSelected] =
    useState<ColumnSelectionType>(PostViewModel.columnSelections[0]);

  function handleColumnSelectionChange(index: number) {
    setColumnSelected(PostViewModel.columnSelections[index]);
  }

  function handleSearchSubmit(text: string) {
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
          className={isEnableSearch ? "h-[2.875rem]" : ""}
          options={PostViewModel.columnSelections.map((e) => (trans(e.label)))}
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
          options={PostViewModel.columnSelections.map((e) => (trans(e.label)))}
          onChange={handleColumnSelectionChange}
        />
        <Card className="w-full rounded-b-xl overflow-hidden" isRounded={false} isBorder={false}>
          <Table></Table>
        </Card>
      </div>
      {
        isEnablePager &&
        <div className="flex flex-row justify-end mt-3">
          <Pager totalPage={totalPage} onChange={setCurrentPage} />
        </div>
      }
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
        visibility: true,
        search: searchText
      })
        .then(([posts, pager]) => {
          setPosts(posts);
          setTotalPage(pager.totalPage);
          console.log("Posts fetched:", posts, ", and with pager:", pager);
        })
        .catch(err => console.error("Failed to fetch posts", err));
    }, [columnSelected, searchText, currentPage]);

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
                <th className="px-3 md:px-6 py-3 md:pe-10 max-md:hidden text-nowrap">{trans("table_date")}</th>
              </tr>
            </thead>
            <tbody>
              {
                posts.map((post) => {
                  const postVM = new PostViewModel(post);
                  return (
                    <tr key={postVM.id} className="border-t">
                      <td className="px-3 md:px-6 py-3 md:ps-10 ps-5 text-nowrap">{trans(postVM.column)}</td>
                      <td className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap"><Link href={`/post/${postVM.id}`} className="link">{postVM.title}</Link></td>
                      <td className="px-3 md:px-6 py-3 md:pe-10 max-md:hidden text-nowrap">{postVM.releasedDate}</td>
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