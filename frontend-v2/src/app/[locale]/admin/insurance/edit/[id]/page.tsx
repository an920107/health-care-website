"use client";

import InsuranceUsecase from "@/module/insurance/application/insuranceUsecase";
import InsuranceRepoImpl from "@/module/insurance/presenter/insuranceRepoImpl";
import InsuranceViewModel from "@/module/insurance/presenter/insuranceViewModel";
import { usePathname, useRouter } from "next/navigation";
import InsuranceEditor from "../../insurance-editor";
import { useEffect, useState } from "react";

type Props = {
  params: { locale: string; id: string };
};

const usecase = new InsuranceUsecase(new InsuranceRepoImpl());

export default function EditInsurancePage({ params }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [insurance, setInsurance] = useState<InsuranceViewModel | undefined>(undefined);

  async function fetchAll() {
    const idNum = parseInt(params.id);
    const entity = await usecase.getInsuranceById(idNum);
    setInsurance(new InsuranceViewModel(entity));
  }

  useEffect(() => {
    fetchAll().catch((err) => {
      console.error(err);
      router.replace(`/${params.locale}/404?notfound=${pathname}`);
    });
  }, []);


  return insurance === undefined
    ? (<></>)
    : (
      <InsuranceEditor
        locale={params.locale}
        updateId={insurance.id}
        defaultValues={{ ...insurance }}
      />
    );
}
