import { React, Link, Image } from "./baseImport";
import styles from "./NavMenu.module.scss";

const NavMenu: React.FC = () => {
  return (
    <header className={`${styles.header} container-fluid`}>
      <input type="checkbox" id={styles.menuId} />
      <label id={styles.burger} htmlFor={styles.menuId}>
        <div></div>
        <div></div>
        <div></div>
      </label>
      <nav>
        <ul>
          <li>
            <Link style={{ display: "inline-block" }} href={"/"}>
              <Image
                src="/taradance.svg"
                width={150}
                height={46}
                alt="NextSpace Logo"
              />
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href={"/users"}>Over&nbsp;ons</Link>
          </li>
          <li>
            <Link href={"/about"}>Danslessen</Link>
          </li>
          <li>
            <Link href={"/blog"}>Kalender</Link>
          </li>
        </ul>
        <div className="flex flex-right gap-2">
          <ul>
            <li>
              <Link href={"/login"}>
                <button>Boek&nbsp;ons!</button>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href={"/"}>
                <button className="secondary">
                  <Image
                    src="/icons/shield_person.svg"
                    width={24}
                    height={24}
                    alt="Member login"
                  />
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavMenu;
