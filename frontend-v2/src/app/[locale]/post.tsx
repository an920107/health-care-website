"use client";

import { faBullhorn, faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "@/components/card";
import GroupedButton from "../../components/grouped-button";
import { useEffect, useState } from "react";
import DropdownButton from "../../components/dropdown-button";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import PostColumnEnum from "@/module/post/domain/postColumnEnum";
import PostRepoImpl from "@/module/post/presenter/postRepoImpl";
import NormalPostUsecase from "@/module/post/application/normalPostUsecase";
import PostEntity from "@/module/post/domain/postEntity";
import PostViewModel from "@/module/post/presenter/postViewModel";

type Props = {};

export default function Post({ }: Props) {
  const trans = useTranslations("Post");

  const [columnSelected, setColumnSelected] = useState<_ColumnSelectionType>(_columnSelection[0]);

  return (
    <div>
      <div className="flex flex-row items-center">
        <FontAwesomeIcon icon={faBullhorn} className="size-6 me-4" />
        <h2>{trans("title")}</h2>
      </div>
      <div className="md:hidden mt-3">
        <DropdownButton options={_columnSelection.map((e) => (trans(e.label)))} />
      </div>
      <div className="mt-4 border shadow-md rounded-xl overflow-hidden">
        <GroupedButton
          className="w-full rounded-t-md overflow-hidden max-md:hidden border-b-2"
          textClassName="font-bold"
          options={_columnSelection.map((e) => (trans(e.label)))}
          onChange={(index) => setColumnSelected(_columnSelection[index])}
        />
        <Card className="w-full rounded-b-xl overflow-hidden" isRounded={false} isBorder={false}>
          <PostTiles column={columnSelected.value} />
        </Card>
      </div>
      <div className="mt-4 text-right">
        <Link href="/post" className="link">
          <FontAwesomeIcon icon={faSquareCaretRight} className="size-4 me-2" />
          {trans("more")}
        </Link>
      </div>
    </div>
  )

  function PostTiles({
    column
  }: {
    column: PostColumnEnum[],
  }) {
    const postRepo = new PostRepoImpl();
    const postUsecase = new NormalPostUsecase(postRepo);

    const [posts, setPosts] = useState<PostEntity[]>([]);

    useEffect(() => {
      postUsecase.getAllPosts({ column: column })
        .then(setPosts)
        .catch((err) => {
          console.error("Failed to fetch posts", err);
          setPosts([]);
        })
    }, []);

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
                posts.map((oriPost) => {
                  const post = new PostViewModel(oriPost);
                  return (
                    <tr key={post.id} className="border-t">
                      <td className="px-3 md:px-6 py-3 md:ps-10 ps-5 text-nowrap">{trans(post.column)}</td>
                      <td className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap"><Link href={`/post/${post.id}`} className="link">{post.title}</Link></td>
                      <td className="px-3 md:px-6 py-3 md:pe-10 max-md:hidden text-nowrap">{post.releasedDate}</td>
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

type _ColumnSelectionType = {
  label: string;
  value: PostColumnEnum[];
};

const _columnSelection: _ColumnSelectionType[] = [
  {
    label: "all",
    value: [
      PostColumnEnum.Latest,
      PostColumnEnum.Activity,
      PostColumnEnum.Health,
      PostColumnEnum.Nutrition,
    ],
  },
  {
    label: PostColumnEnum.Latest,
    value: [PostColumnEnum.Latest],
  },
  {
    label: PostColumnEnum.Activity,
    value: [PostColumnEnum.Activity],
  },
  {
    label: PostColumnEnum.Health,
    value: [PostColumnEnum.Health],
  },
  {
    label: PostColumnEnum.Nutrition,
    value: [PostColumnEnum.Nutrition],
  }
]
