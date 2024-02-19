import type { WithPageLayout } from "@/interfaces";
import { BaseLayout } from "@/layouts";
import { callApi } from "@/lib";
import { useSession } from "@/store";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: WithPageLayout = () => {
	const { user, clearSession } = useSession((state) => state);
	const router = useRouter();

	const signOut = async () => {
		const { data, error } = await callApi("/auth/signout");

		if (data) {
			clearSession();
			void router.push("/signin");
		}
	};

	return (
		<BaseLayout>
			<Link href="/test"> Go to test </Link>
			<button onClick={() => void signOut()}>Logout</button>
			<h1>WELCOME TO ABEG HELP!!</h1>
		</BaseLayout>
	);
};

export default Home;
