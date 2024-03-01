import type { Prettify } from "@/lib/type-helpers";
import type { FormStore } from "@/store/formStore";

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
	creator: Creator;
	status: string;
	category: Category;
	country: string;
	createdAt: string;
	featured: boolean;
	flaggedReasons: string[];
	images: Image[];
	isFlagged: boolean;
	tags: string[];
	updatedAt: string;
	deadline: string;
	fundraiser: FormStore["stepTwoData"]["fundraiser"];
	goal: number;
	title: string;
	story: string;
	storyHtml: string;
	url: string;
};
