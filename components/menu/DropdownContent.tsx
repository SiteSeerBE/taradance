import ActiveLink from "./ActiveLink";
import { MenuChildProps } from "@/data/dataTypes";

type DropdownContentProps = {
  submenuscontent: Array<MenuChildProps>;
  onChangePage: (href: string) => void;
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
            href={item.href}
            onClick={() => onChangePage(item.href)}
          >
            <b>{item.label}</b>
          </ActiveLink>
          <small>{item.info}</small>
        </div>
      ))}
    </div>
  );
};

export default DropdownContent;
