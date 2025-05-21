export function generateOTP(numberOfDigits: number) {
	const digits = "0123456789";
	let OTP = "";
	const len = digits.length;
	for (let i = 0; i < numberOfDigits; i++) {
		OTP += digits[Math.floor(Math.random() * len)];
	}

	return OTP;
}
