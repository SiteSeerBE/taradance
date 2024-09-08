import { addCollectionItem } from "@/lib/CRUD/addCollectionItem";
import { User } from "@/lib/dataTypes";

interface Props {
  userId: string;
}

const Authentication: React.FC<Props> = ({ userId }) => {
  const buttonClickHandler = () => {
    const params: User = {
      roles: ["admin"],
    };
    const newDocRef = addCollectionItem("users", params, userId);
  };

  return <button onClick={buttonClickHandler}>Make me admin</button>;
};

export default Authentication;
