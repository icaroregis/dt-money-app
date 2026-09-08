import * as yup from 'yup';

export const newTransactionSchema = yup.object().shape({
  description: yup.string().required('Descrição é obrigatória'),
  typeId: yup.number().typeError('Tipo é obrigatório').required('Tipo é obrigatório').moreThan(0, 'Selecione um tipo válido'),
  categoryId: yup.number().typeError('Categoria é obrigatória').required('Categoria é obrigatória').moreThan(0, 'Selecione uma categoria válida'),
  value: yup.number().typeError('Valor é obrigatório').required('Valor é obrigatório').moreThan(0, 'Valor deve ser maior que zero'),
});
