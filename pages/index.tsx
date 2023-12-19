import type { WithPageLayout } from "@/interfaces/with-page-layout";
import BaseLayout from "@/layouts/base-layout";
import { socketHelper } from "@/lib/utils/socket-helper";
import { useEffect } from "react";

const Home: WithPageLayout = () => {
  useEffect(() => {
    socketHelper();
  }, []);

  return (
    <div>
      <h1>WELCOME TO ABEG HELP!!</h1>
    </div>
  );
};

Home.PageLayout = BaseLayout;

export default Home;
