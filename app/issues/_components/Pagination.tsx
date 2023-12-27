"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number; // the total number of items
  pageSize: number; // the number of items to show in one page
  currentPage: number; //
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  // if we only use userRouter,when we push the other seach-params like "status" and "orderBy" will be deleted
  // so privoisly we new useSearchParams() to get the search-params
  const router = useRouter();
  const searchParams = useSearchParams();

  //calc the total numver of the pages
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null; // if there is only one page so we dont need pagination

  //we want to add the currentPage as a  query-string to the url
  const changePage = (page: number) => {
    // so get the cuurentPage as a arg
    const params = new URLSearchParams(searchParams); //the params have methods, not search-strings // the URLSearchParams provide many methods to edit search-paramets
    params.set("page", page.toString()); //this returns like page=2// the params.set method firs arg gets the key of search-params and the second arg gets the value of the search-params
    router.push("?" + params.toString()); //this returns like "?page=2"// push this to the url
  };

  // disabled={currentPage === 1} // when we are in the first-page, disable this btn to prevent an error
  // disabled={currentPage === pageCount} // when we are in the last-page, disable this btn to prevent an error
  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
