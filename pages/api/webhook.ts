import type { NextApiRequest, NextApiResponse } from 'next'
const log4js = require('log4js')
log4js.configure({
appenders : {
system : {type : 'file', filename : 'system.log'}
},
categories : {
default : {appenders : ['system'], level : 'debug'},
}
});
const logger = log4js.getLogger('system');

logger.debug('Hello world!');
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  logger.debug('Hello world!');
  // 同期で行う場合
  try {
    logger.debug('************************************write start************************************');
    logger.debug(req);
    logger.debug('************************************write end************************************');
  }catch(e){
    console.log(e);
  }
  res.status(200).json({ name: 'webhook 練習中' })
};
