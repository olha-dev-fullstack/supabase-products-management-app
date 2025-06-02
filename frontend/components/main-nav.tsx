import { NavItem } from "./nav-item";
import { UserAccountNav } from "./user-account-nav";

export function MainNav() {
  return (
    <nav className="flex h-16 items-center justify-center border px-4 gap-4">
      <div className="flex  space-x-4">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/protected/team">Team</NavItem>
      </div>
      <UserAccountNav />
    </nav>
  );
}
