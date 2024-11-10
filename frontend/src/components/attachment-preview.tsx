import AttachmentEntity from "@/module/attachment/domain/attachmentEntity";
import AttachmentViewModel from "@/module/attachment/presenter/attachmentViewModel";
import { Link } from "@/navigation";
import { Table } from "@radix-ui/themes";
import { getTranslations } from "next-intl/server";

type Props = {
  className?: string;
  label?: string;
  attachments?: AttachmentEntity[];
};

export default async function AttachmentPreview ({
  className,
  label,
  attachments = [],
}: Props) {
  const trans = await getTranslations("Attachment");

  return (
    <div className={className}>
      {label && <label htmlFor={label} className="label">{label}</label>}
      <Table.Root className="w-full" variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>{trans("table_filename")}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{trans("table_time")}</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            attachments.map((entity, index) => {
              const viewModel = new AttachmentViewModel(entity);
              return (
                <Table.Row key={index} align="center">
                  <Table.Cell>
                    <Link href={viewModel.url} className="link">
                      {viewModel.filename}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{viewModel.uploadedDate}</Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table.Root>
    </div>
  );
}