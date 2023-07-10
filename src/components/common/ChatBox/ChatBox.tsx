import { useRef } from 'react';
import moment from 'moment';
import { z } from 'zod';
import FormTable from '../Form/FormTable/FormTable';
import { Row } from '../Form/types';
import { useChatStore } from '../../../stores/chat/chatStore';
import { useLoadMessages, useSendMessage } from '../../../stores/chat/chatActions';
import { useLobbyStore } from '../../../stores/lobby/lobbyStore';
import { getVerticalScrollPercentage, useOnScroll, useOnScrollEnd } from '../../../hooks/scrollBarHooks';
import { ChatMessage } from './ChatMessage';
import { ChatDateLabel } from './ChatDateLabel';

const schema = z.object({ text: z.string() });
const rows: Row<typeof schema>[] = [
	{
		fields: [
			{
				type: 'text',
				field: {
					id: 'text',
					label: 'Message',
					defaultVal: ''
				}
			}
		]
	}
];

const ChatBox = () => {
	const players = useLobbyStore((s) => s.lobby?.players);
	const loadMessages = useLoadMessages();
	const messages = useChatStore((s) => s.messages);
	const canLoadMessages = useChatStore((s) => !s.loadedHistoric && !s.isLoading);
	const chatBoxRef = useRef<HTMLUListElement>(null);

	// since were passing an unstable callback this will run every render which is ideal since when we get a new message we render
	useOnScrollEnd(chatBoxRef, (ele) => {
		ele.scrollTop = ele.scrollHeight;
	});

	useOnScroll(chatBoxRef, (e: HTMLElement) => {
		if (messages.length === 0 || !canLoadMessages) return;
		const percent = getVerticalScrollPercentage(e);
		// if in top 20% of scroll load more messages
		if (percent > 20) return;
		loadMessages(messages[0].timestamp);
	});

	const send = useSendMessage();
	return (
		<div className="h-full bg-white rounded p-1">
			<div className="w-full h-4/6 bg-slate-100 border border-solid border-slate rounded mb-2">
				<ul ref={chatBoxRef} className="chat h-full overflow-auto px-2 divide-y	">
					{messages.map((message, i) => {
						const player = players?.find((player) => player.id === message.playerId);
						if (!player) return null;
						const momentTime = moment.unix(message.timestamp);
						const date = momentTime.format('DD/MM/YYYY');
						const prevDate = messages[i - 1] ? moment.unix(messages[i - 1].timestamp).format('DD/MM/YYYY') : undefined;
						const dateLabel = prevDate !== date ? <ChatDateLabel date={date} /> : null;
						return (
							<li key={i} className={'py-1 group'}>
								{dateLabel}
								<ChatMessage text={message.text} planerName={player.name} time={momentTime.format('hh:mm')} />
							</li>
						);
					})}
				</ul>
			</div>
			<FormTable
				schema={schema}
				rows={rows}
				onSubmit={(values, helpers) => {
					send(values.text);
					helpers.resetForm({ values: { text: '' } });
				}}
			/>
		</div>
	);
};

export default ChatBox;
