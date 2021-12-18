import { NextApiResponse } from 'next'
import * as line from '@line/bot-sdk';

console.log(process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN!)

const config = {
  channelAccessToken: process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN!,
  channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET!
};

const client = new line.Client(config);

// broadcast(messages: Message | Message[], notificationDisabled: boolean = false): Promise < MessageAPIResponseBase >
// multicast(to: string[], messages: Message | Message[], notificationDisabled: boolean = false): Promise<MessageAPIResponseBase>

export default async ({ query: { word } }: { query: { word: string } }, res: NextApiResponse) => {
  console.info('res data', word)
  const ids = await client.getRoomMemberIds('')
  console.log("🚀 ~ test file: narrow.ts ~ line 12 ~ client", ids)
  client.multicast(['user_id_1', 'user_id_2', 'room_id_1'], {
  type: 'text',
  text: 'hello, world',
}).then(data => console.log(data))
    .catch(e => console.log(e))
  res.status(200).json({ message: `you requested for ${word} ` });
};