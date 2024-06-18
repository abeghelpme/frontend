export type Donation = {
	_id: string;
	reference: string;
	campaignId: string;
	donorEmail: string;
	donorName: string;
	amount: number;
	paymentStatus: string;
	paymentDate: string;
	paymentMeta?: object;
	hideDonorDetails: boolean;
	createdAt?: string;
	updatedAt?: string;
};
