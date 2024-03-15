import type { targetCountries } from "@/lib/helpers/campaign";
import type { Prettify } from "@/lib/type-helpers";

type Creator = Prettify<{
	_id: string;
	firstName: string;
	lastName: string;
}>;

type Category = Prettify<{
	isDeleted: boolean;
	_id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}>;

type Image = Prettify<{
	secureUrl: string;
	blurHash: string;
	_id: string;
}>;

export type Campaign = {
	_id: string;
	creator: Creator | null;
	status: string;
	category: Category | null;
	country: (typeof targetCountries)[number];
	createdAt: string;
	featured: boolean;
	flaggedReasons: string[];
	images: Image[];
	isFlagged: boolean;
	isPublished: boolean;
	tags: string[];
	updatedAt: string;
	deadline: string;
	fundraiser: "INDIVIDUAL" | "BENEFICIARY";
	goal: number;
	title: string;
	story: string;
	storyHtml: string;
	url: string;
};
