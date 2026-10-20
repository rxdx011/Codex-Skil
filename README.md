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
| `roblox-project-setup` | Organizar um projeto Roblox com Rojo, Wally e Luau. |
| `roblox-luau-scripting` | Escrever ou revisar scripts Luau para servidor, cliente e ModuleScripts. |
| `roblox-remote-security` | Criar ou revisar RemoteEvents e RemoteFunctions com autoridade no servidor. |
| `roblox-data-persistence` | Salvar dados de jogadores com DataStoreService, sessões e autosave. |
| `roblox-ui` | Construir interfaces (GUI) que funcionem em PC, celular e console. |
| `roblox-validation` | Escolher e rodar verificações (formatação, lint, tipos, build) antes de concluir. |
| `figcraft-design` | Criar telas e protótipos de interface com o editor FigCraft via MCP, como alternativa ao Figma. |

## Skills para Roblox no Claude Code

As skills `roblox-*` seguem o mesmo formato `SKILL.md`. Para o Claude Code, instale-as na pasta de skills do projeto ou do usuário:

```bash
# Só neste projeto
python3 scripts/install.py --dest .claude/skills --skill roblox-project-setup --skill roblox-luau-scripting --skill roblox-remote-security --skill roblox-data-persistence --skill roblox-ui --skill roblox-validation

# Para todos os seus projetos
python3 scripts/install.py --dest ~/.claude/skills --skill roblox-project-setup --skill roblox-luau-scripting --skill roblox-remote-security --skill roblox-data-persistence --skill roblox-ui --skill roblox-validation
```

Inicie uma nova sessão do Claude Code depois de instalar. As skills são sugeridas automaticamente pela descrição; você também pode pedir explicitamente, por exemplo: `Use a skill roblox-remote-security para revisar este RemoteEvent.`

Os guias assumem um projeto Rojo + Wally + Luau. O Claude Code consegue editar o código e rodar `rojo build`, `stylua`, `selene` e similares, mas não abre o Roblox Studio: testes de jogo, multiplayer e DataStore precisam ser feitos por você no Studio.

## FigCraft como alternativa ao Figma

A skill `figcraft-design` usa o servidor MCP do [FigCraft](https://github.com/storytold/figcraft), um editor de design open source que funciona offline. O projeto está em alfa e ainda não foi testado com arquivos reais do Figma. Instalar exige compilar o FigCraft (Rust) ou usar um binário pronto; depois, registre o servidor no Claude Code:

```bash
claude mcp add figcraft -- /caminho/para/figcraft-cli mcp
```

No app Claude Desktop, adicione o mesmo comando em Settings > Developer > Edit Config, conforme `docs/mcp.md` do FigCraft.

## Instalação

Requer Git e Python 3. Instala para o usuário em `~/.agents/skills`; use `--dest .agents/skills` na raiz do projeto para instalar só nesse projeto. O instalador recusa sobrescrever skills existentes.

```bash
git clone https://github.com/rxdx011/Codex-Skil.git
cd Codex-Skil
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
