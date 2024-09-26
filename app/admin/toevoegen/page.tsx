import NewsUpdateForm from "@/components/news/NewsUpdateForm";
import AccessDenied from "@/components/user/AccessDenied";
import { getUserIdWithAccess } from "@/lib/NextAuthFunctions";

const NewsAdd = async () => {
  const userIdWithAccess = await getUserIdWithAccess(["ADMIN", "WRITER"]);
  if (userIdWithAccess) {
    return <NewsUpdateForm />;
  } else {
    return <AccessDenied />;
  }
};

export default NewsAdd;
