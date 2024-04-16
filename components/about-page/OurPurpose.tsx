import React, { useState } from "react";

const OurPurpose = () => {
	const [activeTab, setActiveTab] = useState("mission");

	// Define the content for each tab
	const renderTabContent = () => {
		switch (activeTab) {
			case "mission":
				return (
					<div className="space-y-10">
						<p>
							Our mission is to make a positive impact on people's lives by
							providing support and resources to those in need. We strive to
							empower individuals and communities to achieve their full
							potential and lead fulfilling lives.
						</p>
						<ul className="list-disc ml-5 pl-5">
							<li>
								Provide access to education and training for underprivileged
								communities
							</li>
							<li>
								Offer support and counseling for mental health and well-being
							</li>
							<li>Promote sustainability and environmental stewardship</li>
							<li>
								Foster a culture of kindness and inclusivity in our society
							</li>
						</ul>
					</div>
				);
			case "vision":
				return (
					<div className="space-y-10">
						<p>
							Our vision is to create a world where everyone has equal
							opportunities to succeed and thrive. We envision a society that is
							compassionate, inclusive, and sustainable, where every
							individual's unique potential is nurtured and celebrated.
						</p>
						<ul className="list-disc ml-5 pl-5">
							<li>
								Achieve equal access to quality education and healthcare for all
							</li>
							<li>
								Build strong, inclusive communities that celebrate diversity
							</li>
							<li>
								Lead efforts in sustainability and environmental conservation
							</li>
							<li>Promote innovation and progress through collaboration</li>
						</ul>
					</div>
				);
			case "goals":
				return (
					<div className="space-y-10">
						<p>
							Our goals are to make a lasting and measurable impact on the lives
							of the people we serve. We aim to improve quality of life, advance
							knowledge and skills, and promote a sustainable future for all.
						</p>
						<ul className="list-disc ml-5 pl-5">
							<li>Increase access to education and job training programs</li>
							<li>
								Provide mental health resources and support to individuals in
								need
							</li>
							<li>
								Implement community development and sustainability initiatives
							</li>
							<li>
								Build strong partnerships with local organizations and
								stakeholders
							</li>
						</ul>
					</div>
				);
			default:
				return null;
		}
	};
	return (
		<>
			<div className="flex flex-col lg:grid lg:grid-cols-3 gap-5">
				<div
					className={`relative cursor-pointer p-3 text-white px-5 text-center ${
						activeTab === "mission" ? "bg-abeg-primary" : "bg-abeg-avatar"
					}`}
					onClick={() => setActiveTab("mission")}
				>
					<span
						className={`absolute h-5 w-5 right-0 top-0 ${
							activeTab === "mission" ? "bg-abeg-avatar" : "bg-abeg-primary"
						}`}
					></span>
					<span>Our Mission</span>
				</div>
				<div
					className={`relative cursor-pointer p-3 text-white px-5 text-center ${
						activeTab === "vision" ? "bg-abeg-primary" : "bg-abeg-avatar"
					}`}
					onClick={() => setActiveTab("vision")}
				>
					<span
						className={`absolute h-5 w-5 right-0 top-0 ${
							activeTab === "vision" ? "bg-abeg-avatar" : "bg-abeg-primary"
						}`}
					></span>
					<span>Our Vision</span>
				</div>
				<div
					className={`relative cursor-pointer p-3 text-white px-5 text-center ${
						activeTab === "goals" ? "bg-abeg-primary" : "bg-abeg-avatar"
					}`}
					onClick={() => setActiveTab("goals")}
				>
					<span
						className={`absolute h-5 w-5 right-0 top-0 ${
							activeTab === "goals" ? "bg-abeg-avatar" : "bg-abeg-primary"
						}`}
					></span>
					<span>Our Goals</span>
				</div>
			</div>

			{/* Tab Content */}
			<div className="pt-5">{renderTabContent()}</div>
		</>
	);
};
export default OurPurpose;
