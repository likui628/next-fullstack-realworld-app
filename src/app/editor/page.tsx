import { Metadata } from "next";
import EditorForm from "@/components/editor/EditorForm";

export const metadata: Metadata = {
  title: "Editor",
};

const EditArticle = () => {
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <EditorForm />
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
