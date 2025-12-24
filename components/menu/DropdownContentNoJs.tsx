import { Menu } from "@prisma/client";
import ActiveLink from "./ActiveLink";

type DropdownContentProps = {
  submenuscontent: Array<Partial<Menu>>;
};

const DropdownContentNoJs: React.FC<DropdownContentProps> = (
  props: DropdownContentProps
) => {
  return (
    <div className="nav__container menu">
      <nav>
        <ul>
          {" "}
          <li>
            <div className="nav-item-content">
              <div className="bg dropdown container-fluid show">
                <div className="row w-full">
                  {props.submenuscontent.map((item, index) => (
                    <div
                      className="col-xs-12 col-md-4 col-lg-3 col-xl-2"
                      key={index}
                    >
                      <ActiveLink
                        activeClassName="active"
                        href={item.contentPath!}
                      >
                        <b>{item.title}</b>
                      </ActiveLink>
                      <small>{item.description}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DropdownContentNoJs;
