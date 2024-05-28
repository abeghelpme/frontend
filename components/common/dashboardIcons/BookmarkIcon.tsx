import type { FillSvgProps } from "@/interfaces";

function BookmarkIcon({ fill, stroke }: FillSvgProps) {
	return (
		<svg
			width="31"
			height="31"
			viewBox="0 0 31 31"
			fill={fill ? "#EE885E" : "none"}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M28.0238 5.85174V20.9772C28.0238 22.1802 27.0464 23.308 25.8433 23.4584L25.4298 23.5086C22.6979 23.872 18.4873 25.2629 16.0813 26.5912C15.7555 26.7792 15.2167 26.7792 14.8783 26.5912L14.8282 26.5662C12.4221 25.2504 8.22417 23.872 5.50485 23.5086L5.14139 23.4584C3.93838 23.308 2.96094 22.1802 2.96094 20.9772V5.83919C2.96094 4.34795 4.17645 3.22014 5.66769 3.34545C8.29929 3.55848 12.2843 4.88685 14.5149 6.27784L14.8282 6.46576C15.1916 6.69133 15.7932 6.69133 16.1566 6.46576L16.3696 6.32794C17.1591 5.83921 18.1616 5.35048 19.2518 4.91188V10.0247L21.7581 8.35802L24.2644 10.0247V3.48335C24.6027 3.4207 24.9286 3.38306 25.2293 3.35799H25.3045C26.7957 3.23268 28.0238 4.34796 28.0238 5.85174Z"
				stroke={stroke ? "#292D32" : "white"}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M15.4922 6.87988V25.677"
				stroke={stroke ? "#292D32" : "white"}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M24.2626 3.48438V10.0257L21.7563 8.35904L19.25 10.0257V4.9129C20.8916 4.26127 22.7212 3.735 24.2626 3.48438Z"
				stroke={stroke ? "#292D32" : "white"}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
export default BookmarkIcon;
