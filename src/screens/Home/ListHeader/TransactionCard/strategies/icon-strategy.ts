import { colors } from '@/shared/colors';
import { TransactionCardType } from '..';
import { MaterialIcons } from '@expo/vector-icons';
import { TransactionType } from '@/components/TransactionTypeSelector';

interface IconsData {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
}

export const ICONS: Record<TransactionCardType, IconsData> = {
  [TransactionType.REVENUE]: {
    color: colors['accent-brand-light'],
    name: 'arrow-circle-up',
  },
  [TransactionType.EXPENSE]: {
    color: colors['accent-red'],
    name: 'arrow-circle-down',
  },
  total: {
    color: colors.white,
    name: 'attach-money',
  },
};
