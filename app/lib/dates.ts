export function calculateTimeSinceAdded(date: Date) {
	const now = new Date();
	const diffInSeconds = Math.floor((now - date) / 1000);
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	const diffInHours = Math.floor(diffInMinutes / 60);
	const diffInDays = Math.floor(diffInHours / 24);
	const diffInMonths = Math.floor(diffInDays / 30.44);
	const diffInYears = Math.floor(diffInDays / 365.25);

	if (diffInYears > 0) {
		return `${diffInYears} yrs`;
	}
	if (diffInMonths > 0) {
		return `${diffInMonths} mnths`;
	}
	if (diffInDays > 0) {
		return `${diffInDays} dys`;
	}
	if (diffInHours > 0) {
		return `${diffInHours} hrs`;
	}
	if (diffInMinutes > 0) {
		return `${diffInMinutes} mins`;
	}
	return `${diffInSeconds} secs`;
}
