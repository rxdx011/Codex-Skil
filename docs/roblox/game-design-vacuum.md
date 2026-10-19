# Design: Aspirador (rascunho)

> Documento vivo. Valores numéricos são placeholders para ajustar nos testes.

## Conceito

O jogador **é** o aspirador. Não existe ferramenta na mão nem botão de limpar: ao passar por cima da sujeira, ela é sugada automaticamente. O objetivo é limpar a casa inteira, e quanto mais limpo, mais dinheiro.

**Diferencial:** o controle é o próprio corpo do aspirador. O jogador aprende a ler o chão, planejar a rota e gerenciar a bag, em vez de apenas apertar um botão para limpar.

## Fluxo do jogador

1. **Lobby:** o jogador escolhe o mapa e o modo (solo ou dupla, o modo dupla fica para depois).
2. **Teleporte:** o jogador entra numa instância do mapa escolhido.
3. **Partida:** limpar o mapa, esvaziar a bag quando necessário e comprar upgrades quando tiver dinheiro.
4. **Fim:** a casa fica 100% limpa ou o tempo acaba. Resumo com dinheiro ganho e progresso.
5. **Volta ao lobby:** dinheiro e upgrades são salvos.

## Loop principal

```
Passar pela sujeira → bag enche → voltar ao caminhão → esvaziar → ganhar dinheiro → comprar upgrade → limpar mais rápido
```

## Mecânicas

### Sucção automática
- Ao encostar em uma sujeira, ela é absorvida. Não há ação extra.
- A bag tem capacidade máxima. Quando enche, a sucção para e o jogador precisa voltar ao caminhão.

### Caminhão de lixo
- Ponto fixo em cada mapa. Ao entrar na área, a bag é esvaziada e o jogador recebe o dinheiro da sujeira coletada.
- Cria o ciclo de ida e volta, que dá tensão e decisões de rota.

### Tipos de sujeira
| Tipo | Efeito | Desbloqueio |
| --- | --- | --- |
| Pó | Normal, enche a bag devagar | Inicial |
| Folhas | Ocupam mais espaço na bag | Mapa 2 |
| Vidro | Estoura a bag sem o upgrade "Bag reforçada" | Mapa 3 |
| Objeto pesado | Reduz a velocidade enquanto estiver na bag | Mapa 3 |

### Combo
- Sugar sujeira em sequência, sem parar, aumenta um multiplicador de dinheiro (ex.: até x3).
- Parar, bater numa parede ou voltar ao caminhão zera o combo.

### Upgrades (placeholders)
| Upgrade | Níveis | Efeito | Custo base |
| --- | --- | --- | --- |
| Motor | 5 | +velocidade por nível | 100 |
| Bag | 5 | +capacidade por nível | 100 |
| Bag reforçada | 1 | Permite vidro sem estourar | 500 |
| Sucção | 5 | Aumenta o alcance de sucção | 150 |

Custos crescem ~1,6x por nível.

### Mapas
- **Mapa 1 – Apartamento:** 3 cômodos, só pó. Tutorial.
- **Mapa 2 – Casa:** 5 cômodos, pó e folhas.
- **Mapa 3 – Escritório:** cômodos maiores, vidro e objetos pesados.

Mapas são desbloqueados por nível de jogador (ou por dinheiro acumulado).

## Economia (ponto de partida)
- Sujeira de pó: 1 dinheiro por unidade.
- Folhas: 2. Vidro: 5. Objeto pesado: 8.
- Multiplicador de combo aplicado à coleta.
- Bônus de conclusão do mapa: 20% do dinheiro total da partida.

## Escopo da primeira versão (MVP)
- 1 mapa (Apartamento, 3 cômodos).
- 1 tipo de sujeira (pó).
- Caminhão de lixo.
- 2 upgrades: Motor e Bag.
- Dinheiro e upgrades salvos com DataStore.
- Solo apenas. Lobby simples com escolha de mapa.

## Considerações técnicas
- **Sujeira:** usar grade por cômodo ou decals, não uma Part por grão.
- **Servidor é a autoridade:** dinheiro, bag, combo e upgrades são calculados no servidor. O cliente só envia intenção (movimento). Ver `roblox-remote-security`.
- **Persistência:** dinheiro e upgrades em DataStore com retries e salvamento ao sair. Ver `roblox-data-persistence`.
- **Teleporte:** lobby → instância do mapa. Verificar a API de teleporte e reserved servers quando chegar a hora.
- **Movimento:** o aspirador é controlado pelo jogador. Tratar a detecção de sujeira no servidor com validação de velocidade para evitar trapaça.

## Perguntas em aberto
- O tempo é limitado por partida ou a partida acaba só quando a casa fica limpa?
- Quanto de sujeira um mapa tem, e quanto tempo deve levar para limpar?
- O caminhão deve ser fixo ou pode ser movido pelo jogador?
- Quanto o jogador deve perder ao morrer ou ser "pego" por algum obstáculo?
