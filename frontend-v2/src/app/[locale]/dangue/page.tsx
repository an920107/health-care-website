import { getTranslations } from "next-intl/server";

export default async function DanguePage() {
  const trans = await getTranslations("Dangue");

  return (
    <>
      <h1>{trans("title")}</h1>
    </>
  );
}
