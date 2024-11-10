import { Link } from "@/navigation";
import { faSquareCaretRight, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import RestaurantTable from "./restaurant-table";

type Props = {
  locale: string;
  isEnableTitle?: boolean;
  isEnableMore?: boolean;
  isEnableSearch?: boolean;
  isEnablePager?: boolean;
  isAdmin?: boolean;
  actions?: Readonly<React.ReactNode>;
};

export default function RestaurantPanel({
  locale,
  isEnableTitle = false,
  isEnableMore = false,
  isEnableSearch = false,
  isEnablePager = false,
  isAdmin = false,
  actions = [],
}: Props) {
  const trans = useTranslations("Restaurant");

  return (
    <div>
      {isEnableTitle && <RestaurantTitle />}
      <RestaurantTable
        locale={locale}
        isEnableSearch={isEnableSearch}
        isEnablePager={isEnablePager}
        isAdmin={isAdmin}
        actions = {actions}
      />
      {isEnableMore && <RestaurantMore />}
    </div>
  );

  function RestaurantTitle() {
    return (
      <div className="flex flex-row items-center">
        <FontAwesomeIcon icon={faStore} className="size-6 me-4" />
        <h2>{trans("title")}</h2>
      </div>
    );
  }

  function RestaurantMore() {
    return (
      <Link href="/restaurant" className="link">
        <div className="flex flex-row items-center justify-end mt-4">
          <FontAwesomeIcon icon={faSquareCaretRight} className="size-4 me-2" />
          {trans("more")}
        </div>
      </Link>
    );
  }
}
