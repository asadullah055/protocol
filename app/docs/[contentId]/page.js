import ContentDisplay from "@/app/components/ContentDisplay";

const contentIdPage = ({ params: { contentId } }) => {
  return (
    <div>
      <ContentDisplay id={contentId} />
    </div>
  );
};

export default contentIdPage;
