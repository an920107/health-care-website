import { useTranslations } from "next-intl";
import RestaurantPanel from "./restaurant-panel";

type Props = {
  params: { locale: string };
};

export default function RestaurantPage({ params }: Props) {
  const trans = useTranslations("Restaurant");

  return (
    <div>
      <h1>{trans("title")}</h1>
      <RestaurantPanel locale={params.locale} isEnablePager={true} isEnableSearch={true} />
    </div>
  );
}
