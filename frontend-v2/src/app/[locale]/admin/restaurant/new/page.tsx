import RestaurantEditor from "../restaurant-editor";

type Props = {
  params: { locale: string };
}

export default function NewRestaurantPage({ params }: Props) {
  return (
    <RestaurantEditor locale={params.locale} />
  );
}