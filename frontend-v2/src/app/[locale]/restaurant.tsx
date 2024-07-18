import { faSquareCaretRight, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "@/components/card";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

type Props = {

};

export default function Restaurant({ }: Props) {
  const trans = useTranslations("Restaurant");

  return (
    <div>
      <div className="flex flex-row items-center">
        <FontAwesomeIcon icon={faStore} className="size-6 me-4" />
        <h2>{trans("title")}</h2>
      </div>
      <Card className="w-full mt-4">
        <div className="h-80"></div>
      </Card>
      <Link href="/post" className="link">
        <div className="flex flex-row items-center justify-end mt-4">
          <FontAwesomeIcon icon={faSquareCaretRight} className="size-4 me-2" />
          {trans("more")}
        </div>
      </Link>
    </div>
  )
}