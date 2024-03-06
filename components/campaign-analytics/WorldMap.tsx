import {
	ComposableMap,
	Geographies,
	Geography,
	Marker,
} from "react-simple-maps";

type CountriesMap = {
	[key: string]: { coordinates: [number, number] };
};

const Countries: CountriesMap = {
	Nigeria: {
		coordinates: [9.0563, 7.4985],
	},
	Ghana: {
		coordinates: [7.9465, 1.0232],
	},
	Mali: {
		coordinates: [17.5707, 3.9962],
	},
	Liberia: {
		coordinates: [6.4281, 9.4295],
	},
	Cameroon: {
		coordinates: [7.3697, 12.3547],
	},
	Gambia: {
		coordinates: [13.4432, 15.3101],
	},
};

const WorldMap = ({ countries }: { countries?: string[] }) => {
	return (
		<>
			<ComposableMap
				projectionConfig={{ scale: 250 }}
				className="aspect-video w-[100%] lg:w-[50%] "
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
				{countries?.map((name) => (
					<Marker key={name} coordinates={Countries[name].coordinates}>
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
