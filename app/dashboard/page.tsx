import Authentication from "@/components/user/Authentication";

const Dashboard: React.FC = async () => {
  return (
    <div className="top-margin">
      <Authentication />
    </div>
  );
};

export default Dashboard;
