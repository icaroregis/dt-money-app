import { TransactionCardType } from '..';
import { TransactionType } from '@/components/TransactionTypeSelector';

interface CardData {
  label: string;
  bgClass: string;
  prefixLabel: string;
}
export const CARD_DATA: Record<TransactionCardType, CardData> = {
  [TransactionType.REVENUE]: {
    label: 'Entradas',
    bgClass: 'bg-background-tertiary',
    prefixLabel: 'Última entrada em',
  },
  [TransactionType.EXPENSE]: {
    label: 'Saídas',
    bgClass: 'bg-background-tertiary',
    prefixLabel: 'Última saída em',
  },
  total: {
    label: 'Total',
    bgClass: 'bg-accent-brand-background-primary',
    prefixLabel: 'Última transação em',
  },
};
