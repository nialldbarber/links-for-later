export function calculateTimeSinceAdded(date: Date) {
	const now = new Date();
	const diffInSeconds = Math.floor((now - date) / 1000);
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	const diffInHours = Math.floor(diffInMinutes / 60);
	const diffInDays = Math.floor(diffInHours / 24);
	const diffInMonths = Math.floor(diffInDays / 30.44); // Average number of days in a month
	const diffInYears = Math.floor(diffInDays / 365.25); // Account for leap years

	if (diffInYears > 0) {
		return `${diffInYears} year(s)`;
	}
	if (diffInMonths > 0) {
		return `${diffInMonths} month(s)`;
	}
	if (diffInDays > 0) {
		return `${diffInDays} day(s)`;
	}
	if (diffInHours > 0) {
		return `${diffInHours} hour(s)`;
	}
	if (diffInMinutes > 0) {
		return `${diffInMinutes} minute(s)`;
	}
	return `${diffInSeconds} second(s)`;
}
