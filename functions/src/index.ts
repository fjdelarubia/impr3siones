import * as functions from 'firebase-functions';
import { Order, OrderStatus } from '@impr3siones/models';
import { leftPadding } from '@impr3siones/utils';

export const helloWorld = functions.region('europe-west3').https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  const o: Order = { id: leftPadding(1, 0, 5), status: OrderStatus.Pending };
  response.send(`Hello from Firebase! order: ${o.id}`);

});
