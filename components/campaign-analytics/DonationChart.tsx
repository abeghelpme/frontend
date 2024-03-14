// import Chart from "react-apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const series = [
	// { data: ['100,000', '75,000', '50,000', '25,000', '0'] },
	{
		name: "Item1",
		data: [0, 20000, 25000, 50000, 95000],
	},
	{
		name: "Item2",
		data: [0, 27000, 35000, 60000, 95000],
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
				height={windowSize && windowSize >= 900 ? 400 : 300}
			/>
		</div>
	);
};

export default DonationChart;
