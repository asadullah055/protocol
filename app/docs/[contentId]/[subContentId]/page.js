import ContentDisplay from "@/app/components/ContentDisplay";

const SubContentIdPage = ({ params: { subContentId } }) => {
  return (
    <div>
      <ContentDisplay id={subContentId} />
    </div>
  );
};

export default SubContentIdPage;
