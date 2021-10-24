import useInput from '../use-input';

import { act, renderHook } from '@testing-library/react-hooks';

describe('Custom hook [useInput]', () => {
	test('Call a "valueChangehandler" and send a valid value', async () => {
		const { result } = renderHook(() => useInput<string>((value) => value.trim() !== ''));

		const inputText = 'Task 1';

		act(() => {
			result.current.valueChangeHandler(inputText);
		});

		expect(result.current.value).toBe(inputText);
		expect(result.current.isValid).toBe(true);
		expect(result.current.hasError).toBe(false);
	});

	test('Call a "valueChangehandler" and send a NOT valid value', () => {
		const { result } = renderHook(() => useInput<string>((value) => value.trim() !== ''));

		const inputText = '';

		act(() => {
			result.current.valueChangeHandler(inputText);
		});

		expect(result.current.value).toBe(inputText);
		expect(result.current.isValid).toBe(false);
		expect(result.current.hasError).toBe(true);
	});

	test('Call a "inputBlurHanlder" went a input dont have a value ', () => {
		const { result } = renderHook(() => useInput<string>((value) => value.trim() !== ''));

		act(() => {
			result.current.inputBlurHandler();
		});

		expect(result.current.value).toBe('');
		expect(result.current.isValid).toBe(false);
		expect(result.current.hasError).toBe(true);
	});

	test('Call a "inputBlurHanlder" went a input have a valid value', () => {
		const { result } = renderHook(() => useInput<string>((value) => value.trim() !== ''));

		const inputText = 'Task 1';

		act(() => {
			result.current.valueChangeHandler(inputText);
		});

		expect(result.current.value).toBe(inputText);
		expect(result.current.isValid).toBe(true);
		expect(result.current.hasError).toBe(false);

		act(() => {
			result.current.inputBlurHandler();
		});

		expect(result.current.value).toBe(inputText);
		expect(result.current.isValid).toBe(true);
		expect(result.current.hasError).toBe(false);
	});

	test('Call a "inputBlurHanlder" went a input have a NOT valid value', () => {
		const { result } = renderHook(() => useInput<string>((value) => value.trim() !== ''));

		const inputText = '';

		act(() => {
			result.current.valueChangeHandler(inputText);
		});

		expect(result.current.value).toBe(inputText);
		expect(result.current.isValid).toBe(false);
		expect(result.current.hasError).toBe(true);

		act(() => {
			result.current.inputBlurHandler();
		});

		expect(result.current.value).toBe(inputText);
		expect(result.current.isValid).toBe(false);
		expect(result.current.hasError).toBe(true);
	});

	test('Call a "reset" and clean all states', () => {
		const { result } = renderHook(() => useInput<string>((value) => value.trim() !== ''));

		const inputText = 'Task 1';

		act(() => {
			result.current.valueChangeHandler(inputText);
		});

		expect(result.current.value).toBe(inputText);
		expect(result.current.isValid).toBe(true);
		expect(result.current.hasError).toBe(false);

		act(() => {
			result.current.reset();
		});

		expect(result.current.value).toBe('');
		expect(result.current.isValid).toBe(false);
		expect(result.current.hasError).toBe(false);
	});
});
