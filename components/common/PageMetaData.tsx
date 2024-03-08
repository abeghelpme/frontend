import Head from "next/head";
// import type { ReactNode } from "react";

interface MetaDataProps {
	// children: ReactNode,
	title: string;
	content: string;
	image?: string;
	url?: string;
}

const PageMetaData = ({ title, content, image, url }: MetaDataProps) => {
	return (
		<Head>
			// Primary Meta Tags
			<title>{`Abeg Help | ${title}`}</title>
			<meta name="title" content={`Abeg Help | ${title}`} />
			<meta name="description" content={content} />
			// Open Graph / Facebook
			<meta property="og:type" content="website" />
			{url && <meta property="og:url" content={url} />}
			<meta property="og:title" content={`Abeg Help | ${title}`} />
			<meta property="og:description" content={content} />
			{image && <meta property="og:image" content={image} />}
			// Twitter
			{image && <meta property="twitter:card" content="summary_large_image" />}
			{url && <meta property="twitter:url" content={url} />}
			<meta property="twitter:title" content={`Abeg Help | ${title}`} />
			<meta property="twitter:description" content={content} />
			{image && <meta property="twitter:image" content={image} />}
		</Head>
	);
};

export default PageMetaData;
