"use client";

import Button from "@/components/button";
import { BuildingRequest } from "@/module/building/application/buildingDto";
import BuildingUsecase from "@/module/building/application/buildingUsecase";
import BuildingRepoImpl from "@/module/building/presenter/buildingRepoImpl";
import BuildingViewModel from "@/module/building/presenter/buildingViewModel";
import { BACKEND_HOST } from "@/module/config/config";
import { Link } from "@/navigation";
import { faAdd, faFileLines, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
};

export default function BuildingPanel({
  className,
}: Props) {
  const trans = useTranslations("AdminDengue");

  const usecase = new BuildingUsecase(new BuildingRepoImpl());

  const [buildings, setBuildings] = useState<BuildingViewModel[]>([]);

  useEffect(() => {
    fetchAll();
  }, []);

  function fetchAll() {
    usecase.getAllBuildings().then((entities) => {
      setBuildings(entities.map((entity) => new BuildingViewModel(entity)));
    });
  }

  return (
    <div className={className}>
      <BuildingTable />
      <BuildingActions />
    </div>
  );

  function BuildingTable() {

    function handleEdit(index: number) {
      const newUserId = prompt(trans("prompt_edit_user"));
      if (newUserId === null) return;

      const request = new BuildingRequest({
        name: buildings[index].name,
        userId: newUserId,
      });

      usecase.updateBuilding(buildings[index].id, request).then(() => fetchAll());
    }

    function handleDelete(index: number) {
      usecase.deleteBuilding(buildings[index].id).then(() => fetchAll());
    }

    return (
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>{trans("table_name")}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{trans("table_user")}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{trans("table_status")}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{trans("table_delete")}</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            buildings.map((building, index) => (
              <Table.Row key={building.id}>
                <Table.Cell>{building.name}</Table.Cell>
                <Table.Cell>
                  <span className="inline-block text-nowrap">
                    {building.userId}
                    <FontAwesomeIcon
                      icon={building.isEmptyUser ? faAdd : faPen}
                      className={`size-3 cursor-pointer ${building.isEmptyUser ? "" : "ms-3"}`}
                      onClick={() => handleEdit(index)}
                    />
                  </span>
                </Table.Cell>
                <Table.Cell>{"IN_DEVELOPMENT"}</Table.Cell>
                <Table.Cell>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="size-3 cursor-pointer text-red-600"
                    onClick={() => handleDelete(index)}
                  />
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Root>
    );
  }

  function BuildingActions() {

    function handleCreate() {
      const newBuildingName = prompt(trans("prompt_create"))?.trim();
      if (newBuildingName === undefined) return;
      if (newBuildingName.length === 0) {
        alert(trans("alert_empty"));
      }

      const request = new BuildingRequest({ name: newBuildingName });
      usecase.createBuilding(request).then(() => fetchAll());
    }

    return (
      <div className="flex flex-row mt-4 gap-2">
        <Button className="border" onClick={handleCreate}>
          <FontAwesomeIcon icon={faAdd} className="size-4 me-2" />
          <span className="py-1">{trans("new")}</span>
        </Button>
        <Button className="border">
          <FontAwesomeIcon icon={faFileLines} className="size-4 me-2" />
          <Link href={new URL("/api/dengue/report", BACKEND_HOST)} target="_blank" className="py-1">
            {trans("report")}
          </Link>
        </Button>
      </div>
    );
  }
}
