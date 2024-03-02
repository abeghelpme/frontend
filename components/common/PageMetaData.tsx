import Head from "next/head";
// import type { ReactNode } from "react";

interface MetaDataProps {
	// children: ReactNode,
	title: string;
	content: string;
}

const PageMetaData = ({ title, content }: MetaDataProps) => {
	return (
		<Head>
			<title>{`Abeg Help | ${title}`}</title>
			<meta name="description" content={content} />
		</Head>
	);
};

export default PageMetaData;
