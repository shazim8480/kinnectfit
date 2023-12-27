import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function KFNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Features",
    "Foods",
    "Plans",
    "Analytics",
    "Exercise",
    "Login",
    "Sign Up",
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="pr-3 sm:hidden" justify="center">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit brand-name">
            KinnectFit
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="end">
        <NavbarBrand>
          <Link href="/" className={`font-bold text-inherit  text-[18px]`}>
            KinnectFit
          </Link>
        </NavbarBrand>
        <NavbarItem>
          <Link href="#">Features</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" aria-current="page">
            Foods
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">Plans</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">Exercise</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">Analytics</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} color="secondary" href="/sign-in" variant="light">
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="secondary" href="/sign-up">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
