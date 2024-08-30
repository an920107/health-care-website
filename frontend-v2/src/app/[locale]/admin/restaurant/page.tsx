import Button from "@/components/button";
import { Link } from "@/navigation";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import RestaurantPanel from "../../restaurant/restaurant-panel";

type Props = {
  params: { locale: string };
}

export default function AdminRestaurantPage({ params }: Props) {
  const trans = useTranslations("Restaurant");

  const actions = (
    <Button className="border">
      <FontAwesomeIcon icon={faAdd} className="size-4 me-2" />
      <Link href={`/admin/restaurant/new`} className="py-1">{trans("new")}</Link>
    </Button>
  );

  return (
    <div>
      <h1>{trans("title")}</h1>
      <RestaurantPanel locale={params.locale} isAdmin={true} isEnableSearch={true} isEnablePager={true} actions={actions} />
    </div>
  );
}
