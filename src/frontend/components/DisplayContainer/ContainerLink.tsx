import clsx from "clsx";
import Link from "next/link";

interface ContainerLinkProps {
  href: string;
  children?: string | JSX.Element | Array<JSX.Element | string>;
  addtlClasses?: string;
}
export const ContainerLink = ({
  href,
  children,
  addtlClasses,
}: ContainerLinkProps): JSX.Element => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <a
        className={
          clsx(
            "underline",
            "text-blue-600",
            "decoration-blue-600",
            "decoration-2",
            "break-all"
          ) + addtlClasses
        }
      >
        {children ? children : href}
      </a>
    </Link>
  );
};
