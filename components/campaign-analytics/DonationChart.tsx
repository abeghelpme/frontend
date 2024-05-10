import { useEffect, useState } from "react";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const data = [
	{
		name: "Jan",
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: "Feb",
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: "Mar",
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: "Apr",
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: "May",
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: "Jun",
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: "Jul",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
	{
		name: "Aug",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
	{
		name: "Sept",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
	{
		name: "Oct",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
	{
		name: "Nov",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
	{
		name: "Dec",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

// const dataFormatter = (number) => `$${Intl.NumberFormat('us').format(number).toString()}`;

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
	const options = {
		responsive: true,
		layout: {
			padding: "1rem",
		},
		plugins: {
			legend: {
				align: "start",
				useBorderRadius: true,
				borderRadius: "4px",
			},
		},
	};
	return (
		<div className="w-full h-[80%]">
			<div className="flex gap-4 text-sm mb-6 font-medium">
				<div className="space-x-1">
					<span className="bg-[#D80027] w-6 h-[11px] rounded-[10px] inline-block" />
					<span className="">Recurring Donors</span>
				</div>
				<div className="space-x-1">
					<span className="bg-[#008080] w-6 h-[11px] rounded-[10px] inline-block" />
					<span className="">First Time Donors</span>
				</div>
			</div>
			<ResponsiveContainer
				width="100%"
				height={windowSize && windowSize >= 900 ? 400 : 300}
			>
				<LineChart
					width={500}
					height={300}
					data={data}
					margin={{
						top: 16,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid
						vertical={false}
						// strokeDasharray="3"
					/>
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					{/* <Legend
						wrapperStyle={{ top: 0 }}
						iconType="rect"
						verticalAlign="top"
						iconSize={26}
						height={36}
						align="left"
					/> */}
					<Line
						type="monotone"
						dataKey="pv"
						stroke="#D80027"
						strokeWidth={2}
						name="Recurring Donors"
						dot={false}
						activeDot={{ r: 4 }}
					/>
					<Line
						type="monotone"
						dataKey="uv"
						strokeWidth={2}
						dot={false}
						name="First Time Donors"
						stroke="#008080"
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default DonationChart;
