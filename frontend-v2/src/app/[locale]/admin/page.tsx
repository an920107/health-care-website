import Button from "@/components/button";
import Card from "@/components/card";
import { Link } from "@/navigation";
import { faBullhorn, faFileLines, faImage, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

export default function AdminPage() {
  const trans = useTranslations("Admin");

  return (
    <div>
      <h1>{trans("title")}</h1>
      <div className="mt-6 gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Link href="/admin/post">
          <Card className="w-full">
            <div className="px-6 py-4 flex flex-row">
              <FontAwesomeIcon icon={faBullhorn} className="size-6 me-4" />
              <h3>{trans("post")}</h3>
            </div>
          </Card>
        </Link>
        <Link href="/admin/page">
          <Card>
            <div className="px-6 py-4 flex flex-row">
              <FontAwesomeIcon icon={faFileLines} className="size-6 me-4" />
              <h3>{trans("page")}</h3>
            </div>
          </Card>
        </Link>
        <Link href="/admin/restaurant">
          <Card>
            <div className="px-6 py-4 flex flex-row">
              <FontAwesomeIcon icon={faStore} className="size-6 me-4" />
              <h3>{trans("restaurant")}</h3>
            </div>
          </Card>
        </Link>
        <Link href="/admin/carousel">
          <Card>
            <div className="px-6 py-4 flex flex-row">
              <FontAwesomeIcon icon={faImage} className="size-6 me-4" />
              <h3>{trans("carousel")}</h3>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}