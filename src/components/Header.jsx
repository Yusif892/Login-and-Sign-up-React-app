import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

export function Header({loggedIn}) {
  const [openNav, setOpenNav] = React.useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link className="flex items-center">Pages</Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link className="flex items-center">Account</Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link className="flex items-center">Blocks</Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link className="flex items-center">Docs</Link>
      </Typography>
    </ul>
  );

  return (
    <div className=" max-h-[768px] w-full">
      <Navbar className="sticky top-0 z-10 h-max max-w-full bg-[#6272A4] rounded px-4 py-2 lg:px-8 lg:py-4 border-0">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography as="a" className="mr-4 cursor-pointer py-1.5 font-medium">
            Material Tailwind
          </Typography>
          <div className="mr-4 hidden lg:block">{navList}</div>
          {!loggedIn && (
            <Link to="/sign-in" className="hidden lg:inline-block">
              <FiLogIn />
            </Link>
          )}
          <IconButton
            variant="text"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          {navList}
          {!loggedIn && (
            <Link to="/sign-in">
              <FiLogIn />
            </Link>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
}
