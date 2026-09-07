# DT Money App AI Workflow

Este repositório usa Expo + React Native + TypeScript + NativeWind. Toda IA que atuar aqui deve seguir este guia antes de propor ou escrever código.

## Stack real do projeto

- Expo SDK `57`
- React Native `0.86`
- React `19`
- TypeScript em modo `strict`
- React Navigation `7`
- `react-hook-form` + `yup`
- `axios`
- `nativewind` `4`

## Regra de ouro

Antes de alterar algo de framework, build, navegação, setup nativo ou API do Expo, consulte a documentação versionada do Expo SDK 57:

- https://docs.expo.dev/versions/v57.0.0/

Não use snippets genéricos de outras versões.

## Workflow obrigatório

1. Leia os arquivos já existentes da feature antes de escrever código.
2. Para mudanças médias ou grandes, escreva primeiro uma spec curta usando o template em `.trae/specs/feature-spec-template.md`.
3. Reaproveite padrões já existentes no projeto antes de criar novas abstrações.
4. Implemente em pequenos passos.
5. Valide o resultado com inspeção do diff e, quando fizer sentido, com `pnpm exec tsc --noEmit`.

## Padrões deste projeto

### 1. Estilo e UI

- Use `className` com `NativeWind` para layout, espaçamento, cor, borda, tipografia e posicionamento.
- Use `cn(...)` de `src/utils/cn.ts` quando houver classes condicionais.
- Nao crie `StyleSheet.create(...)` para estilos estáticos.
- Nao use prop `style={{ ... }}` para estilos comuns de tela ou componente.
- `style` so pode ser usado quando a API exigir objeto, ou quando houver valores realmente dinâmicos que nao cabem bem em classe utilitária.
- Exemplos aceitáveis de uso direto de valores:
  - `MaterialIcons` com `color={colors.gray["700"]}`
  - `ActivityIndicator` com `color={colors.white}`
  - `placeholderTextColor`
  - `screenOptions={{ headerShown: false }}`

### 2. NativeWind primeiro

Se a IA precisar estilizar algo, siga esta ordem:

1. Tentar resolver com classes existentes
2. Combinar classes com `cn(...)`
3. Se faltar token reutilizável, adicionar em `src/shared/colors.ts` e expor no `tailwind.config.ts`
4. Usar `style` apenas como exceção documentada no próprio código

Exemplo correto:

```tsx
<View className="rounded-xl bg-background-secondary px-4 py-3" />
```

Exemplo incorreto:

```tsx
<View style={{ borderRadius: 12, backgroundColor: "#202024", padding: 16 }} />
```

### 3. Tokens

- Reutilize cores de `src/shared/colors.ts`
- Se uma nova cor precisar virar classe utilitária, registre no `tailwind.config.ts`
- Prefira tokens semânticos como `bg-background-primary`, `text-gray-300`, `bg-accent-brand`

### 4. Organização de arquivos

- Use import alias `@/`
- Componentes e telas ficam em pastas com `index.tsx`
- Schemas ficam próximos do formulário, como em `LoginForm/schema.ts`
- Prefira `named exports`
- Evite criar helpers globais sem necessidade

### 5. Formulários

- Use `react-hook-form`
- Validação via `yupResolver(...)`
- Campos controlados reutilizando `AppInput`
- Erros de API e feedback passam por `useErrorHandler` e `Snackbar`

### 6. Dados e serviços

- Cliente HTTP em `src/shared/api`
- Chamadas de domínio em `src/shared/services`
- Erros devem retornar `AppError` quando aplicável
- Estado compartilhado vai para `context`, nao para props drilling desnecessário

### 7. Navegação

- Rotas públicas e privadas ficam separadas em `src/routes/PublicRoutes` e `src/routes/PrivateRoutes`
- Novas telas devem entrar no stack correto
- Tipar params de navegação

### 8. Linguagem do produto

- Identificadores técnicos em inglês
- Texto visível para o usuário em português, salvo exigência explícita da feature

## Checklist antes de entregar

- O código seguiu os padrões já existentes do repositório?
- Toda estilização visual ficou em `className`?
- Houve uso de `cn(...)` quando existiam variantes condicionais?
- Algum token novo foi adicionado no lugar certo?
- A mudança reutiliza componentes, hooks e serviços já existentes?
- Existe log temporário, comentário descartável ou código morto para remover?

## Quando criar spec antes de codar

Crie spec antes de implementar quando houver:

- nova tela
- novo fluxo de autenticação
- alteração de navegação
- integração com API
- refatoração de componente compartilhado
- qualquer tarefa com mais de um arquivo principal

## Skills locais deste projeto

Considere usar as skills em `.trae/skills/`:

- `dt-money-spec-writer`
- `dt-money-feature-builder`
- `dt-money-nativewind-ui`
