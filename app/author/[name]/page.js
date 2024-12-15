import ContentDisplay from "@/app/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocumentByAuthors } from "@/utils/doc-utils";
const AuthorPage = ({ params: { name } }) => {
  const docs = getDocuments();
  const matchesDoc = getDocumentByAuthors(docs, name);

  return <ContentDisplay id={matchesDoc[0]?.id} />;
};

export default AuthorPage;
