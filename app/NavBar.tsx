"use client";
// import {Skeleton} from "@/app/components"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames"; // we use classname-package to see witch classes are rendered in witch condition
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  // DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Skeleton from "react-loading-skeleton";

const NavBar = () => {
  return (
    <nav className="border-b px-5  mb-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  // this component is for rendering the navbar-links
  const currentPath = usePathname(); //Get the current pathname

  const links = [
    { lable: "Dashboard", href: "/" },
    { lable: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.lable}>
          <Link
            className={classNames({
              // "class-name" : true or fulse //true= the class will always rendered // false= the condithon if is false then the claass does not applyes
              "nav-link": true, // the "nav-link" class defined in globals.css-file
              "!text-zinc-900": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.lable}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  // this component is for rendering the Auth-state of the user in the navbar such as login, signup, logout and user-avatar
  const { status, data: session } = useSession(); // the useSession hook is for geting user  authstatus in the client
  console.log(status,"sss")
  if (status === "loading") return <Skeleton width="3rem" height="2.3rem"/>;

  if (status === "unauthenticated")
    return <Link className="nav-link" href="/api/auth/signin">Log in</Link>;

  // so if the status is not "loading" and "unauthenticated" it means that it is "authenticated" so render this
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="A"
            size="3"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade">
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
