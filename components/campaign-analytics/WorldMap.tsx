import {
	ComposableMap,
	Geographies,
	Geography,
	Marker,
} from "react-simple-maps";

type Markers = {
	name: string;
	coordinates: [number, number];
};

const Countries = {
	Nigeria: {
		country: "Nigeria",
		coordinates: [9.0563, 7.4985],
	},
	Ghana: {
		country: "Ghana",
		coordinates: [9.0563, 7.4985],
	},
	Mali: { country: "Mali", coordinates: [9.0563, 7.4985] },
	Liberia: {
		country: "Liberia",
		coordinates: [9.0563, 7.4985],
	},
	Cameroon: {
		country: "Cameroon",
		coordinates: [9.0563, 7.4985],
	},
	Gambia: {
		country: "Gambia",
		coordinates: [9.0563, 7.4985],
	},
};
// TODO:
// Nigeria, Ghana, Mali, Liberia, Cameroon, Gambia
// select instead of dropdown menu
// Arbitrary values
// Make worldmap a component with a worldmap geojson in the world map folder THIS THROWS A BUG:
// make use of svg for the countries flag

const markers: Markers[] = [
	{ name: "Liberia", coordinates: [6.4281, 9.4295] },
	{ name: "Santiago", coordinates: [-70.6693, -33.4489] },
	{ name: "Quito", coordinates: [-78.4678, -0.1807] },
	{ name: "Georgetown", coordinates: [-58.1551, 6.8013] },
	{ name: "Paramaribo", coordinates: [-55.2038, 5.852] },
	{ name: "Lima", coordinates: [-77.0428, -12.0464] },
	{ name: "Nigeria", coordinates: [9.0563, 7.4985] },
];

const WorldMap = () => {
	return (
		<>
			<ComposableMap
				projectionConfig={{ scale: 250 }}
				className="aspect-video w-[100%] md:w-[70%] lg:w-[50%]"
			>
				<Geographies geography="/assets/worldmap.json">
					{({ geographies }) =>
						geographies.map((geo) => (
							<Geography
								key={geo.rsmKey}
								geography={geo}
								fill="#D0D5DD"
								fillOpacity={0.6}
								stroke="#D6D6DA"
								className="outline-none"
							/>
						))
					}
				</Geographies>
				{markers.map(({ name, coordinates }) => (
					<Marker key={name} coordinates={coordinates}>
						<circle
							r={5}
							fill="#A8CCCC"
							stroke="#A8CCCC"
							strokeWidth={15}
							strokeOpacity={0.3}
						/>
					</Marker>
				))}
			</ComposableMap>
		</>
	);
};

export default WorldMap;
