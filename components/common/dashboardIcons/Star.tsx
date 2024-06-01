import type { Campaign } from "@/interfaces/Campaign";
import { DraftsIcon } from "../svg";

export const ApprovedIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		width="17"
		height="17"
		viewBox="0 0 17 17"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M10.0294 3.29721L11.2008 5.6401C11.3605 5.96624 11.7865 6.27907 12.1459 6.33897L14.2692 6.69174C15.627 6.91804 15.9465 7.90312 14.9681 8.87488L13.3174 10.5256C13.0378 10.8051 12.8847 11.3442 12.9713 11.7303L13.4438 13.7736C13.8166 15.391 12.958 16.0167 11.5269 15.1714L9.53681 13.9933C9.17739 13.7803 8.58502 13.7803 8.21894 13.9933L6.22882 15.1714C4.80445 16.0167 3.93918 15.3844 4.31191 13.7736L4.78448 11.7303C4.87101 11.3442 4.71792 10.8051 4.43837 10.5256L2.7877 8.87488C1.81593 7.90312 2.12876 6.91804 3.48657 6.69174L5.60981 6.33897C5.96258 6.27907 6.38856 5.96624 6.5483 5.6401L7.71975 3.29721C8.35871 2.02593 9.39704 2.02593 10.0294 3.29721Z"
			fill="#8BD2BD"
			stroke="white"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export const PendingIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		width="17"
		height="17"
		viewBox="0 0 17 17"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M10.7948 4.42783L11.7333 6.3048C11.8598 6.56438 12.1992 6.81065 12.4854 6.86389L14.1827 7.14344C15.2676 7.32315 15.5205 8.10855 14.7418 8.89395L13.4173 10.2185C13.1976 10.4381 13.0712 10.8708 13.1444 11.1836L13.5238 12.821C13.8233 14.1122 13.1311 14.6181 11.9929 13.9392L10.4021 12.994C10.1159 12.821 9.6367 12.821 9.35049 12.994L7.75972 13.9392C6.62155 14.6114 5.92934 14.1122 6.22886 12.821L6.60825 11.1836C6.68147 10.8774 6.555 10.4448 6.33536 10.2185L5.01083 8.89395C4.23209 8.11521 4.48501 7.32981 5.56993 7.14344L7.26718 6.86389C7.55339 6.8173 7.89284 6.56438 8.01931 6.3048L8.9578 4.42783C9.45699 3.40947 10.2823 3.40947 10.7948 4.42783Z"
			fill="#FFC263"
			stroke="white"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path d="M5.86856 4.28906H1.875" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M3.87178 13.6074H1.875" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M2.54059 8.94824H1.875" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export const RejectedIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		width="17"
		height="17"
		viewBox="0 0 17 17"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M4.06134 12.8235L4.44073 11.1795C4.52726 10.7935 4.37417 10.2543 4.09462 9.97477L2.44395 8.3241C1.47218 7.35233 1.78501 6.36726 3.14282 6.14096L5.26606 5.78819C5.61883 5.72829 6.04481 5.41546 6.20455 5.08932L7.376 2.74643C8.00831 1.47515 9.04663 1.47515 9.6856 2.74643L10.857 5.08932C10.9303 5.24241 11.07 5.38884 11.2231 5.5153"
			fill="#D80027"
		/>
		<path
			d="M4.06134 12.8235L4.44073 11.1795C4.52726 10.7935 4.37417 10.2543 4.09462 9.97477L2.44395 8.3241C1.47218 7.35233 1.78501 6.36726 3.14282 6.14096L5.26606 5.78819C5.61883 5.72829 6.04481 5.41546 6.20455 5.08932L7.376 2.74643C8.00831 1.47515 9.04663 1.47515 9.6856 2.74643L10.857 5.08932C10.9303 5.24241 11.07 5.38884 11.2231 5.5153"
			stroke="white"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M13.9232 6.1416C15.281 6.3679 15.6005 7.35298 14.622 8.32475L12.9714 9.97542C12.6918 10.255 12.5387 10.7941 12.6253 11.1801L13.0978 13.2235C13.4706 14.8409 12.612 15.4666 11.1809 14.6213L9.19081 13.4432C8.83139 13.2302 8.23901 13.2302 7.87294 13.4432L5.88281 14.6213"
			fill="#D80027"
		/>
		<path
			d="M13.9232 6.1416C15.281 6.3679 15.6005 7.35298 14.622 8.32475L12.9714 9.97542C12.6918 10.255 12.5387 10.7941 12.6253 11.1801L13.0978 13.2235C13.4706 14.8409 12.612 15.4666 11.1809 14.6213L9.19081 13.4432C8.83139 13.2302 8.23901 13.2302 7.87294 13.4432L5.88281 14.6213"
			stroke="white"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M15.1908 1.74121L1.87891 15.0531"
			stroke="white"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const STATUS_INFO_LOOKUP = {
	Approved: { Icon: ApprovedIcon, bgColor: "bg-[hsl(180,100%,25%,0.3)]" },

	"In Review": { Icon: PendingIcon, bgColor: "bg-[hsl(37,100%,69%,0.3)]" },

	Rejected: { Icon: RejectedIcon, bgColor: "bg-[hsl(0,100%,50%,0.3)]" },

	Draft: { Icon: DraftsIcon, bgColor: "bg-abeg-text/30" },
} satisfies Record<Campaign["status"], { Icon: typeof ApprovedIcon; bgColor?: string }>;

export const getStatusIconInfo = (status: Campaign["status"]) => STATUS_INFO_LOOKUP[status];
