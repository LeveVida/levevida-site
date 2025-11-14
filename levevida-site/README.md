# 🌍 Leve Vida - Site Oficial

**Voe alto, Viva Leve!**

Site institucional do Leve Vida, seu guia completo para viajar mais gastando menos.

## 📋 Sobre o Projeto

O Leve Vida nasceu da vontade de ajudar pessoas a realizarem seus sonhos de viagem sem comprometer o orçamento. Este site oferece:

- 📝 Artigos sobre economia em viagens
- 📘 E-book completo com estratégias de viagem
- 🗺️ Guias práticos de destinos
- 💾 Downloads gratuitos (checklists, planilhas)
- 📞 Canal de contato direto

## 🚀 Estrutura do Projeto

```
levevida-site/
├── index.html              # Página inicial
├── artigos.html            # Lista de artigos
├── e-book.html             # Página de venda do e-book
├── guias.html              # Guias práticos de viagem
├── downloads.html          # Materiais para download
├── contato.html            # Formulário de contato
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos principais
│   ├── js/
│   │   └── script.js       # JavaScript
│   ├── images/
│   │   ├── logo.png        # Logo do site
│   │   ├── favicon.ico     # Ícone do navegador
│   │   └── ebook-capa.jpg  # Capa do e-book
│   └── downloads/          # Arquivos para download
└── README.md               # Este arquivo
```

## 🎨 Personalização

### Cores

As cores do site podem ser facilmente alteradas editando as variáveis CSS em `assets/css/style.css`:

```css
:root {
    --color-primary: #667eea;    /* Cor primária (roxo claro) */
    --color-secondary: #764ba2;  /* Cor secundária (roxo escuro) */
    --color-accent: #f093fb;     /* Cor de destaque */
}
```

### Logo e Favicon

1. **Logo**: Substitua o arquivo `assets/images/logo.png`
   - Tamanho recomendado: 200x200px
   - Formato: PNG com fundo transparente

2. **Favicon**: Substitua o arquivo `assets/images/favicon.ico`
   - Tamanho: 32x32px ou 16x16px
   - Formato: ICO

3. **Capa do E-book**: Adicione `assets/images/ebook-capa.jpg`
   - Tamanho recomendado: 600x800px
   - Formato: JPG ou PNG

### Conteúdo

Todo o conteúdo está em HTML puro e pode ser editado diretamente nos arquivos `.html`. 
Cada seção está bem comentada para facilitar a identificação e edição.

## 📦 Implantação no Netlify via GitHub

### Passo 1: Preparar o Repositório GitHub

1. Crie um repositório no GitHub
2. Faça upload de todos os arquivos do projeto
3. Certifique-se de que a estrutura está correta

### Passo 2: Conectar ao Netlify

1. Acesse [netlify.com](https://www.netlify.com/)
2. Clique em "Add new site" → "Import an existing project"
3. Escolha "GitHub" e autorize o acesso
4. Selecione o repositório do Leve Vida
5. Configure as opções de build:
   - **Build command**: (deixe vazio)
   - **Publish directory**: `/` (raiz do projeto)
6. Clique em "Deploy site"

### Passo 3: Configurar Domínio (Opcional)

1. No painel do Netlify, vá em "Domain settings"
2. Clique em "Add custom domain"
3. Siga as instruções para configurar seu domínio

## 🔧 Funcionalidades

### Menu Mobile
- Menu hamburger responsivo
- Fecha automaticamente ao clicar em um link
- Fecha ao clicar fora do menu

### Formulários
- Validação de campos obrigatórios
- Validação de formato de e-mail
- Mensagens de feedback para o usuário
- Prevenção de múltiplos envios

### Navegação
- Scroll suave entre seções
- Botão "voltar ao topo"
- Highlight do menu ativo

### Performance
- CSS e JS minificados
- Carregamento otimizado de fontes
- Imagens responsivas

## 📱 Responsividade

O site é totalmente responsivo com breakpoints em:
- **Mobile**: até 768px
- **Tablet**: 768px a 1024px
- **Desktop**: acima de 1024px

## 🛠️ Tecnologias Utilizadas

- HTML5 (semântico)
- CSS3 (variáveis, flexbox, grid)
- JavaScript (vanilla)
- Font Awesome 6.4.0 (ícones)

## 📧 Contato

- **E-mail**: equipelevevida@gmail.com
- **Telefone**: +55 (65) 99977-7000
- **Endereço**: Jardim Aclimaação, Cuiabá - MT, Brasil

## 🔗 Links Importantes

- **Link de compra do E-book**: https://mpago.la/2Zbmgga
- **Redes Sociais**: Configure os links no rodapé de cada página

## 📝 Checklist de Customização

Antes de publicar, certifique-se de:

- [ ] Adicionar logo personalizado
- [ ] Adicionar favicon
- [ ] Adicionar capa do e-book
- [ ] Configurar links das redes sociais
- [ ] Adicionar arquivos na pasta downloads
- [ ] Testar formulários
- [ ] Verificar informações de contato
- [ ] Testar responsividade em diferentes dispositivos
- [ ] Configurar Google Analytics (se necessário)
- [ ] Otimizar imagens para web

## 📄 Licença

© 2025 Leve Vida - Todos os direitos reservados

## 🆘 Suporte

Para suporte técnico ou dúvidas sobre customização, entre em contato através do e-mail: equipelevevida@gmail.com

---

**Desenvolvido com ❤️ para o Leve Vida**

Voe alto, Viva Leve! ✈️
