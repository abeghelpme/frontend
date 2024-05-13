export const getDaysLeft = (deadlineTime: any) => {
	const deadline: any = new Date(deadlineTime);
	const currentTime: any = new Date();
	const deadlineTimeFinal = deadline.getTime() - currentTime.getTime();
	const final = Math.floor(deadlineTimeFinal / (1000 * 60 * 60 * 24));
	return final;
};
