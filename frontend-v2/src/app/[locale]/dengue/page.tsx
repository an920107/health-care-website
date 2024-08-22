import { getTranslations } from "next-intl/server";

export default async function DenguePage() {
  const trans = await getTranslations("Dengue");

  return (
    <>
      <h1>{trans("title")}</h1>
    </>
  );
}
