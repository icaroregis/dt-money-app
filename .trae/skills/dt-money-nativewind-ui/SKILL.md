---
name: "dt-money-nativewind-ui"
description: "Builds and updates React Native UI with NativeWind for this repository. Invoke when creating screens, components, or changing visual styling."
---

# DT Money NativeWind UI

Use esta skill em qualquer tarefa visual deste projeto.

## Regra principal

Neste repositório, UI deve ser escrita com NativeWind. A IA nao deve inventar `StyleSheet` nem migrar para `style` sem necessidade real.

## Ordem de decisão para estilos

1. Resolver com `className`
2. Resolver variações com `cn(...)`
3. Promover novos tokens reutilizáveis em `src/shared/colors.ts` e `tailwind.config.ts`
4. Usar `style` apenas quando a API nao aceitar `className` ou quando houver valor dinâmico inevitável

## O que fazer

- Usar classes utilitárias para espaçamento, layout, radius, background, borders e tipografia
- Reaproveitar tokens como `bg-background-primary`, `bg-background-secondary`, `text-gray-300`, `bg-accent-brand`
- Manter consistência com componentes existentes como `AppButton`, `AppInput`, `AppHeader` e `Snackbar`
- Usar `colors` apenas para props que pedem valor direto, como `color` de ícones ou `placeholderTextColor`

## O que evitar

- `StyleSheet.create(...)`
- `style={{ padding: 16, backgroundColor: ... }}`
- Cores hardcoded no JSX
- Criar componentes visuais paralelos quando um já existente resolve o caso

## Exceções aceitáveis

- `ActivityIndicator color={colors.white}`
- `MaterialIcons color={colors.gray["700"]}`
- `screenOptions={{ headerShown: false }}`
- Valores de animação, insets, transforms ou medidas dinâmicas que nao cabem bem em classes

## Revisão final

Antes de entregar, confirme:

- Nenhum estilo estático foi feito com `style`
- Classes estão coerentes com os tokens do projeto
- Variantes condicionais usam `cn(...)`
- O resultado visual respeita o padrão das telas de autenticação já existentes
