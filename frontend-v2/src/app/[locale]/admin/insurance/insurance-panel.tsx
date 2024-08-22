"use client";

import Pager from "@/components/pager";
import InsuranceUsecase from "@/module/insurance/application/insuranceUsecase";
import InsuranceRepoImpl from "@/module/insurance/presenter/insuranceRepoImpl";
import InsuranceViewModel from "@/module/insurance/presenter/insuranceViewModel";
import { Link } from "@/navigation";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
  actions?: Readonly<React.ReactNode>;
};

export default function InsurancePanel({
  className,
  actions,
}: Props) {
  const trans = useTranslations("Insurance");

  const usecase = new InsuranceUsecase(new InsuranceRepoImpl());

  const [insurances, setInsurances] = useState<InsuranceViewModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    usecase.query({ page: currentPage }).then(([insurances, pager]) => {
      setInsurances(insurances.map((insurance) => new InsuranceViewModel(insurance)));
      setTotalPage(pager.totalPage);
    });
  }, []);

  return (
    <div className={className}>
      <InsuranceTable />
      <InsuranceButtom />
    </div>
  );

  function InsuranceTable() {
    return (
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>{trans("table_id")}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{trans("table_name")}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{trans("table_student_id")}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{trans("table_application_date")}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{trans("table_incident_date")}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{trans("table_edit")}</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            insurances.map((insurance) => (
              <Table.Row key={insurance.id}>
                <Table.Cell>{insurance.id}</Table.Cell>
                <Table.Cell>{insurance.name}</Table.Cell>
                <Table.Cell>{insurance.studentId}</Table.Cell>
                <Table.Cell>{insurance.applicationDateString}</Table.Cell>
                <Table.Cell>{insurance.incidentDateString}</Table.Cell>
                <Table.Cell>
                  <Link href={`/admin/insurance/edit/${insurance.id}`}>
                    <FontAwesomeIcon icon={faPen} className="size-4" />
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Root>
    );
  }

  function InsuranceButtom() {
    return (
      <div className="flex flex-row justify-between items-start md:items-center mt-4">
        <div>{actions ?? (<></>)}</div>
        <div className="flex flex-row justify-end">
          <Pager totalPage={totalPage} onChange={setCurrentPage} />
        </div>
      </div>
    );
  }
}
