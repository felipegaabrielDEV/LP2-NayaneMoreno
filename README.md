# 🦷 Dra. Nayane Moreno — Landing Page | Ortodontia em Aracaju

> 🚧 **Prévia 1.** Estrutura, identidade visual e textos da primeira versão. Os pontos que dependem da cliente aparecem na página como marcadores amarelos **PENDENTE** (o botão "Prévia" no canto inferior esquerdo esconde ou mostra os marcadores). A página está com `noindex, nofollow` até a aprovação final.

Landing page da **Dra. Nayane Moreno**, Cirurgiã-Dentista (CRO-SE 2301) em Aracaju/SE, focada em **Ortodontia**: captar pessoas interessadas em colocar aparelho e levá-las a agendar a avaliação pelo WhatsApp.

---

## 📋 Sobre o projeto

- **Posicionamento:** "Dra. Nayane Moreno — Ortodontia em Aracaju".
- **Tratamentos:** aparelho metálico, aparelho de porcelana e alinhador transparente.
- **Formas de atendimento:** convênio (SulAmérica e Amil) e particular.
- **Conversão:** todos os botões levam ao WhatsApp, com mensagem pronta por origem.
- **Referências internas:** a estrutura e a engenharia seguem as LPs da Nutri Anna Waleska e da VALLENCI Salas; identidade, textos e imagens são próprios.

---

## ✨ Seções

| Seção | Destaques |
|---|---|
| **Menu** | Fixo, com nome e CRO sempre visíveis; menu de tela cheia no celular (fecha com `Esc` ou ao tocar num link) |
| **Topo** | Título, foto em moldura de arco, cartão com CRO, três números de destaque e faixa com quatro diferenciais |
| **Para quem é** | Seis situações em cartões com foto no topo (referência: site de salas da Vallenci), título e frase. Fotos ilustrativas geradas por IA, com pessoas diferentes em cada cartão (gênero, idade e tom de pele variados, aparência brasileira), em `assets/situacoes/` (WebP 900x822 e 520x475), com a nota "Imagens ilustrativas" |
| **Aparelhos** | Três cartões (metálico, porcelana, alinhador) com foto no topo (`assets/aparelhos/`, WebP 900x640 e 520x365, ilustrativas, geradas por IA), características e botão próprio |
| **Convênios e particular** | Lado a lado: planos atendidos e atendimento particular |
| **Como funciona** | Cinco etapas, do WhatsApp ao acompanhamento, e citação da Dra. Nayane |
| **Sobre** | Formação, trajetória e história pessoal ligada à ortodontia, com cartões de credenciais |
| **Atendimento** | Três quadros para fotos da Dra. atendendo (grade no computador, carrossel no celular). Hoje com marcadores de pendência e escondida no modo "ocultar pendências" |
| **Consultório** | Galeria com as fotos do consultório (setas, deslize e teclado), horário e endereço |
| **Avaliações do Google** | Bloco reservado; só vai ao ar depois da liberação |
| **Perguntas frequentes** | Oito perguntas em acordeão acessível |
| **Chamada final e rodapé** | Contato, localização, horário e identificação profissional |

---

## 🎨 Identidade visual

Segue o **Manual de Identidade Visual** da marca (nov/2026). As cores foram conferidas nos pixels da logomarca enviada.

| Cor | Hex | Uso |
|---|---|---|
| Verde da marca | `#16AD8E` | Logo, destaques, ícones e detalhes |
| Cinza da marca | `#8C8C8C` | "MORENO", fio do aparelho e textos de apoio |
| Verde dos botões | `#0F7A64` | Botões (contraste AA com texto branco) |
| Verde escuro | `#0F3F36` | Faixa do topo, seção "Como funciona" e chamada final |
| Verde claro | `#E8F6F1` | Fundos de detalhe |
| Fundo suave | `#F7F9F8` | Seções alternadas com o branco |
| Texto | `#303B39` | Títulos e textos |

Tipografia: **Montserrat** em todo o site, com o contraste de pesos da logo (forte em "NAYANE", leve em "MORENO"): títulos em 600 e o trecho em destaque em 300, no verde da marca.

Detalhe próprio do site: o **fio do aparelho com o bráquete verde**, tirado da logo, passa sobre a foto do topo. Logomarca em `assets/marca/` (ícone, versão completa e favicon, com fundo transparente).

---|---|---|
| Verde-profundo | `#0F3D3A` | Títulos, faixas e fundos escuros |
| Menta | `#E6F2EF` | Fundos claros |
| Creme | `#FBF8F4` | Fundo da página |
| Areia | `#F4ECE4` | Fundo da seção Sobre |
| Rosa | `#EED5CE` | Detalhes e acentos |
| Rosa-escuro | `#A9473E` | Botões de agendamento |

