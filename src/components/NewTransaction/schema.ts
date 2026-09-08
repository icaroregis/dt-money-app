import * as yup from 'yup';
import { TransactionType } from '@/shared/enums/transaction-type';

export const newTransactionSchema = yup.object().shape({
  description: yup.string().required('Descrição é obrigatória'),
  typeId: yup
    .number()
    .typeError('Tipo é obrigatório')
    .required('Tipo é obrigatório')
    .oneOf(
      [TransactionType.REVENUE, TransactionType.EXPENSE],
      'Selecione um tipo válido (Entrada ou Saída)'
    ),
  categoryId: yup.number().typeError('Categoria é obrigatória').required('Categoria é obrigatória').moreThan(0, 'Selecione uma categoria válida'),
  value: yup.number().typeError('Valor é obrigatório').required('Valor é obrigatório').moreThan(0, 'Valor deve ser maior que zero'),
});
