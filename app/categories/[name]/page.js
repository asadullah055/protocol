import ContentDisplay from "@/app/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocumentByCategory } from "@/utils/doc-utils";

const CategoriesPage = ({ params: { name } }) => {
  const docs = getDocuments();
  const matchesDoc = getDocumentByCategory(docs, name);
  return <ContentDisplay id={matchesDoc[0].id} />;
};

export default CategoriesPage;
