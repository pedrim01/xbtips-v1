import Link from "next/link";
import { ReactNode } from "react";
import { TbUser } from "react-icons/tb";

interface ButtonProps {
  className?: string;
  Icon?: ReactNode
  href: string
  value?: string

}

export default function Button({className,Icon,href,value} : ButtonProps) {
  return (
    <Link className={`${className}`} href={href}>
      {Icon}
      {value}
    </Link>
  );
}
