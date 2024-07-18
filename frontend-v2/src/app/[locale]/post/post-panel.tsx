import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import PostTable from "./post-table";

type Props = {
  isEnableMore?: boolean;
  isEnableSearch?: boolean;
  isEnablePager?: boolean;
};

export default function PostPanel({
  isEnableMore = false,
  isEnableSearch = false,
  isEnablePager = false,
}: Props) {

  const trans = useTranslations("Post");

  return (
    <div>
      <PostTitle />
      <PostTable isEnableSearch={isEnableSearch} isEnablePager={isEnablePager} />
      {isEnableMore && <PostMore />}
    </div>
  );

  function PostTitle() {
    return (
      <div className="flex flex-row items-center">
        <FontAwesomeIcon icon={faBullhorn} className="size-6 me-4" />
        <h2>{trans("title")}</h2>
      </div>
    );
  }

  function PostMore() {
    return (
      <Link href="/post" className="link">
        <div className="flex flex-row items-center justify-end mt-4">
          <FontAwesomeIcon icon={faSquareCaretRight} className="size-4 me-2" />
          {trans("more")}
        </div>
      </Link>

    );
  }
}