import { useTranslations } from "next-intl";
import PostPanel from "./post-panel";

export default function PostPage({ }: {}) {
  const trans = useTranslations("Post");

  return (
    <div>
      <h1>{trans("title")}</h1>
      <PostPanel isEnablePager={true} isEnableSearch={true} />
    </div>
  );
}
