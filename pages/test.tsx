import { Button } from "@/components/ui";
import type { User } from "@/interfaces";
import { AuthPagesLayout } from "@/layouts";
import { callApi } from "@/lib";
import { useSession } from "@/store";
import { useRouter } from "next/router";

const Test = () => {
	const router = useRouter();
	const { user, clearSession } = useSession((state) => state);
	const logOut = async () => {
		const { data, error } = await callApi("/auth/signout");

		if (data) {
			clearSession();
			router.push("/signin");
		}
	};
	return (
		<div className="flex items-center justify-center gap-4 flex-col h-full">
			<p className="text-2xl">Welcome {(user as User)?.firstName}</p>
			<Button onClick={logOut} className="bg-red-500">
				Logout
			</Button>
		</div>
	);
};

export default Test;

Test.protect = true;

Test.getLayout = AuthPagesLayout;
