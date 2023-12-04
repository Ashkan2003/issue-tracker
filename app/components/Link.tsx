import NextLink from "next/link"; // we change the Link to NextLink to avoid confilict
import { Link as RadixLink } from "@radix-ui/themes";

interface Props {
  href: string;
  children: String;
}

const Link = ({href,children}:Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior> 
    {/* we used Radix Link-component to style the Links in our project // its benefits is that it color changes when theme changes */}
        <RadixLink>{children}</RadixLink>
    </NextLink>
  )
};

export default Link;
