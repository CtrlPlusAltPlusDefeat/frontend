import { useCallback } from 'react';
import { SocketMessage } from '../../types/socket/receive';
import { wrapMessage } from '../../types/socket/send';

export const useSend = (ws: WebSocket | null) => {
	return useCallback(
		(msg: SocketMessage) => {
			if (!ws) {
				console.error('Not connected to socket, cannot send data');
				return;
			}
			ws.send(wrapMessage(msg));
		},
		[ws]
	);
};
