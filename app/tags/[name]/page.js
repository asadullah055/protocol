import ContentDisplay from "@/app/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocumentByTags } from "@/utils/doc-utils";

const TagsPage = ({ params: { name } }) => {
  const docs = getDocuments();

  const matchesDoc = getDocumentByTags(docs, name);
  return <ContentDisplay id={matchesDoc[0].id} />;
};

export default TagsPage;
