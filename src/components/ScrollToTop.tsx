'use client';

import { type FC, useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop: FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
