import React, { useCallback } from 'react';
import { SocketMessage } from '../../types/socket/receive';
import { wrapMessage } from '../../types/socket/send';
import { devTools } from '../../common/devTools';

export const useSend = (ws: React.MutableRefObject<WebSocket | null>) => {
	return useCallback(
		(msg: SocketMessage) => {
			if (!ws.current) {
				console.error('Not connected to socket, cannot send data');
				return;
			}
			devTools.log(`sending ${msg.service}|${msg.action}`, msg.data);
			ws.current.send(wrapMessage(msg));
		},
		[ws]
	);
};
