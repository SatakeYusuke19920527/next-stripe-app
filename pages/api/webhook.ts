// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("🚀 ~ file: webhook.ts ~ line 12 ~ res", res)
  console.log("🚀 ~ file: webhook.ts ~ line 12 ~ req", req)
  res.status(200).json({ name: 'webhook 練習中' })
}
