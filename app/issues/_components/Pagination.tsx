import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  itemCount: number; // the total number of items
  pageSize: number; // the number of items to show in one page
  currentPage: number; //
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize); // the total numver of the pages
  if (pageCount <= 1) return null; // if there is only one page so we dont need pagination


  // disabled={currentPage === 1} // when we are in the first-page, disable this btn to prevent an error
  // disabled={currentPage === pageCount} // when we are in the last-page, disable this btn to prevent an error
  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount}>
        <ChevronRightIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
