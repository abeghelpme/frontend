import For from "./For";

function useElementList(type: "base"): [typeof For.Base];
function useElementList(type?: "withWrapper"): [typeof For.List];

function useElementList(type = "withWrapper") {
	return type === "withWrapper" ? [For.List] : [For.Base];
}

export { useElementList };
