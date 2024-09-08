import { addCollectionItem } from "@/lib/CRUD/addCollectionItem";
import { DbUser } from "@/lib/dataTypes";

interface Props {
  userId: string;
}

const Authentication: React.FC<Props> = ({ userId }) => {
  const buttonClickHandler = () => {
    const params: DbUser = {
      roles: ["admin"],
    };
    const newDocRef = addCollectionItem("users", params, userId);
  };

  return <button onClick={buttonClickHandler}>Make me admin</button>;
};

export default Authentication;
