import PostColumnEnum from "@/module/post/domain/postColumnEnum";
import PostEditor from "../../post/post-editor";

export default function NewDiseasePreventionPage() {
  return (
    <PostEditor
      backUrl="/admin/disease_prevention"
      columnOptions={[
        PostColumnEnum.Influenza,
        PostColumnEnum.Dengue,
        PostColumnEnum.Tuberculosis,
        PostColumnEnum.Chickenpox,
      ]}
    />
  );
}
