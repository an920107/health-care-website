import PostColumnEnum from "@/module/post/domain/postColumnEnum";
import PostEditor from "../post-editor";

export default function NewPostPage() {
  return (
    <PostEditor
      backUrl="/admin/post"
      columnOptions={[
        PostColumnEnum.Latest,
        PostColumnEnum.Activity,
        PostColumnEnum.Health,
        PostColumnEnum.Nutrition,
      ]}
    />
  );
}
