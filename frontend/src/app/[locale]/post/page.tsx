import { useTranslations } from "next-intl";
import PostPanel from "./post-panel";
import { normalPostColumnSelections } from "@/module/post/presenter/columnSelection";

type Props = {
  params: { locale: string };
};

export default function PostPage({ params }: Props) {
  const trans = useTranslations("Post");

  return (
    <div>
      <h1>{trans("title")}</h1>
      <PostPanel
        locale={params.locale}
        isEnablePager={true}
        isEnableSearch={true}
        columnSelections={normalPostColumnSelections}
      />
    </div>
  );
}
