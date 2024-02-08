export const targetCountries = [
	"Nigeria",
	"Ghana",
	"Mali",
	"Liberia",
	"Cameroon",
	"Gambia",
];

export const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

export const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

export const acceptedFilesString = allowedFileTypes.join(", ");

export const DATE_TOMORROW = new Date(
	new Date().setDate(new Date().getDate() + 1)
);
