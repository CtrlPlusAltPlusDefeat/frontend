import React, { useCallback, useEffect } from 'react';

export const useOnScrollEnd = (ele: React.RefObject<HTMLElement>, callback: (ele: HTMLElement) => void) => {
	const scroll = (ele.current?.scrollTop ?? 0) + (ele.current?.offsetHeight ?? 0);
	const scrollHeight = ele.current?.scrollHeight ?? 0;
	const isEnd = scroll >= scrollHeight - 10;
	useEffect(() => {
		if (!ele.current) return;
		if (isEnd) callback(ele.current);
	}, [ele, callback, scroll, scrollHeight, isEnd]);
};

export const getVerticalScrollPercentage = (elm: HTMLElement) => {
	return (elm.scrollTop / (elm.scrollHeight - elm.clientHeight)) * 100;
};

export const useOnScroll = (ele: React.RefObject<HTMLElement>, callback: (e: HTMLElement) => void) => {
	const scrollingRef = React.useRef<boolean>(false);

	const onScrollCallback = useCallback(() => {
		if (scrollingRef.current) return;
		scrollingRef.current = true;
	}, []);

	useEffect(() => {
		if (!ele.current) return;
		const htmlElement = ele.current;
		htmlElement.addEventListener('scroll', onScrollCallback);
		return () => {
			htmlElement.removeEventListener('scroll', onScrollCallback);
		};
	}, [callback, ele, onScrollCallback]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (!scrollingRef.current || !ele.current) return;
			scrollingRef.current = false;
			callback(ele.current);
		}, 500);
		return () => {
			clearInterval(interval);
		};
	}, [callback, ele]);
};
