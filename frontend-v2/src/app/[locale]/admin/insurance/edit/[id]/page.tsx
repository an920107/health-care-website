import InsuranceUsecase from "@/module/insurance/application/insuranceUsecase";
import InsuranceRepoImpl from "@/module/insurance/presenter/insuranceRepoImpl";
import InsuranceViewModel from "@/module/insurance/presenter/insuranceViewModel";
import { notFound } from "next/navigation";
import InsuranceEditor from "../../insurance-editor";

type Props = {
  params: { locale: string; id: string };
};

export default async function EditInsurancePage({ params }: Props) {
  const idNum = Number.parseInt(params.id);
  if (idNum === Number.NaN) notFound();

  const usecase = new InsuranceUsecase(new InsuranceRepoImpl());
  var viewModel: InsuranceViewModel;
  try {
    const entity = await usecase.getInsuranceById(idNum);
    viewModel = new InsuranceViewModel(entity);
  } catch {
    notFound();
  }

  return (
    <InsuranceEditor
      locale={params.locale}
      updateId={viewModel.id}
      defaultValues={{...viewModel}}
    />
  );
}
