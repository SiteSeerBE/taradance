import { Menu } from "@prisma/client";
import ActiveLink from "./ActiveLink";

type DropdownContentProps = {
  submenuscontent: Array<Partial<Menu>>;
  onChangePage: (contentPath: string) => void;
};

const DropdownContent: React.FC<DropdownContentProps> = ({
  submenuscontent,
  onChangePage,
}) => {
  return (
    <div className="row">
      {submenuscontent.map((item, index) => (
        <div className="col-xs-6 col-md-4 col-lg-3 col-xl-2" key={index}>
          <ActiveLink
            activeClassName="active"
            href={item.contentPath!}
            onClick={() => onChangePage(item.contentPath!)}
          >
            <b>{item.title}</b>
          </ActiveLink>
          <small>{item.description}</small>
        </div>
      ))}
    </div>
  );
};

export default DropdownContent;
