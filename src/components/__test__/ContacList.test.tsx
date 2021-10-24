import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import ContactsList from '../contacts/ContactsList';

describe('Contact List', () => {
	test('render correct data', () => {
		const name = 'Pauline Blanda';
		const description = '2021-10-22T12:13:22.338Z';
		const logo = 'https://cdn.fakercloud.com/avatars/mkginfo_128.jpg';

		render(<ContactsList logo={logo} name={name} description={description} />);

		expect(screen.getByText(name)).toBeInTheDocument();
		expect(screen.getByText(description)).toBeInTheDocument();
		expect(screen.getByRole('img')).toHaveAttribute('src', logo);
	});
});
