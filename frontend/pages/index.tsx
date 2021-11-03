import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Order, OrderStatus } from '@impr3siones/models';
import { leftPadding, completeOrder } from '@impr3siones/utils';
import { useState } from 'react';

const SOME_ORDERS: Order[] = Array.from({ length: 10 }).map((el, index) => ({
  id: `${leftPadding(index + 1, 0, 5)}`,
  status: OrderStatus.Ready
}));

interface OrderProps {
  order: Order;
  handleOrderCompleted: (order: Order) => void;
}

const OrderItem: React.FC<OrderProps> = ({ order, handleOrderCompleted }) => (
  <li>
    {order.id} - {order.status}{' '}
    {order.status !== OrderStatus.Completed && (
      <button onClick={() => handleOrderCompleted(order)}>Completar</button>
    )}
  </li>
);

const Home: NextPage = () => {
  const [orders, setOrders] = useState(SOME_ORDERS);

  const handleOrderCompleted = (order: Order) => {
    completeOrder(order);
    setOrders([...orders]);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Impr3siones</title>
        <meta
          name="description"
          content="Te imprimo en 3d todo lo que necesites"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Bienvenido a impr3siones</h1>

        <h3>Lista de pedidos</h3>
        <ul className={styles.orderList}>
          {orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              handleOrderCompleted={handleOrderCompleted}
            />
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>Let&apos;s do this!</footer>
    </div>
  );
};

export default Home;