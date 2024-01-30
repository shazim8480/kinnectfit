import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { logOutUser } from "@/redux/feature/user/userSlice";
import { ChevronDown } from "@/assets/icons/ChevronDown";
import { useRouter } from "next/router";

import Link from "next/link";
import { accessTokenFromLS, getItemFromLocalStorage } from "@/lib/utils";

export default function KFNavbar() {
  const [accessToken, setAccessToken] = useState(accessTokenFromLS);
  useEffect(() => {
    const updatedAccessToken = localStorage.getItem('accessToken'); // Replace with your actual logic
    setAccessToken(updatedAccessToken);
  }, [accessToken]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const userData = getItemFromLocalStorage('userData');
  let userName = userData?.name;
  // handle logout
  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    dispatch(logOutUser());
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
          <Link href={accessToken ? "/become-trainer" : "/sign-in"}>Become a trainer</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {accessToken && (
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
                  onClick={() => {
                    if (userData?.role === 'trainer') {
                      router.push('/dashboard/trainer-summary');
                    } else if (userData?.role === 'admin') {
                      router.push('/dashboard/trainer-list');
                    } else {
                      router.push('/dashboard/health-summary');
                    }
                  }}
                >
                  Dashboard
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        )}

        {accessToken ? (
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
          <NavbarMenuItem key={`${item} - ${index}`}>
            <Link className="w-full" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar >
  );
};
