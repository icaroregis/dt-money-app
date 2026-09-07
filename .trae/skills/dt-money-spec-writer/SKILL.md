---
name: "dt-money-spec-writer"
description: "Writes short implementation specs for this repository. Invoke before medium or large changes, especially for new screens, flows, APIs, or refactors."
---

# DT Money Spec Writer

Use esta skill antes de implementar tarefas que envolvam mais de um arquivo principal ou que alterem fluxo do produto.

## Quando usar

- Nova tela
- Novo formulário
- Integração com API
- Mudança em navegação
- Refatoração de componente compartilhado
- Mudança que afeta contexto, autenticação ou contrato de dados

## Como escrever a spec

Use `.trae/specs/feature-spec-template.md` como base e preencha apenas o que for relevante.

A spec deve cobrir:

1. Problema
2. Resultado esperado
3. Arquivos afetados
4. Riscos e dependências
5. Estratégia de UI com NativeWind
6. Plano de validação

## Regras

- Ser curta e verificável
- Refletir os padrões reais do repositório, nao um template genérico
- Citar componentes e hooks existentes que devem ser reutilizados
- Declarar explicitamente quando `style` nao deve ser usado

## Saída esperada

Uma spec simples, pronta para orientar a implementação sem ambiguidades.
