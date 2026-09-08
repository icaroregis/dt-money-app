# Feature Spec - Formulário Nova Transação com React Hook Form

## 1. Contexto

- Atualmente o componente `NewTransaction` usa `useState` local para armazenar os dados da transação. Isso diverge do padrão adotado no app, em que formulários de Login e Register usam `react-hook-form` + `yupResolver` + `AppInput`.
- O formulário é aberto a partir do `AppHeader` através de `openBottomSheet(<NewTransaction />, 0)` e renderizado dentro do `BottomSheetContextProvider`.

## 2. Resultado esperado

- `NewTransaction` deve gerenciar inputs com `react-hook-form`, da mesma forma que `LoginForm` e `RegisterForm`.
- Validações devem ser feitas com `yup` e exibidas pelo componente `ErrorMessage` interno do `AppInput`.
- O componente deve oferecer tratamento de erro com `useErrorHandler` + `Snackbar` durante a submissão (quando a integração for ligada).
- O usuário percebe o mesmo padrão visual de campos, labels, ícones e botão já usado nas telas de autenticação.

## 3. Escopo

Dentro do escopo:
- Substituir `useState` de `NewTransaction` por `useForm`.
- Criar interface `NewTransactionFormValues` compatível com `CreateTransactionRequest`.
- Criar `schema.ts` de validação ao lado do formulário.
- Reutilizar `AppInput`, `AppButton`, `useErrorHandler` e `yupResolver`.
- Header do sheet (título + botão de fechar) permanece.

Fora do escopo:
- Integração real com API de criação de transação (caso ainda não exista service).
- Implementação de select/picker para `typeId` e `categoryId` nesta spec (mantidos como input numérico, como estrutura inicial; caso o projeto venha a ter select, evolue separadamente).
- Mudanças em navegação, contexto, auth ou serviços HTTP não relacionados.

## 4. Arquivos prováveis

- `src/components/NewTransaction/index.tsx`
- `src/components/NewTransaction/schema.ts`
- (opcional) `src/shared/services/dt-money/transaction.service.ts`, caso queira deixar a chamada HTTP preparada. Não criaremos se não houver endpoint fechado; no lugar, o submit trata a estrutura de dados e mostra sucesso com Snackbar placeholder.

## 5. Reuso obrigatório

Componentes existentes a reutilizar:
- `AppInput` (controlado com Controller)
- `AppButton` (modo fill)
- `ErrorMessage` já é usado dentro de AppInput, não precisa importar
- `MaterialIcons` via AppInput e via ícone de fechar

Hooks existentes a reutilizar:
- `useForm` do `react-hook-form`
- `yupResolver` do `@hookform/resolvers/yup`
- `useErrorHandler` (para mostrar Snackbar em erros de submissão)
- `useBottomSheetContext` (para fechar o sheet ao cancelar / após sucesso)

Services ou contexts existentes a reutilizar:
- `SnackbarContextProvider` via `useErrorHandler`
- `BottomSheetContextProvider` via `useBottomSheetContext`

## 6. Regras de UI

- Estilização com NativeWind via `className`.
- Variantes condicionais com `cn(...)` quando necessário.
- Não usar `StyleSheet.create(...)`.
- Não usar `style` para estilos estáticos (apenas em props obrigatórias de API como `backgroundStyle` do BottomSheet, etc).
- Reutilizar tokens: `bg-background-secondary`, `text-white`, `text-gray-700`, `bg-accent-brand`, etc.
- Campos: labels em maiúsculas, seguindo LoginForm.

## 7. Dados e contratos

Endpoint ou serviço impactado:
- Sem integração HTTP obrigatória nesta refatoração. Se existir futuramente, usar `dt-money-api` do mesmo jeito que `auth.service.ts`.

Tipos e interfaces impactados:
- `CreateTransactionRequest`: base para os campos do formulário.
- Criar `NewTransactionFormValues` igual (ou compatível com) `CreateTransactionRequest` para tipar o `useForm`.

Estado local, contexto ou storage impactado:
- Nenhum contexto ou storage alterado nesta refatoração.
- Fechamento do bottom sheet ao submeter/cancelar através do `useBottomSheetContext`.

## 8. Navegação

- Nenhuma rota alterada.
- O formulário segue sendo renderizado dentro do `BottomSheet` a partir do `AppHeader`.

## 9. Validação

- [ ] Revisar o diff final para garantir que o padrão de LoginForm/RegisterForm foi seguido.
- [ ] Verificar que não existe `StyleSheet` nem `style` desnecessário no JSX do formulário.
- [ ] Verificar que `className` está sendo usado em todos os elementos estáticos.
- [ ] Rodar `pnpm exec tsc --noEmit` para validar tipos (ignorar erros prévios conhecidos de tsconfig, App.css, babel e tailwind).

## 10. Riscos e perguntas abertas

- Risco 1: Campos `typeId` e `categoryId` podem se tornar selects em breve; manter inputs por enquanto, mas nomear campos para permitir mudança sem quebrar o schema.
- Risco 2: Integração HTTP pode requerer formatação de valor (centavos vs decimais); manter valor como number por enquanto, mesmo que o usuário digite.
- Pergunta 1: Deseja já implementar o service de transação e ligar a submissão à API, ou só a estrutura do formulário por enquanto? (resposta padrão usada aqui: só estrutura do form + tentativa de submit com erro caso não exista service).

## 11. Plano de implementação

- [ ] Passo 1: Criar `NewTransaction/schema.ts` com validações yup compatíveis com `CreateTransactionRequest`.
- [ ] Passo 2: Refatorar `NewTransaction/index.tsx` para usar `useForm` com `yupResolver`, `AppInput` para cada campo, `AppButton` no submit e `useErrorHandler`.
- [ ] Passo 3: Usar `useBottomSheetContext` no botão de fechar (X) e após submissão bem-sucedida.
- [ ] Passo 4: Rodar checagem de tipos e revisar diff final.
