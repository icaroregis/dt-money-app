# Home Infinite Scroll

## 1. Contexto

- A tela `Home` busca apenas a primeira página de transações e substitui a lista inteira a cada `fetch`.
- A API do backend já aceita `page` e `perPage`, retornando `data`, `totalRows`, `totalPages`, `page` e `perPage`.

## 2. Resultado esperado

- Ao abrir a `Home`, a primeira página deve ser carregada normalmente.
- Ao chegar perto do fim da lista, a próxima página deve ser carregada e anexada aos itens já exibidos.
- Quando não houver mais páginas, nenhuma nova chamada deve ser disparada.

## 3. Escopo

- Ajustar o store de transações para suportar reset da lista e append paginado.
- Atualizar a `Home` para usar `onEndReached` com proteção contra chamadas duplicadas.
- Manter o fluxo atual de exclusão e edição.

## 4. Arquivos prováveis

- `src/store/transaction.store.tsx`
- `src/screens/Home/index.tsx`

## 5. Reuso obrigatório

- Componentes existentes a reutilizar: `ListHeader`, `TransactionCard`, `DeleteTransactionModal`, `EditTransaction`
- Hooks existentes a reutilizar: `useErrorHandler`
- Services ou contexts existentes a reutilizar: `transaction.service`, `useBottomSheetContext`, `useTransactionStore`

## 6. Regras de UI

- Estilização com NativeWind via `className`
- Nao usar `StyleSheet.create(...)`
- Nao usar `style` para estilos estáticos
- Esta entrega nao exige novos tokens visuais

## 7. Dados e contratos

- Endpoint impactado: `GET /transaction`
- Tipos e interfaces impactados: `GetTransactionsQueryParams`, `TransactionState`
- Estado impactado: `transactions` e `pagination` no store persistido

## 8. Navegação

- Stack afetado: nenhum
- Params novos ou alterados: nenhum

## 9. Validação

- Revisar o diff final
- Validar que a primeira página reseta a lista
- Validar que páginas seguintes sao anexadas
- Validar que nao ha chamada extra apos a ultima página
- Rodar `pnpm exec tsc --noEmit`

## 10. Riscos e perguntas abertas

- Risco 1: `onEndReached` do `FlatList` pode disparar mais de uma vez sem guardas locais
- Risco 2: ações como exclusão ainda precisam recarregar a lista de forma consistente

## 11. Plano de implementação

- [ ] Ajustar o store para resetar ou anexar páginas conforme `page`
- [ ] Atualizar a `Home` para carregar a próxima página ao fim da lista
- [ ] Validar com TypeScript e revisão do fluxo
