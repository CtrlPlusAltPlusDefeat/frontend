export const useDevTools = import.meta.env.MODE === 'development';
export const devTools = {
	log: (message?: any, ...params: any[]) => {
		if (!useDevTools) return;
		console.log(message, params);
	}
};
