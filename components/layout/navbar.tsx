import { MenuDropdown } from "../feature/menu-dropdown";
import Logo from "../feature/logo";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <Logo />
      <MenuDropdown />
    </nav>
  );
}
