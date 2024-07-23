import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import PostTable from "./post-table";

type Props = {
  locale: string;
  isEnableTitle?: boolean;
  isEnableMore?: boolean;
  isEnableSearch?: boolean;
  isEnablePager?: boolean;
  isAdmin?: boolean;
  actions?: Readonly<React.ReactNode>;
};

export default function PostPanel({
  locale,
  isEnableTitle = false,
  isEnableMore = false,
  isEnableSearch = false,
  isEnablePager = false,
  isAdmin = false,
  actions,
}: Props) {
  const trans = useTranslations("Post");

  return (
    <div>
      {isEnableTitle && <PostTitle />}
      <PostTable
        locale={locale}
        isEnableSearch={isEnableSearch}
        isEnablePager={isEnablePager}
        isAdmin={isAdmin}
        actions={actions}
      />
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