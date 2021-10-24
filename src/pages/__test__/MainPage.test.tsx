import { render, screen } from '@testing-library/react';
import MainPage from '../MainPage';

describe('Main Page Component', () => {
	test('renders button task', async () => {
		render(<MainPage />);

		const btnTask = screen.getByTestId('btn-task');
		expect(btnTask).toBeInTheDocument();
	});

	test('renders button contacts', async () => {
		render(<MainPage />);

		const btnTask = screen.getByTestId('btn-contacts');
		expect(btnTask).toBeInTheDocument();
	});
});
