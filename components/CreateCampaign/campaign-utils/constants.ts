export const targetCountries = [
	"Nigeria",
	"Ghana",
	"Mali",
	"Liberia",
	"Cameroon",
	"Gambia",
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const MAX_FILES_QUANTITY = 5;

export const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

export const acceptedFilesString = allowedFileTypes.join(", ");

export const DATE_TOMORROW = new Date(
	new Date().setDate(new Date().getDate() + 1)
);
