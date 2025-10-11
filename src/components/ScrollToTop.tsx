import { type FC, useEffect } from "react";
import { useRouter } from "next/router";

const ScrollToTop: FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo(0, 0);
  }, [router.asPath]);

  return null;
};

export default ScrollToTop;
