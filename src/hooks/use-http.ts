import { useReducer, useCallback } from 'react';

enum ACTION_TYPE {
	SEND = 'SEND',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}

enum STATUS_TYPE {
	PENDING = 'PENDING',
	COMPLETED = 'COMPLETED',
}

type HttpAction = {
	type: ACTION_TYPE.SEND | ACTION_TYPE.SUCCESS | ACTION_TYPE.ERROR;
	payload?: {
		data: [];
		errorMessage: string;
	};
};

type HttpState = {
	status: STATUS_TYPE;
	data: null | [];
	error: string | null;
};

const httpReducer = (state: HttpState, action: HttpAction) => {
	const { type, payload } = action;
	if (type === ACTION_TYPE.SEND) {
		return {
			data: null,
			error: null,
			status: STATUS_TYPE.PENDING,
		};
	}
	if (payload) {
		if (type === ACTION_TYPE.SUCCESS) {
			return {
				data: payload.data,
				error: null,
				status: STATUS_TYPE.COMPLETED,
			};
		}

		if (type === ACTION_TYPE.ERROR) {
			return {
				data: payload.data,
				error: payload.errorMessage,
				status: STATUS_TYPE.COMPLETED,
			};
		}
	}

	return state;
};

const useHttp = (requestFunction: () => Promise<{ success: boolean; data: [] }>) => {
	const [httpState, dispatch] = useReducer(httpReducer, {
		status: STATUS_TYPE.PENDING,
		data: null,
		error: null,
	});

	const sendRequest = useCallback(
		async function () {
			dispatch({ type: ACTION_TYPE.SEND });

			const responseData = await requestFunction();
			if (!responseData.success) {
				dispatch({
					type: ACTION_TYPE.ERROR,
					payload: {
						data: [],
						errorMessage: 'Something went wrong',
					},
				});
				return;
			}
			dispatch({
				type: ACTION_TYPE.SUCCESS,
				payload: {
					data: responseData.data,
					errorMessage: '',
				},
			});
		},
		[requestFunction],
	);

	return {
		sendRequest,
		...httpState,
	};
};

export default useHttp;
