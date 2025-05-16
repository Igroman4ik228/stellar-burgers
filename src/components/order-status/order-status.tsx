import { OrderStatusUI } from '@ui';
import { FC } from 'react';
import { OrderStatusProps } from './type';

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  // const statusText: { [key: string]: string } = {
  //   pending: 'Готовится',
  //   done: 'Выполнен',
  //   created: 'Создан'
  // };

  let textStyle = '';
  let text = '';
  switch (status) {
    case 'pending':
      textStyle = '#E52B1A';
      text = 'Готовится';
      break;
    case 'done':
      textStyle = '#00CCCC';
      text = 'Выполнен';
      break;
    default:
      textStyle = '#F2F2F3';
      text = 'Создан';
      break;
  }

  return <OrderStatusUI textStyle={textStyle} text={text} />;
};
