import React from "react";
import {
	ComposableMap,
	Geographies,
	Geography,
	Marker,
} from "react-simple-maps";

type Markers = {
	markerOffset: number;
	name: string;
	coordinates: [number, number];
};

const markers: Markers[] = [
	{ markerOffset: 5, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
	{ markerOffset: 5, name: "Santiago", coordinates: [-70.6693, -33.4489] },
	{ markerOffset: 5, name: "Quito", coordinates: [-78.4678, -0.1807] },
	{ markerOffset: 5, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
	{ markerOffset: 5, name: "Paramaribo", coordinates: [-55.2038, 5.852] },
	{ markerOffset: 5, name: "Lima", coordinates: [-77.0428, -12.0464] },
	{ markerOffset: 5, name: "Nigeria", coordinates: [9.0563, 7.4985] },
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
