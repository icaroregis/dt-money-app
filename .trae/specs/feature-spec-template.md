# Feature Spec Template

Use este template antes de mudanças médias ou grandes.

## 1. Contexto

- Qual problema estamos resolvendo?
- Em que tela, fluxo ou camada isso impacta?

## 2. Resultado esperado

- O que deve acontecer ao final?
- Como o usuário percebe a mudança?

## 3. Escopo

- O que entra nesta entrega?
- O que fica explicitamente fora?

## 4. Arquivos prováveis

- `src/...`
- `src/...`

## 5. Reuso obrigatório

- Componentes existentes a reutilizar:
- Hooks existentes a reutilizar:
- Services ou contexts existentes a reutilizar:

## 6. Regras de UI

- Estilização com NativeWind via `className`
- Variantes condicionais com `cn(...)`
- Nao usar `StyleSheet.create(...)`
- Nao usar `style` para estilos estáticos
- Se precisar de novo token, atualizar `src/shared/colors.ts` e `tailwind.config.ts`

## 7. Dados e contratos

- Endpoint ou serviço impactado:
- Tipos e interfaces impactados:
- Estado local, contexto ou storage impactado:

## 8. Navegação

- Stack afetado:
- Params novos ou alterados:

## 9. Validação

- Revisar o diff final
- Validar fluxo principal manualmente
- Rodar `pnpm exec tsc --noEmit` quando a mudança tocar TypeScript em mais de um arquivo

## 10. Riscos e perguntas abertas

- Risco 1:
- Pergunta 1:

## 11. Plano de implementação

- [ ] Passo 1
- [ ] Passo 2
- [ ] Passo 3
