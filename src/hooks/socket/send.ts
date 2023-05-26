import React, { Dispatch, useCallback } from 'react';
import { SocketMessage } from '../../types/socket/receive';
import { wrapMessage } from '../../types/socket/send';
import { devTools } from '../../common/devTools';

export const useSend = (ws: React.MutableRefObject<WebSocket | null>, setLoading?: Dispatch<boolean>) => {
	return useCallback(
		(msg: SocketMessage, waitForResponse: boolean = false) => {
			if (!ws.current) {
				console.error('Not connected to socket, cannot send data');
				return;
			}

			if (setLoading && waitForResponse) setLoading(true);

			devTools.log(`sending ${msg.service}|${msg.action}`, msg.data);
			ws.current.send(wrapMessage(msg));
		},
		[setLoading, ws]
	);
};
