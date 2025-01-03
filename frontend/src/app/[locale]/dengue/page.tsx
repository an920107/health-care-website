// TODO: make lables and messages translatable

"use client";

import Button from "@/components/button";
import Pager from "@/components/pager";
import BuildingUsecase from "@/module/building/application/buildingUsecase";
import BuildingRepoImpl from "@/module/building/presenter/buildingRepoImpl";
import DengueUsecase from "@/module/dengue/application/dengueUsecase";
import DengueRepoImpl from "@/module/dengue/presenter/dengueRepoImpl";
import DengueViewModel from "@/module/dengue/presenter/dengueViewModel";
import PagerEntity from "@/module/pager/domain/pagerEntity";
import UserUsecase from "@/module/user/application/userUsecase";
import UserRepoImpl from "@/module/user/presenter/userRepoImpl";
import { Link, useRouter } from "@/navigation";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "@radix-ui/themes";
import { useEffect, useState } from "react";

export default function DenguePage() {
  const userUsecase = new UserUsecase(new UserRepoImpl());
  const dangueUsecase = new DengueUsecase(new DengueRepoImpl());

  const router = useRouter();

  const [dengues, setDengues] = useState<DengueViewModel[]>([]);
  const [buildingIdNameMap, setBuildingIdNameMap] = useState<Map<number, string>>(new Map());
  const [pagerEntity, setPagerEntity] = useState(new PagerEntity({ currentPage: 1, totalPage: 1 }));

  async function fetchAll() {
    try {
      await userUsecase.getCurrentUser();
    } catch {
      alert("你沒有權限");
      router.push("/");
      return;
    }
    const [dengues, pager] = await dangueUsecase.getAllDengues({ page: pagerEntity.currentPage });

    setDengues(dengues.map((dengue) => new DengueViewModel(dengue)));
    setPagerEntity((prev) => new PagerEntity({ currentPage: prev.currentPage, totalPage: pager.totalPage }));

    const buildingUsecase = new BuildingUsecase(new BuildingRepoImpl());
    for (const dengue of dengues) {
      const entity = await buildingUsecase.getBuildingById(dengue.buildingId);
      setBuildingIdNameMap((prev) => new Map(prev.set(dengue.buildingId, entity.name)));
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    fetchAll();
  }, [pagerEntity.currentPage]);

  function handleDelete(id: number) {
    dangueUsecase.deleteDengue(id).then(() => fetchAll());
  }

  return (
    <>
      <h1>歷史填報紀錄</h1>
      <Table.Root className="mt-6" variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>建物名稱</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>檢查月份</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>填表日期</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>刪除（立即生效）</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            dengues.map((dengue) => (
              <Table.Row key={dengue.id}>
                <Table.Cell>{buildingIdNameMap.get(dengue.buildingId)}</Table.Cell>
                <Table.Cell>{dengue.inspectionMonthString}</Table.Cell>
                <Table.Cell>{dengue.filledDateString}</Table.Cell>
                <Table.Cell>
                  <button onClick={() => handleDelete(dengue.id)}>
                    <FontAwesomeIcon icon={faTrash} className="size-4 text-red-600" />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Root>
      <div className="flex flex-row justify-between items-start md:items-center mt-4">
        <Button className="border">
          <FontAwesomeIcon icon={faAdd} className="size-4 me-2" />
          <Link href={`/dengue/new`} className="py-1">建立登革熱報表</Link>
        </Button>
        <div className="flex flex-row justify-end mt-4">
          <Pager entity={pagerEntity} onChange={setPagerEntity} />
        </div>
      </div>
    </>
  );
}
