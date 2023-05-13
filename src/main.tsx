import React from 'react';
import ReactDOM from 'react-dom/client';
import { WebsocketProvider } from './contexts/WebSocketContext';
import { ModalProvider } from './components/common/Modal/ModalContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<WebsocketProvider>
		<React.StrictMode>
			<ModalProvider>
				<App />
			</ModalProvider>
		</React.StrictMode>
	</WebsocketProvider>
);
