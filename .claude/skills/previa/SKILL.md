---
name: previa
description: Prepara e entrega uma prévia do site para a Dra. Nayane aprovar (revisão independente, conferência de publicação, link com noindex, mensagem para a cliente) e, quando ela responder, organiza e aplica a rodada de ajustes. Use quando uma etapa de construção terminar ou quando chegarem os ajustes da cliente.
---

# Prévia e rodada de ajustes

Combinado com a cliente: **prévia 1 (~50%) → ajustes → prévia 2 (~90%) → no máximo uma rodada final → lançamento.**

## Entregar uma prévia

1. **Escopo da rodada.** Confira se a etapa tem o que foi combinado para ela (ver `construir-site`). O que não ficou pronto entra na mensagem como "na próxima prévia", nunca escondido.
2. **Revisão independente.** Chame o subagente **`revisor`** com o número da prévia. Corrija tudo o que ele marcar como "bloqueia a prévia" e rode de novo até não sobrar nenhum.
3. **Conferência de publicação.**
   - `noindex, nofollow` em todas as páginas;
   - nenhuma informação interna no código, nos comentários, nos textos alternativos nem nos commits (`CLAUDE.md`, regra 1);
   - todo `[PENDENTE: …]` visível e listado no README.
4. **Publicar.** Mostre ao Felipe o que vai ao ar e só publique depois do "ok" dele (mesclar na `main`, que o GitHub Pages publica). Crie a tag `previa-1`, `previa-2` ou `versao-final` no commit publicado.
5. **Mensagem para a cliente**, pronta para o WhatsApp, curta e sem jargão:
   - o link e como abrir no celular;
   - o que esta prévia tem e o que ainda não tem (e por quê);
   - o que precisamos dela, em lista numerada (fotos, confirmações, respostas pendentes);
   - como mandar os ajustes: **uma lista única**, por seção, em até dois dias úteis; pode ser por áudio.
   - o lembrete do combinado: depois desta, mais uma prévia (ou: esta é a rodada final).

## Quando os ajustes chegarem

1. Transcreva e organize por seção, numerando cada pedido.
2. Classifique cada um:
   - **ajuste da rodada**: dentro do combinado; entra agora;
   - **pendência de conteúdo**: depende de material dela; entra quando chegar;
   - **escopo novo**: página, seção ou mudança de direção; vai para o Felipe decidir antes de qualquer código;
   - **não recomendado**: contraria as regras de publicidade, a privacidade ou a conversão; explique o porquê em uma frase e proponha alternativa.
3. Mostre a lista classificada ao Felipe e aplique o que for aprovado.
4. Commit "Aplica os ajustes da prévia N" e atualize as pendências do README.
5. Depois da rodada final, pedidos novos são uma nova etapa, não ajuste: aponte isso com gentileza.
