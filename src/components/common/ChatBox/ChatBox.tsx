import FormTable from '../Form/FormTable/FormTable';
import { z } from 'zod';
import { Row } from '../Form/types';
import { useChatStore } from '../../../stores/chat/chatStore';
import { useSendMessage } from '../../../stores/chat/chatActions';
import { useLobbyStore } from '../../../stores/lobby/lobbyStore';
import moment from 'moment';

const schema = z.object({ text: z.string() });
const rows: Row<typeof schema>[] = [
	{
		fields: [
			{
				type: 'text',
				field: {
					id: 'text',
					label: 'Message',
					default: ''
				}
			}
		]
	}
];

const ChatBox = () => {
	const players = useLobbyStore((s) => s.lobby?.players);
	const messages = useChatStore((s) => s.messages);
	const send = useSendMessage();
	return (
		<div className="h-full bg-white rounded p-1">
			<div className="w-full h-4/6 bg-slate-100 border border-solid border-slate rounded mb-2">
				<ul className="chat h-full overflow-auto pl-2 divide-y	">
					{messages.map((message, i) => {
						const player = players?.find((player) => player.id === message.sender);

						return (
							<li key={i} className={' py-2'}>
								<div className={'inline pr-3 text-slate-600'}>
									{moment(message.date).format('hh:mm')} {player?.name}
								</div>
								<div className={'inline'}>{message.text}</div>
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
