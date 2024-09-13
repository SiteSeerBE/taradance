import NewsUpdateForm from "@/components/news/NewsUpdateForm";
import AuthCheck from "@/components/user/AuthCheck";

const NewsAdd = () => {
  return (
    <AuthCheck allowedRoles={["admin"]}>
      <NewsUpdateForm />
    </AuthCheck>
  );
};

export default NewsAdd;
