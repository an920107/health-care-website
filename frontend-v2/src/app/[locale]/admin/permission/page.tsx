import { Table } from "@radix-ui/themes";
import { getTranslations } from "next-intl/server";

export default async function PermissionPage() {
  const trans = await getTranslations("Permission");

  return (
    <div>
      <h1>{trans("title")}</h1>
      <div className="overflow-x-scroll">
        <Table.Root className="mt-6" variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>{trans("table_name")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>{trans("table_uid")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>{trans("table_edit")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>{trans("table_delete")}</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>

          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}
