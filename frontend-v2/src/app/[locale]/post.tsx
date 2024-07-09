import { faBullhorn, faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "@/components/card";
import GroupedButton from "../../components/grouped-button";
import { useState } from "react";
import DropdownButton from "../../components/dropdown-button";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

type Props = {

};

export default function Post({ }: Props) {
  const trans = useTranslations("Post");

  return (
    <div>
      <div className="flex flex-row items-center">
        <FontAwesomeIcon icon={faBullhorn} className="size-6 me-4" />
        <h2>{trans("title")}</h2>
      </div>
      <div className="md:hidden mt-3">
        <DropdownButton options={columns.map((value) => (trans(value)))} />
      </div>
      <div className="mt-4 border shadow-md rounded-xl overflow-hidden">
        <GroupedButton
          className="w-full rounded-t-md overflow-hidden max-md:hidden"
          options={columns.map((value) => (trans(value)))}
        />
        <Card className="w-full rounded-b-xl overflow-hidden" isRounded={false} isBorder={false}>
          <div className="h-80"></div>
        </Card>
      </div>
      <div className="mt-3 text-right">
        <Link href="/post" className="link">
          <FontAwesomeIcon icon={faSquareCaretRight} className="size-4 me-2" />
          {trans("more")}
        </Link>
      </div>
    </div>
  )
}

const columns = [
  "all",
  "latest",
  "activity",
  "health",
  "nutrition"
];