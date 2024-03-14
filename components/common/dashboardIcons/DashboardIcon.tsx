import type { DashboardSvgProps } from "@/interfaces";

const DashboardIcon = ({ fill, stroke }: DashboardSvgProps) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 31 31"
		fill={fill ? "#008080" : "none"}
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M11.3049 3.55914L4.55044 8.82234C3.42261 9.69954 2.50781 11.5667 2.50781 12.9828V22.2686C2.50781 25.1759 4.87625 27.5568 7.78354 27.5568H22.2949C25.2022 27.5568 27.5707 25.1759 27.5707 22.2811V13.1582C27.5707 11.6419 26.5556 9.69954 25.315 8.83487L17.5706 3.40876C15.8162 2.18068 12.9966 2.24334 11.3049 3.55914Z"
			stroke={stroke ? "#292D32" : "white"}
			strokeWidth="1.87971"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M15.0391 22.5446V18.7852"
			stroke={stroke ? "#292D32" : "white"}
			strokeWidth="1.87971"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
export default DashboardIcon;
