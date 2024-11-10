import "./quill.css"

export default function QuillViewer({ value }: { value: string }) {
  return (
    <section className="mt-6 ql-editor !p-0" dangerouslySetInnerHTML={{ __html: value }}></section>
  );
}
