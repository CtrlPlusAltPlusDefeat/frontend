import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
				<ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
			</ModalProvider>
		</React.StrictMode>
	</WebsocketProvider>
);
