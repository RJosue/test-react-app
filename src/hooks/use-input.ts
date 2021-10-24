import { useState } from 'react';

const useInput = <T>(functionValidate: (value: T | string) => boolean) => {
	const [enteredValue, setEnteredValue] = useState<T | string>('');
	const [isTouched, setIstouched] = useState(false);

	const valueIsValid = functionValidate(enteredValue);
	const inputHasError = !valueIsValid && isTouched;

	const valueChangeHandler = (value: T) => {
		setEnteredValue(value);
		setIstouched(true);
	};

	const inputBlurHandler = () => {
		setIstouched(true);
	};

	const reset = () => {
		setEnteredValue('');
		setIstouched(false);
	};

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError: inputHasError,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	};
};

export default useInput;
