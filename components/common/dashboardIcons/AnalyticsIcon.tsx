import type { DashboardSvgProps } from "@/interfaces";

const AnalyticsIcon = ({ fill, stroke }: DashboardSvgProps) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 31 31"
		fill={fill ? "#EE885E" : "none"}
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M7.61931 21.303H22.8951C25.2761 21.303 26.5292 20.0499 26.5292 17.6689V2.50586H3.97266V17.6689C3.98519 20.0499 5.23834 21.303 7.61931 21.303Z"
			stroke={stroke ? "#292D32" : "white"}
			strokeWidth="1.87971"
			strokeMiterlimit="10"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M2.73438 2.50586H27.7972"
			stroke={stroke ? "#292D32" : "white"}
			strokeWidth="1.87971"
			strokeMiterlimit="10"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M10.25 27.5694L15.2626 25.0631V21.3037"
			stroke={stroke ? "#292D32" : "white"}
			strokeWidth="1.87971"
			strokeMiterlimit="10"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M20.2782 27.5688L15.2656 25.0625"
			stroke={stroke ? "#292D32" : "white"}
			strokeWidth="1.87971"
			strokeMiterlimit="10"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M9.625 13.7848L13.5724 10.489C13.8857 10.2259 14.2992 10.3011 14.5122 10.652L16.016 13.1582C16.2291 13.5091 16.6426 13.5718 16.9559 13.3212L20.9033 10.0254"
			stroke={stroke ? "#292D32" : "white"}
			strokeWidth="1.87971"
			strokeMiterlimit="10"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
export default AnalyticsIcon;
