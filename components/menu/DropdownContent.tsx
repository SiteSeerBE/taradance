import { Menu } from "@prisma/client";
import ActiveLink from "./ActiveLink";
import Link from "next/link";

type DropdownContentProps = {
  submenuscontent: Array<Partial<Menu>>;
  onChangePage: (contentPath: string) => void;
};

const DropdownContent: React.FC<DropdownContentProps> = (
  props: DropdownContentProps
) => {
  return (
    <div className="row w-full">
      {props.submenuscontent.map((item, index) => (
        <div className="col-xs-6 col-md-4 col-lg-3 col-xl-2" key={index}>
          <ActiveLink
            activeClassName="active"
            href={item.contentPath!}
            onClick={() => props.onChangePage(item.contentPath!)}
          >
            <b>{item.title}</b>
          </ActiveLink>
          <Link href={item.contentPath!}>
            <small>{item.description}</small>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DropdownContent;
