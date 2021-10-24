import { render, screen } from '@testing-library/react';
import Contacts from '../Contacts';

describe('Contacts Component', () => {
	test('renders contacts if request succeeds', async () => {
		global.fetch = jest.fn().mockImplementation(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve([
						{
							createdAt: '2021-10-22T12:13:22.338Z',
							name: 'Pauline Blanda',
							avatar: 'https://cdn.fakercloud.com/avatars/mkginfo_128.jpg',
							id: '1',
						},
					]),
			}),
		);

		render(<Contacts />);

		const listContacts = await screen.findAllByRole('listitem');

		expect(listContacts).not.toHaveLength(0);
	});

	test('renders a messge error if request failed', async () => {
		global.fetch = jest.fn().mockImplementation(() =>
			Promise.resolve({
				json: () =>
					Promise.reject(),
			}),
		);

		render(<Contacts />);

		const listContacts = await screen.findByTestId('error-message');

		expect(listContacts).toBeInTheDocument();
	});
});
