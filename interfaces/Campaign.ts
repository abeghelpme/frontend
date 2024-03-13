import type { targetCountries } from "@/lib/helpers/campaign";
import type { Prettify } from "@/lib/type-helpers";

export type Creator = Prettify<{
	_id: string;
	firstName: string;
	lastName: string;
}>;

export type Category = Prettify<{
	isDeleted: boolean;
	_id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}>;

export type Image = Prettify<{
	secureUrl: string;
	blurHash: string;
	_id: string;
}>;

export type Campaign = {
	_id: string;
	creator: Creator | null;
	status: "Draft" | "In Review" | "Approved" | "Rejected";
	category: Category | null;
	currentStep: 1 | 2 | 3;
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
	currentStep: 1 | 2 | 3;
	isPublished: boolean;
	categoryId?: string;
	photos: Image[];
	blobs?: File[];
};
