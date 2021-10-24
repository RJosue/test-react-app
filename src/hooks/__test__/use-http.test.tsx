import useHttp from '../use-http';

import { act, renderHook } from '@testing-library/react-hooks';
import { getAllContacts } from '../../lib/api';
import { waitFor } from '@testing-library/dom';

describe('Custom Hook [useHttp]', () => {
	test('return a initial state', () => {
		const { result } = renderHook(() => useHttp(getAllContacts));

		act(() => {
			result.current.sendRequest();
		});

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
		expect(result.current.status).toBe('PENDING');
		expect(result.current.data).toBe(null);
		expect(result.current.error).toBe(null);
	});

	test('return a success state with data', async () => {
		const { result } = renderHook(() => useHttp(getAllContacts));

		expect(result.current.status).toBe('PENDING');
		expect(result.current.data).toBe(null);
		expect(result.current.error).toBe(null);

		act(() => {
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
			result.current.sendRequest();
		});


		await act(() => waitFor(() => {}, { timeout: 500 }));

		expect(result.current.status).toBe('COMPLETED');
		expect(result.current.data).not.toHaveLength(0);
		expect(result.current.error).toBe(null);
	});

	test('return a error state without data', async () => {
		const { result } = renderHook(() => useHttp(getAllContacts));

		act(() => {
			global.fetch = jest.fn().mockImplementation(() =>
				Promise.resolve({
					json: () => Promise.reject(),
				}),
			);
			result.current.sendRequest();
		});


		expect(result.current.status).toBe('PENDING');
		expect(result.current.data).toBe(null);
		expect(result.current.error).toBe(null);

		await act(() => waitFor(() => {}, { timeout: 500 }));

		expect(result.current.status).toBe('COMPLETED');
		expect(result.current.data).toHaveLength(0);
		expect(result.current.error).not.toBeNull();
	});
});
