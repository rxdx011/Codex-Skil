# Codex Token Saving Skills

Skills curtas para reduzir leituras desnecessárias, saídas de ferramentas e retrabalho no Codex. Documentação em português; instruções das skills em inglês para uso em projetos variados.

Não há percentual de economia garantido: carregar uma skill também consome tokens. Use apenas a skill adequada à tarefa e compare sessões semelhantes. Economia não deve comprometer correção, segurança ou validação necessária.

## Skills

| Skill | Quando usar |
| --- | --- |
| `context-efficient` | Encontrar e ler apenas o contexto relevante de um repositório. |
| `focused-change` | Implementar uma alteração delimitada com pouco retrabalho. |
| `targeted-validation` | Escolher verificações proporcionais à mudança. |
| `compact-handoff` | Registrar o estado de uma tarefa longa sem repetir o histórico. |

## Instalação

Requer Git e Python 3. Instala para o usuário em `~/.agents/skills`; use `--dest .agents/skills` na raiz do projeto para instalar só nesse projeto. O instalador recusa sobrescrever skills existentes.

```bash
git clone https://github.com/rxdx011/codex-token-saving-skills.git
cd codex-token-saving-skills
python3 scripts/validate.py
python3 scripts/install.py --skill context-efficient
# Ou instalar todas:
python3 scripts/install.py
```

Abra uma nova sessão do Codex após instalar. Exemplos de uso explícito:

```text
Use $context-efficient para localizar a origem desse erro.
Use $focused-change para corrigir o bug sem ampliar o escopo.
Use $targeted-validation para verificar a alteração.
Use $compact-handoff para registrar o estado atual em HANDOFF.md.
```

## Como avaliar

Compare tarefas equivalentes, com o mesmo modelo, esforço de raciocínio e contexto inicial. Registre tokens de entrada/saída quando disponíveis, número de chamadas, testes executados e qualidade do resultado. Comprimento de texto e número de chamadas são indicadores auxiliares, não medidas exatas de tokens. Não há benchmark incluído nem resultados medidos neste repositório.

As skills não alteram limites de uso, preços ou o modelo. Elas orientam o fluxo de trabalho. Instruções do usuário, do ambiente e do projeto continuam tendo prioridade.

## Desenvolvimento

```bash
python3 scripts/validate.py
```

Mantenha cada `SKILL.md` curto e autossuficiente. Só acrescente referências quando forem necessárias e carregue-as sob demanda.

Licença MIT.
