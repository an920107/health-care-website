"use client";

import AttachmentEntity from "@/module/attachment/domain/attachmentEntity";
import UploadingAttachmentEntity from "@/module/attachment/domain/uploadingAttachmentEntity";
import UploadingPregressMap from "@/module/attachment/domain/uploadingProgressMap";
import { Table } from "@radix-ui/themes";
import { useEffect } from "react";
import Button from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faClose } from "@fortawesome/free-solid-svg-icons";
import UploadingAttachmentViewModel from "@/module/attachment/presenter/uploadingAttachmentViewModel";
import AttachmentViewModel from "@/module/attachment/presenter/attachmentViewModel";
import { useTranslations } from "next-intl";

type Props = {
  className?: string;
  label?: string;
  attachments?: AttachmentEntity[];
  uploadingAttachments?: UploadingAttachmentEntity[];
  uploadingProgressMap?: UploadingPregressMap;
};

export default function AttachmentPreview({
  className,
  label,
  attachments = [],
  uploadingAttachments = [],
  uploadingProgressMap = {},
}: Props) {
  const trans = useTranslations("Attachment");

  return (
    <div>
      {label && <label htmlFor={label} className="label">{label}</label>}
      <div className={`${className ?? ""} flex flex-col items-center w-full rounded-lg border p-2 gap-2`}>
        {
          attachments.length === 0 && uploadingAttachments.length === 0
            ? <p className="py-12">{trans("not_found")}</p>
            : (
              <Table.Root className="w-full">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>{trans("table_order")}</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>{trans("table_filename")}</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>{`${trans("table_time")} / ${trans("table_pregress")}`}</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>{trans("table_move")}</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>{trans("table_delete")}</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {
                    attachments.map((entity, index) => {
                      const vm = new AttachmentViewModel(entity);
                      return (
                        <Table.Row>
                          <Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
                          <Table.Cell>{vm.filename}</Table.Cell>
                          <Table.Cell>{vm.uploadedTime}</Table.Cell>
                          <Table.Cell>
                            <div className="flex flex-row">
                              <Button><FontAwesomeIcon icon={faArrowUp} className="size-4" /></Button>
                              <Button><FontAwesomeIcon icon={faArrowDown} className="size-4" /></Button>
                            </div>
                          </Table.Cell>
                          <Table.Cell>
                            <Button><FontAwesomeIcon icon={faClose} className="size-4" /></Button>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })
                  }
                  {
                    uploadingAttachments.map((entity, index) => {
                      const vm = new UploadingAttachmentViewModel(entity, uploadingProgressMap);
                      return (
                        <Table.Row>
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
    </div>
  );
}