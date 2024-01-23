import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "@/redux/feature/user/userSlice";
import { ChevronDown } from "@/assets/icons/ChevronDown";
import { useRouter } from "next/router";

import Link from "next/link";

export default function KFNavbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const userProfile = useSelector((state) => state.user);
  // console.log(
  //   "🚀 ~ file: Navbar.jsx:19 ~ KFNavbar ~ userProfile:",
  //   userProfile
  // );

  let userName = userProfile?.user?.signupUser?.name;
  let isAuthenticated = userProfile?.isAuthenticated;
  // console.log("🚀 ~ file: Navbar.jsx:21 ~ KFNavbar ~ userName:", userName);

  // handle logout
  const handleLogout = () => {
    // console.log("logged out");
    dispatch(logOutUser());
  };

  // become trainer handler
  const handleBecomeTrainer = () => {
    if (isAuthenticated) {
      router.push("/become-trainer");
    } else {
      router.push("sign-in");
    }
  };

  const menuItems = ["Workout Plans", "Find your Meal", "Be a Trainer"];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="pr-3 sm:hidden" justify="start">
        <NavbarBrand>
          <Link
            href="/"
            className="font-bold text-inherit brand-name text-[18px]"
          >
            KinnectFit
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="center">
        <NavbarBrand>
          <Link href="/" className={`font-bold text-inherit text-[18px]`}>
            KinnectFit
          </Link>
        </NavbarBrand>
        <NavbarItem>
          <Link href="/workouts">Workout Plans</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/meal-plans">Find your Meal</Link>
        </NavbarItem>
        <NavbarItem>
          <button onClick={() => handleBecomeTrainer()}>
            Become a Trainer
          </button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {userProfile?.isAuthenticated === true && (
          <NavbarContent className="flex gap-4" justify="center">
            <Dropdown>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0"
                    endContent={<ChevronDown />}
                    // radius="sm"
                    variant="secondary"
                  >
                    Hi, {userName}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="Kinnectfit"
                className="w-[200px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                <DropdownItem
                  key="dashboard"
                  onClick={() => router.push("/dashboard")}
                >
                  Dashboard
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        )}

        {userProfile?.isAuthenticated === true ? (
          <NavbarItem>
            <Button onClick={() => handleLogout()} color="secondary">
              Log out
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button as={Link} color="secondary" href="/sign-in">
              Join Us
            </Button>
          </NavbarItem>
        )}
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
