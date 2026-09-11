# Home Performance Refactor

## 1. Contexto

- A tela `Home` concentra lógica de carga inicial, paginação infinita, exclusão e abertura do fluxo de edição.
- A tela faz múltiplas inscrições no store e mistura responsabilidades de fluxo com renderização.

## 2. Resultado esperado

- A `Home` deve ficar mais focada na orquestração da UI.
- A lógica de transações e exclusão deve ser extraída para hooks locais simples.
- O acesso ao store deve usar um selector único com `useShallow` para reduzir renders desnecessários.

## 3. Escopo

- Criar `useHomeTransactions` para carga inicial e scroll infinito.
- Criar `useDeleteTransactionFlow` para seleção, fechamento e confirmação de exclusão.
- Simplificar `src/screens/Home/index.tsx` e memoizar `renderItem`.

## 4. Arquivos prováveis

- `src/screens/Home/index.tsx`
- `src/screens/Home/hooks/useHomeTransactions.ts`
- `src/screens/Home/hooks/useDeleteTransactionFlow.ts`

## 5. Reuso obrigatório

- Componentes existentes a reutilizar: `ListHeader`, `TransactionCard`, `DeleteTransactionModal`, `EditTransaction`
- Hooks existentes a reutilizar: `useErrorHandler`
- Services ou contexts existentes a reutilizar: `useTransactionStore`, `useBottomSheetContext`

## 6. Regras de UI

- Estilização com NativeWind via `className`
- Nao usar `StyleSheet.create(...)`
- Nao usar `style` para estilos estáticos
- Esta refatoração nao exige novos tokens

## 7. Dados e contratos

- Serviço impactado: `fetchTransactions` e `deleteTransaction` do `transaction.store`
- Tipos impactados: `TransactionResponse`
- Estado local impactado: loading da paginação e estado do modal de exclusão

## 8. Navegação

- Stack afetado: nenhum
- Params novos ou alterados: nenhum

## 9. Validação

- Revisar o diff final
- Validar carga inicial e scroll infinito
- Validar exclusão com o modal
- Rodar `pnpm exec tsc --noEmit` na medida do possível

## 10. Riscos e perguntas abertas

- Risco 1: refatorar hooks sem preservar as guardas do `onEndReached`
- Risco 2: aumentar abstração demais para uma tela pequena

## 11. Plano de implementação

- [ ] Extrair a lógica de transações para um hook local
- [ ] Extrair a lógica de exclusão para um hook local
- [ ] Simplificar a `Home` mantendo o comportamento atual
