import { useTranslations } from "next-intl";
import PostPanel from "../../post/post-panel";
import { diseasePostColumnSelections } from "@/module/post/presenter/columnSelection";

type Props = {
  params: { locale: string };
};

export default function DiseasePrevensionPage({ params }: Props) {
  const trans = useTranslations("Post");

  return (
    <div>
      <h1>{trans("title_disease")}</h1>
      <PostPanel
        locale={params.locale}
        isEnablePager={true}
        isEnableSearch={true}
        columnSelections={diseasePostColumnSelections}
      />
    </div>
  );
}
