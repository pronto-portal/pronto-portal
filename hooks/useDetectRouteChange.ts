import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useDetectRouteChange = () => {
  const router = useRouter();
  const [isChanging, setIsChanging] = useState(true);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsChanging(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  return [isChanging, setIsChanging];
};

export default useDetectRouteChange;
