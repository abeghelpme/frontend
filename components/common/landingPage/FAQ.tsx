import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib";


const FAQ = ({ className }: { className?: string }) => {
	const faqs = [
		{
			question: "How does AbegHelp.me work?",
			text: `Here's how fundraising on AbegHelp.me works: Tap 'Start fundraiser', answer a few questions, write your story, customize your fundraiser, and share it widely.\n
			You can add photos/videos, adjust your goal, and receive ongoing support. Start your AbegHelp.me fundraiser today!`,
		},
		{
			question: "What can I raise money for?",
			text: `
			We see people use AbegHelp.me to raise money for themselves, friends
			and family, or even complete strangers in random acts of kindness.
			People raise money for just about everything, including medical
			expenses, education costs, volunteer programs, youth sports, funerals
			& memorials, and even animals & pets.\nWe're always amazed at the ways people use AbegHelp.me to raise
			money. Check out some recent success stories, or see how AbegHelp.me
			works.`,
		},
		{
			question: "How does AbegHelp.me keep fundraisers safe?",
			text: `
			AbegHelp.me features the very best in secure payment encryption
			technology. Your donors' online payments are safe, and your money
			is stored securely until you're ready to request a withdrawal via
			electronic bank transfer.`,
		},
		{
			question: "Can a friend withdraw the money I raise for them?",
			text: `
			Yes. AbegHelp.me makes it easy for another friend or family member to
			securely access the funds you have raised. Through AbegHelp.me, they
			will receive direct access to the money you have raised. Please note:
			You will not be able to enter their bank information during the
			withdrawal process; they will need to do this themselves.`,
		},
		{
			question: "Are there any deadlines or time limits?",
			text: `
			While there are important withdrawals deadlines you'll need to
			observe to avoid donations being refunded to donors, your fundraiser
			will remain live until you choose to turn off donations or remove the
			fundraiser altogether. Most organizers leave their fundraisers active
			indefinitely to refer back to the kind comments and support they
			received.`,
		},
		{
			question: "What if I do not reach my goal?",
			text: `
			No problem. Reaching your goal is not required. With AbegHelp.me, you
			keep each and every donation you receive. Your fundraiser will be able
			to accept donations even after your goal is reached. Once the goal is
			reached, the progress meter on your fundraiser will show that you have
			received more than your goal amount. If you'd like to continue
			raising money, you can keep your fundraiser running for as long as
			you'd like.`,
		},
		{
			question: "How do I get donations?",
			text: `
			AbegHelp.me provides an easy way to raise money from your friends,
			family, and online community. Our platform makes it simple to share your
			fundraiser in a variety of ways to bring in donations, track your
			progress, and post updates to engage your community.`,
		},
		{
			question: "Is my country supported?",
			text: `
			We are currently supporting 17 African countries. We are working on
			expanding our support to more countries.`,
		},
	];
	return (
		<div
			className={cn(
				"flex flex-col gap-6 px-5 md:px-20 py-10 md:py-20 items-center",
				className
			)}
			id="faq"
		>
			<h1 className="text-4xl md:text-5xl font-semibold">FAQs</h1>
			<p className="text-base md:text-lg">
				Need something cleared up? Here are our most frequently asked questions.
			</p>
			<Accordion type="single" collapsible className="w-full  max-w-[900px] ">
				{faqs.map((faq, id) => {
					return (
						<AccordionItem
							value={`item-${id}`}
							className="rounded-lg overflow-hidden [&[data-state=open]]:bg-[#F7F7F7] p-5 text-[#475467]"
						>
							<AccordionTrigger className="[&[data-state=open]]:bg-[#F7F7F7] text-base md:text-lg font-semibold">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className="bg-[#F7F7F7] text-base md:text-lg">
								{faq.text}
							</AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>
		</div>
	);
};

export default FAQ;
