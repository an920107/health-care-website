import InsuranceEditor from "../insurance-editor";

type Props = {
  params: { locale: string };
};

export default function NewInsurancePage({ params }: Props) {
  return (
    <InsuranceEditor locale={params.locale} />
  );
}
