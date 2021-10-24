export async function getAllContacts() {
	try {
		const response = await fetch(`https://6172cfe5110a740017222e2b.mockapi.io/elements`);
		const data = await response.json();

		return {
			success: true,
			data,
		};
	} catch (error) {
		return {
			success: false,
			data: [],
		};
	}
}
