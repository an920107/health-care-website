import Card from "@/components/card";
import { Link } from "@/navigation";
import { faBullhorn, faDownload, faFileLines, faFileShield, faImage, faMosquito, faStore, faUser, faVirusCovid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import UserInfo from "./user-info";

export default function AdminPage() {
  const trans = useTranslations("Admin");

  return (
    <div>
      <h1>{trans("title")}</h1>
      <h2 className="mt-6">{trans("user_info")}</h2>
      <UserInfo className="mt-3"/>
      <h2 className="mt-6">{trans("panel")}</h2>
      <div className="mt-3 gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Link href="/admin/post">
          <Card className="w-full">
            <div className="px-6 py-4 flex flex-row items-center">
              <FontAwesomeIcon icon={faBullhorn} className="size-4 me-4" />
              <p>{trans("post")}</p>
            </div>
          </Card>
        </Link>
        <Link href="/admin/page">
          <Card>
            <div className="px-6 py-4 flex flex-row items-center">
              <FontAwesomeIcon icon={faFileLines} className="size-4 me-4" />
              <p>{trans("page")}</p>
            </div>
          </Card>
        </Link>
        <Link href="/admin/restaurant">
          <Card>
            <div className="px-6 py-4 flex flex-row items-center">
              <FontAwesomeIcon icon={faStore} className="size-4 me-4" />
              <p>{trans("restaurant")}</p>
            </div>
          </Card>
        </Link>
        <Link href="/admin/carousel">
          <Card>
            <div className="px-6 py-4 flex flex-row items-center">
              <FontAwesomeIcon icon={faImage} className="size-4 me-4" />
              <p>{trans("carousel")}</p>
            </div>
          </Card>
        </Link>
        <Link href="/admin/permission">
          <Card>
            <div className="px-6 py-4 flex flex-row items-center">
              <FontAwesomeIcon icon={faUser} className="size-4 me-4" />
              <p>{trans("permission")}</p>
            </div>
          </Card>
        </Link>
        <Link href="/admin/dengue">
          <Card>
            <div className="px-6 py-4 flex flex-row items-center">
              <FontAwesomeIcon icon={faMosquito} className="size-4 me-4" />
              <p>{trans("dengue")}</p>
            </div>
          </Card>
        </Link>
        <Link href="/admin/insurance">
          <Card>
            <div className="px-6 py-4 flex flex-row items-center">
              <FontAwesomeIcon icon={faFileShield} className="size-4 me-4" />
              <p>{trans("insurance")}</p>
            </div>
          </Card>
        </Link>
        <Link href="/admin/disease_prevention">
          <Card>
            <div className="px-6 py-4 flex flex-row items-center">
              <FontAwesomeIcon icon={faVirusCovid} className="size-4 me-4" />
              <p>{trans("disease_prevention")}</p>
            </div>
          </Card>
        </Link>
        <Link href="/admin/download_area">
          <Card>
            <div className="px-6 py-4 flex flex-row items-center">
              <FontAwesomeIcon icon={faDownload} className="size-4 me-4" />
              <p>{trans("download_area")}</p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}