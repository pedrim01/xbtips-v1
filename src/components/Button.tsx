import Link from "next/link";
import { Children, MouseEventHandler, ReactNode } from "react";
import { TbUser } from "react-icons/tb";

interface ButtonProps {
  className?: string;
  Icon?: ReactNode;
  href: string;
  value?: string;
  onClick?: () => Promise<void>;
  children?: ReactNode
}

export default function Button({ className, Icon, href, value, onClick,children }: ButtonProps) {
  return (
    <Link className={`${className}`} href={href} onClick={onClick}>
      {Icon}
      {value}
      {children}
    </Link>
  );
}

