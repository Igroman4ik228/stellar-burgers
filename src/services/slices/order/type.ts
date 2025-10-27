import { TOrder } from '@utils-types';

export type TOrderState = {
  newOrderData: TOrder | null;
  newOrderIsLoading: boolean;
  newOrderError: string | null;
  orderByNumber: TOrder | null;
  orderByNumberIsLoading: boolean;
  orderByNumberError: string | null;
};
