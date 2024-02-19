import type { WithPageLayout } from "@/interfaces";
import { BaseLayout } from "@/layouts";
import { useSession } from "@/store";
import Link from "next/link";

const Home: WithPageLayout = () => {
	const { user } = useSession((state) => state);

	console.log(user);
	return (
		<BaseLayout>
			<Link href="/test"> Go to test </Link>
			<h1>WELCOME TO ABEG HELP!!</h1>
		</BaseLayout>
	);
};

export default Home;
