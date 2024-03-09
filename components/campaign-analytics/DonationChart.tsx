// import Chart from "react-apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const series = [
	{
		name: "Item1",
		data: [0, 9, 20, 31, 39, 10, 29, 91, 38],
	},
	{
		name: "Item2",
		data: [20, 29, 10, 21, 49, 30, 9, 90, 48],
	},
];

const options = {
	stroke: {
		show: true,
		curve: "smooth",
	},
	chart: {
		zoom: {
			enabled: false,
		},
		toolbar: {
			show: false,
			tools: {
				download: false,
			},
		},
		background: "#fff",
	},
	dataLabels: {
		enabled: false,
	},
	grid: {
		show: true,
	},
	xaxis: {
		categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
		labels: {
			show: true,
			style: {
				fontSize: "12px",
				fontWeight: 400,
			},
		},
	},
	yaxis: {
		show: true,
		labels: {
			show: true,
			style: {
				fontSize: "12px",
				fontWeight: 400,
			},
		},
	},
	legend: {
		show: false,
	},
} as const;

const DonationChart = () => {
	const [windowSize, setWindowSize] = useState<number | null>(null);

	useEffect(() => {
		const handleWindowResize = () => {
			setWindowSize(window.innerWidth);
		};
		handleWindowResize();
		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	return (
		<div>
			<Chart
				type="line"
				options={options}
				series={series}
				width={`100%`}
				height={windowSize && windowSize >= 900 ? 500 : 300}
			/>
		</div>
	);
};

export default DonationChart;