Tipografia (Google Fonts): **Fraunces** nos títulos e **Plus Jakarta Sans** nos textos. Visual: estrutura moderna e objetiva do Modelo 2 com as cores suaves do Modelo 4 (a validar com a cliente).

---

## 🛠️ Tecnologias e estrutura

HTML, CSS e JavaScript puros, sem framework nem build, prontos para o GitHub Pages.

```
├── index.html          # Estrutura e conteúdo de todas as seções
├── styles.css          # Identidade, layout responsivo e animações (tokens no :root)
├── script.js           # Menu, WhatsApp, FAQ, galeria, revelar ao rolar e botão da prévia
└── assets/
    ├── marca/          # Logomarca (ícone, completa e favicon)
    ├── profissional/   # Fotos da Dra. Nayane (WebP)
    └── consultorio/    # Fotos do consultório (WebP)
```

**Onde mexer:**
- Número do WhatsApp: `<meta name="whatsapp-number">` no `<head>` (só dígitos, com 55 e DDD).
- Mensagem de cada botão: objeto `mensagens` em `script.js`, pela origem (`data-wa-origin`).
- Cores e fontes: tokens no início de `styles.css`.

---

## 📱 Responsividade, acessibilidade e performance

- Testado em `320` · `375` · `390` · `430` · `768` · `1024` · `1366` · `1920` px, sem rolagem horizontal.
- Foco visível, link "Pular para o conteúdo", FAQ com `aria-expanded`, áreas de toque de 44 px ou mais.
- Animações desligadas com `prefers-reduced-motion`.
- Imagens em WebP com dimensões declaradas e `loading="lazy"` fora do topo; foto do topo com `preload`.

---

## 🚀 Como rodar localmente

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

---

## 🗺️ Próximas etapas (prévia 2)

- Formulário curto antes do WhatsApp.
- Links da Tintim por origem (UTM), Google Tag Manager com Modo de Consentimento e aviso de cookies.
- Política de privacidade, página 404, imagem de compartilhamento 1200 × 630 e dados para o Google (`Dentist`).
- Mapa do Google no bloco do consultório.

---

## ✅ Pendências de conteúdo

**Travam o lançamento**
- [x] Endereço (Rua Senador Rollemberg, 562, São José, CEP 49015-120), WhatsApp (79) 99945-2813, Instagram e horário
- [ ] Fotos de atendimento (seção "Atendimento", 3 fotos em `assets/atendimento/`): **já estão na página pública**; registrar a autorização por escrito das pacientes que aparecem e conferir a norma do CFO/CRO-SE
- [ ] Confirmação dos três tipos de aparelho (metálico, porcelana, alinhador) e da marca do alinhador. As três fotos dos cartões são ilustrações de IA e precisam da aprovação da Dra. Nayane e da conferência da norma do CFO/CRO-SE
- [ ] Convênios: o que SulAmérica e Amil cobrem na ortodontia, autorização para citar os nomes e logotipos oficiais
- [ ] Aprovação do texto "Sobre" e da citação da Dra. Nayane
- [ ] Foto do diploma e dos certificados (graduação 2011 e pós em Ortodontia 2014–2017)

**Melhoram o site**
- [ ] Intervalo das manutenções e como termina o tratamento (contenção e retornos)
- [ ] Idade mínima para a ortodontia e faixa média de duração do tratamento
- [ ] Link do perfil no Google e liberação das avaliações (norma do CFO)
- [ ] Seção "Evolução do tratamento" (fotos em `assets/casos/` e vídeo da mãe, que mostra também o filho, menor): **já estão na página pública**; registrar a autorização escrita do paciente/responsável e da mãe e conferir a norma do CFO/CRO-SE. A seção some no modo "ocultar pendências"
- [ ] Fotos de "depois" (o paciente ainda está com aparelho; hoje só há antes e momento atual)
- [ ] Seção "Para quem é": as 6 fotos são **ilustrações geradas por IA** (não são pacientes). A Dra. Nayane precisa aprovar e é preciso conferir a norma do CFO/CRO-SE sobre imagens ilustrativas de condições bucais
- [ ] Copy do topo (feita pelo cunhado do Felipe): conferir com a Dra. Nayane e a norma do CFO/CRO-SE o "sorriso dos sonhos, sem passar anos usando aparelho?" (risco de ser lido como promessa de resultado ou de prazo) e o "+10 anos de experiência"
- [ ] Logotipo e cores da marca, se existirem
- [ ] Domínio e acesso ao Google Tag Manager

---

## 👤 Autor

Desenvolvido por **[Felipe Gabriel](https://github.com/felipegaabrieldev)**.

## 📄 Licença

Este repositório documenta um projeto de cliente real. O código pode ser usado como referência de portfólio; imagens, marca, textos e identidade visual pertencem à **Dra. Nayane Moreno** e não devem ser reutilizados sem autorização.
