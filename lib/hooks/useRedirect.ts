import { useRouter } from "next/router";
import { useEffect } from "react";

function useRedirect(dep: string, url: string) {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      void router.push(url);
    }, 2000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);
}

export default useRedirect;
