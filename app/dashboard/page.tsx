import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/buttons";

const Dashboard: React.FC = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <h1>Leden</h1>
      <SignOutButton />
    </div>
  );
};

export default Dashboard;
