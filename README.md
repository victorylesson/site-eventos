# Manny Deck Bar — Protótipo de site (v1)

Protótipo de landing page para o **Manny Deck Bar** (Carmo, Olinda — PE), desenvolvido para apresentação ao proprietário. Frontend puro: HTML5 + CSS3 + JavaScript, sem frameworks.

## Como executar

Abra `index.html` diretamente no navegador, ou sirva a pasta com um servidor estático:

```bash
# Opção 1 — Python
python3 -m http.server 8080

# Opção 2 — Node
npx serve .
```

Acesse `http://localhost:8080`.

## Estrutura

```text
├── index.html          # Estrutura e conteúdo (semântico + SEO local + JSON-LD)
├── css/
│   └── style.css       # Estilos com variáveis CSS (cores, tipografia, espaçamentos)
├── js/
│   └── script.js       # Menu mobile, reveals, parallax, abas do cardápio, scrollspy
├── assets/
│   ├── images/         # Imagens do site
│   ├── icons/          # Ícones (atualmente SVG inline no HTML)
│   └── logo/           # Logo da marca
└── README.md
```

## ⚠ Conteúdo de demonstração

- **Imagens** (`assets/images/`): geradas como placeholder. Substituir por fotos reais do estabelecimento/Instagram mantendo os mesmos nomes de arquivo (ou ajustando os `src` no HTML).
- **Agenda**: eventos fictícios marcados como "Exemplo". A estrutura (`#agendaList`) está pronta para receber dados de um backend/CMS futuro.
- **Cardápio**: itens ilustrativos sem preços. A estrutura de abas está pronta para integração com gerenciador de cardápio.

## Conversão (WhatsApp)

Todos os CTAs apontam para `wa.me/558133180226` com mensagens contextuais (reservas, programação, orçamento de eventos, cardápio). Para editar as mensagens, busque por `wa.me` no `index.html` — cada link tem o parâmetro `?text=` com a mensagem URL-encoded.

## SEO local

Incluídos: `<title>`, meta description, Open Graph, favicon, dados estruturados `BarOrPub` (Schema.org) com endereço e telefone, `alt` em imagens e âncoras amigáveis.

## Próximos passos (versão completa)

- Backend + banco de dados (agenda de eventos real)
- Painel administrativo / CMS
- Cardápio digital gerenciável (ou PDF)
- Formulário de orçamento de eventos
- Analytics
