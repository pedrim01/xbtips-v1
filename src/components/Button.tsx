import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";
import { TbUser } from "react-icons/tb";

interface ButtonProps {
  className?: string;
  Icon?: ReactNode;
  href: string;
  value?: string;
  onClick?: () => Promise<void>;
}

export default function Button({ className, Icon, href, value, onClick }: ButtonProps) {
  return (
    <Link className={`${className}`} href={href} onClick={onClick}>
      {Icon}
      {value}
    </Link>
  );
}

