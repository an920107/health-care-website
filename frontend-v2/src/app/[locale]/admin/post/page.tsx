import { useTranslations } from "next-intl";
import PostPanel from "../../post/post-panel";
import Button from "@/components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@/navigation";

export default function AdminPostPage() {
  const trans = useTranslations("Post");

  const actions = (
    <Button className="border">
      <FontAwesomeIcon icon={faAdd} className="size-4 me-2" />
      <Link href={`/admin/post/new`} className="py-1">{trans("new")}</Link>
    </Button>
  );

  return (
    <div>
      <h1>{trans("title")}</h1>
      <PostPanel isAdmin={true} isEnableSearch={true} isEnablePager={true} actions={actions} />
    </div>
  );
}
