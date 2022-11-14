import Link from "next/link";

interface ContainerLinkProps {
    href: string;
    children?: string | JSX.Element | Array<JSX.Element | string>;
}
export const ContainerLink = ({
                                  href,
                                  children,
                              }: ContainerLinkProps): JSX.Element => {
    return (
        <Link href={href} target="_blank" rel="noopener noreferrer">
            <a
                className={"underline text-blue-600 decoration-blue-600 decoration-2 break-all"}
            >
                {children ? children : href}
            </a>
        </Link>
    );
};
