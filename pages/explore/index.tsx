import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps = (async () => {
	return {
		redirect: {
			permanent: true,
			destination: "/explore/all",
		},
	};
}) satisfies GetServerSideProps;

export default function Index({}: InferGetServerSidePropsType<
	typeof getServerSideProps
>) {
	return (
		<main>
			<p>Redirecting...</p>
		</main>
	);
}
