"use client";

import AttachmentEntity from "@/module/attachment/domain/attachmentEntity";
import UploadingAttachmentEntity from "@/module/attachment/domain/uploadingAttachmentEntity";
import UploadingPregressMap from "@/module/attachment/domain/uploadingProgressMap";
import { Table } from "@radix-ui/themes";
import Button from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faClose } from "@fortawesome/free-solid-svg-icons";
import UploadingAttachmentViewModel from "@/module/attachment/presenter/uploadingAttachmentViewModel";
import AttachmentViewModel from "@/module/attachment/presenter/attachmentViewModel";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

type Props = {
  className?: string;
  label?: string;
  attachments?: AttachmentEntity[];
  uploadingAttachments?: UploadingAttachmentEntity[];
  uploadingProgressMap?: UploadingPregressMap;
  onChange?(attachments: AttachmentEntity[]): void;
};

export default function AttachmentPreview({
  className,
  label,
  attachments = [],
  uploadingAttachments = [],
  uploadingProgressMap = {},
  onChange,
}: Props) {
  const trans = useTranslations("Attachment");

  function handleMoveUp(index: number) {
    const newAttachments = [...attachments];
    if (index > 0) {
      [newAttachments[index], newAttachments[index - 1]] = [newAttachments[index - 1], newAttachments[index]];
    }
    onChange?.(newAttachments);
  }

  function handleMoveDown(index: number) {
    const newAttachments = [...attachments];
    if (index < newAttachments.length - 1) {
      [newAttachments[index], newAttachments[index + 1]] = [newAttachments[index + 1], newAttachments[index]];
    }
    onChange?.(newAttachments);
  }

  function handleDelete(index: number) {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    onChange?.(newAttachments);
  }

  return (
    <div>
      {label && <label htmlFor={label} className="label">{label}</label>}
      {
        attachments.length === 0 && uploadingAttachments.length === 0
          ?
          <div className={`${className ?? ""} flex flex-col items-center w-full rounded-lg border p-2 gap-2`}>
            <p className="py-12">{trans("not_found")}</p>
          </div>
          : (
            <Table.Root className="w-full" variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>{trans("table_order")}</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>{trans("table_filename")}</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>{`${trans("table_time")} / ${trans("table_progress")}`}</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>{trans("table_move")}</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>{trans("table_delete")}</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  attachments.map((entity, index) => {
                    const vm = new AttachmentViewModel(entity);
                    return (
                      <Table.Row key={index} align="center">
                        <Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
                        <Table.Cell><Link href={vm.url} className="link">{vm.filename}</Link></Table.Cell>
                        <Table.Cell>{vm.uploadedTime}</Table.Cell>
                        <Table.Cell>
                          <div className="flex flex-row">
                            <Button onClick={() => handleMoveUp(index)} disabled={index === 0}>
                              <FontAwesomeIcon icon={faArrowUp} className="size-3 py-1.5" />
                            </Button>
                            <Button onClick={() => handleMoveDown(index)} disabled={index === attachments.length - 1}>
                              <FontAwesomeIcon icon={faArrowDown} className="size-3 py-1.5" />
                            </Button>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <Button onClick={() => handleDelete(index)}>
                            <FontAwesomeIcon icon={faClose} className="size-3 py-1.5" />
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })
                }
                {
                  uploadingAttachments.map((entity, index) => {
                    const vm = new UploadingAttachmentViewModel(entity, uploadingProgressMap);
                    return (
                      <Table.Row key={`_${index}`}>
                        <Table.RowHeaderCell>-</Table.RowHeaderCell>
                        <Table.Cell>{vm.filename}</Table.Cell>
                        <Table.Cell>{`${vm.pregress.toFixed(2)} %`}</Table.Cell>
                        <Table.Cell>-</Table.Cell>
                        <Table.Cell>-</Table.Cell>
                      </Table.Row>
                    );
                  })
                }
              </Table.Body>
            </Table.Root>
          )
      }
    </div>
  );
}