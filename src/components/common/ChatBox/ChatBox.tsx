import FormTable from '../Form/FormTable/FormTable';
import { z } from 'zod';
import { Row } from '../Form/types';
import { useChatStore } from '../../../stores/chat/chatStore';
import { useSendMessage } from '../../../stores/chat/chatActions';

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
	const messages = useChatStore((s) => s.messages);
	const send = useSendMessage();
	return (
		<>
			<div className="w-80 h-80 bg-slate-500 ">
				<div className="chat h-full">
					{messages.map((message) => {
						return <li>{message.text}</li>;
					})}
				</div>
			</div>
			<FormTable
				schema={schema}
				rows={rows}
				onSubmit={(values, helpers) => {
					send(values.text);
					helpers.resetForm({ values: { text: '' } });
				}}
				submitButton={{ text: 'send', color: 'success' }}
			/>
		</>
	);
};

export default ChatBox;
