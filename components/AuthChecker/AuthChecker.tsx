import { useSession } from "@/store/useSession";
import { useRouter } from "next/router";

type Children = {
  children: React.ReactNode;
};
const AuthChecker = ({ children }: Children) => {
  const router = useRouter();
  const { user } = useSession((state) => state);
  const isLoggedIn = user !== null;

  if (isLoggedIn) {
    void router.push("/");
  }

  return <>{!isLoggedIn ? children : null}</>;
};
export default AuthChecker;
