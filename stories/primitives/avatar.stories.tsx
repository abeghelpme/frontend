import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "@/components/primitives/Avatar/avatar";

const meta: Meta<typeof Avatar> = {
  title: "Design System/Primitives/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "object",
      description:
        "Size of the avatar component; `sm`, `base`, `lg` or any `number` value",
    },
    isCircle: {
      description: "Should avatar be circular?",
    },
    hasBorder: {
      description: "Should avatar have border?",
    },
    src: {
      description: "Avatar Image URL",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: "base",
    isCircle: true,
    hasBorder: false,
    initials: "OL",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
  },
};

export const WithNumberSize: Story = {
  args: {
    ...Primary.args,
    size: 100,
    hasBorder: true,
  },
};

export const WithInitialsFallback: Story = {
  args: {
    ...WithNumberSize.args,
    size: 50,
    src: "https://images.unsplash.com/photo-158fHx8&auto=format&fit=crop&w=1064&q=80",
  },
};
