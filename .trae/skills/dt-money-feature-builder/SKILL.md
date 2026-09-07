---
name: "dt-money-feature-builder"
description: "Implements or refactors features in this dt-money app. Invoke when adding screens, forms, services, navigation flows, or shared state."
---

# DT Money Feature Builder

Use esta skill ao implementar ou refatorar features deste projeto.

## Objetivo

Entregar mudanças aderentes aos padrões reais do repositório, evitando soluções genéricas de React Native.

## Antes de codar

1. Ler `AGENTS.md`
2. Ler os arquivos já existentes da área afetada
3. Para mudanças médias ou grandes, escrever uma spec curta com base em `.trae/specs/feature-spec-template.md`
4. Identificar componentes, hooks, serviços e contexts que já resolvem parte do problema

## Padrões obrigatórios

- Usar TypeScript estrito
- Usar import alias `@/`
- Preferir `named exports`
- Respeitar a organização por pastas com `index.tsx`
- Reutilizar `react-hook-form`, `yup`, `useErrorHandler`, `Snackbar` e contexts existentes
- Colocar integrações HTTP em `src/shared/services` e `src/shared/api`

## UI e estilo

- Toda estilização visual deve ser feita com `className` via NativeWind
- Para variações condicionais, usar `cn(...)`
- Nao introduzir `StyleSheet.create`
- Nao usar `style={{ ... }}` para layout, espaçamento, cor, tipografia ou borda
- Se um token novo for necessário, adicionar em `src/shared/colors.ts` e expor no `tailwind.config.ts`

## Navegação e fluxo

- Rotas públicas em `src/routes/PublicRoutes`
- Rotas privadas em `src/routes/PrivateRoutes`
- Tipar params de navegação
- Ao criar fluxo novo, encaixar a tela no stack correto

## Formulários

- Schema perto do formulário
- Resolver com `yupResolver(...)`
- Inputs com `AppInput`
- Submissão com feedback de loading e tratamento de erro

## Checklist de entrega

- A solução seguiu os padrões já existentes?
- A UI usou NativeWind em vez de `style`?
- O código reaproveitou abstrações locais antes de criar novas?
- O fluxo foi validado com revisão do diff e, se aplicável, `pnpm exec tsc --noEmit`?
