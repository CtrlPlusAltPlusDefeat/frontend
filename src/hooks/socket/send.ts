import React, { useCallback } from 'react';
import { SocketMessage } from '../../types/socket/receive';
import { wrapMessage } from '../../types/socket/send';

export const useSend = (ws: React.MutableRefObject<WebSocket | null>) => {
	return useCallback(
		(msg: SocketMessage) => {
			console.log('ws', ws);
			if (!ws.current) {
				console.error('Not connected to socket, cannot send data');
				return;
			}
			ws.current.send(wrapMessage(msg));
		},
		[ws]
	);
};
