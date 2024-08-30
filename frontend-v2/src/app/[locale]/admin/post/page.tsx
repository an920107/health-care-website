import { useTranslations } from "next-intl";
import PostPanel from "../../post/post-panel";
import Button from "@/components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@/navigation";
import { normalPostColumnSelections } from "@/module/post/presenter/columnSelection";

type Props = {
  params: { locale: string };
}

export default function AdminPostPage({ params }: Props) {
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
      <PostPanel
        locale={params.locale}
        isAdmin={true}
        isEnableSearch={true}
        isEnablePager={true}
        columnSelections={normalPostColumnSelections}
        editBaseUrl="/admin/post/edit"
        actions={actions}
      />
    </div>
  );
}
