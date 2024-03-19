import type { FillSvgProps } from "@/interfaces";

const UpdatesIcon = ({ fill, stroke }: FillSvgProps) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 31 31"
		fill={fill ? "#EE885E" : "none"}
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M11.0788 22.6065V21.1529C8.19657 19.411 5.82812 16.015 5.82812 12.4059C5.82812 6.20286 11.5299 1.34067 17.9711 2.74419C20.8032 3.37076 23.2844 5.25047 24.5751 7.84448C27.1942 13.1077 24.4373 18.6967 20.3896 21.1403V22.594C20.3896 22.9574 20.5275 23.797 19.1866 23.797H12.2818C10.9034 23.8095 11.0788 23.2707 11.0788 22.6065Z"
			stroke={stroke ? "#292D32" : "white"}
			strokeWidth="1.87971"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			opacity="0.4"
			d="M11.332 27.5689C14.2017 26.7544 17.2343 26.7544 20.104 27.5689"
			stroke={stroke ? "#292D32" : "white"}
			strokeWidth="1.87971"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
export default UpdatesIcon;
