import { TOrder } from '@utils-types';

export type TOrdersState = {
  data: TOrder[];
  isLoading: boolean;
  error: string | null;
};
