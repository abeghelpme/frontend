import type { Meta, StoryObj } from "@storybook/react";
import StackedAvatars from "@/components/StackedAvatars/stacked-avatars";

const meta: Meta<typeof StackedAvatars> = {
	title: "Design System/Components/StackedAvatars",
	component: StackedAvatars,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		users: {
			description: "User Object to which an avatar component is display for in the stack",
		},
		count: {
			type: "number",
			description: "Number of avatars to display on the stack",
		},
		isCircle: {
			description: "Should avatars be circular on the stack?",
		},
		hasBorder: {
			description: "Should avatar have border on the stack?",
		},
		size: {
			control: "object",
			description:
				"Size of the avatar component on the stack; `sm`, `base`, `lg` or any `number` value",
		},
		displayOthersCount: {
			description: "Should component show other number of user on the stack?",
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		users: [
			{
				name: "John Doe",
				img: "https://randomuser.me/api/portraits/men/75.jpg",
			},
			{
				name: "Jane Smith",
				img: "https://randomuser.me/api/portraits/women/75.jpg",
			},
			{
				name: "Bob Smith",
				img: "https://randomuser.me/api/portraits/men/76.jpg",
			},
			{
				name: "Alice Johnson",
				img: "https://randomuser.me/api/portraits/women/76.jpg",
			},
			{
				name: "Tom Brown",
				img: "https://randomuser.me/api/portraits/men/77.jpg",
			},
			{
				name: "Mary Johnson",
				img: "https://randomuser.me/api/portraits/women/77.jpg",
			},
			{
				name: "Peter Smith",
				img: "https://randomuser.me/api/portraits/men/78.jpg",
			},
		],
		isCircle: true,
		hasBorder: false,
		displayOthersCount: false,
	},
};

export const WithCustomCount: Story = {
	args: {
		...Primary.args,
		count: 3,
		displayOthersCount: true,
	},
};
