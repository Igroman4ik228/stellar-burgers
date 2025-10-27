import { TOrdersData } from '@utils-types';

export type TFeedState = TOrdersData & {
  isLoading: boolean;
  error: string | null;
};
