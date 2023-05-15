import { Middleware } from './configureRoutes';
import { isError } from '../../../types/socket/receive';
import { toast } from 'react-toastify';

export const handleError: Middleware = (next) => {
	return (payload) => {
		console.log('handleError', payload);
		if (isError(payload)) {
			console.error('Socket error:', payload.service, '|', payload.action, '.', payload.data.error);
			toast.error(payload.data.error);
			return undefined;
		}
		next(payload);
	};
};
