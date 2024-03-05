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
			<title>{`Abeg Help | ${title}`}</title>
			<meta name="description" content={content} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={content} />
			{image && <meta property="og:image" content={image} />}
			{url && <meta property="og:url" content={url} />}
			<meta property="og:site_name" content="Abeghelp" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={content} />
			{image && <meta name="twitter:image" content={image} />}
			{url && <meta name="twitter:url" content={url} />}
			<meta name="twitter:site" content="Abeghelp" />
			<meta name="twitter:creator" content="abeghelpme" />
		</Head>
	);
};

export default PageMetaData;
