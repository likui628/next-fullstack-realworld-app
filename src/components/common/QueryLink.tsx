"use client";

import Link, { LinkProps } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

interface QueryLinkProps extends Omit<LinkProps, "href"> {
  query: Record<string, string | number | undefined>;
  children: React.ReactNode;
  className: string;
  reserved?: boolean;
}

const QueryLink = ({ reserved = false, query, children, ...props }: QueryLinkProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentQuery = reserved
    ? Array.from(searchParams.entries()).reduce(
        (obj, [key, value]) => ({
          ...obj,
          [key]: value,
        }),
        {}
      )
    : {};
  const finalQuery = { ...currentQuery, ...query };

  return (
    <Link href={{ pathname, query: { ...finalQuery } }} {...props}>
      {children}
    </Link>
  );
};

export default QueryLink;
