# 📚 Sistema de Guias Dinâmicos - Documentação Completa

## 🎯 Visão Geral

Este sistema permite adicionar, editar e gerenciar guias de viagem **sem mexer no código HTML/CSS** do site. Todo o conteúdo é carregado dinamicamente de arquivos JSON.

---

## 🚀 Como Adicionar um Novo Guia

### Passo 1: Criar Pasta do Guia

Crie uma nova pasta em `/guias/` com o nome do seu destino (use letras minúsculas e hífens):

```
guias/
├── fortaleza/           ← Guia existente
└── rio-de-janeiro/      ← Novo guia
```

### Passo 2: Criar Arquivo `config.json`

Dentro da pasta do guia, crie um arquivo `config.json` com a estrutura completa do guia.

```
guias/rio-de-janeiro/config.json
```

### Passo 3: Registrar o Guia

Edite o arquivo `/assets/js/guias.js` e adicione o ID do novo guia na lista:

```javascript
const GUIAS_CONFIG = {
    diretorio: 'guias/',
    lista: [
        'fortaleza',
        'rio-de-janeiro'    ← Adicione aqui
    ]
};
```

### Passo 4: Fazer Upload no GitHub

```bash
git add guias/rio-de-janeiro/
git commit -m "Adiciona guia do Rio de Janeiro"
git push
```

**Pronto!** O guia aparecerá automaticamente em `guias.html`

---

## 📋 Estrutura do config.json

### Informações Básicas

```json
{
  "id": "rio-de-janeiro",
  "titulo": "Rio de Janeiro - Cidade Maravilhosa",
  "subtitulo": "O destino mais icônico do Brasil",
  "descricao": "Texto curto para o card na lista de guias",
  "destaque": true,
  "meta": {
    "duracao": "5-7 dias",
    "orcamento": "R$ 3.000",
    "clima": "22-30°C",
    "voos": "Voos diretos"
  },
  "icone": "fa-city",
  "cor": "#667eea",
  "imagem_capa": "URL_da_imagem_capa",
  "tags": ["praia", "cidade", "cultura"],
  "secoes": [...]
}
```

### Tipos de Seções Disponíveis

#### 1. Seção de Texto

```json
{
  "id": "introducao",
  "tipo": "texto",
  "titulo": "Introdução",
  "icone": "fa-info-circle",
  "conteudo": "Texto da introdução aqui...",
  "imagem": "URL_opcional_da_imagem"
}
```

#### 2. Seção de Cards (Praias, Atrações, etc)

```json
{
  "id": "praias",
  "tipo": "cards",
  "titulo": "Principais Praias",
  "icone": "fa-umbrella-beach",
  "items": [
    {
      "titulo": "Copacabana",
      "emoji": "🏖️",
      "descricao": "A praia mais famosa do Rio...",
      "imagem": "URL_da_imagem",
      "destaque": ["Calçadão", "Vida noturna", "Esportes"]
    }
  ]
}
```

#### 3. Seção de Tabela

```json
{
  "id": "comparativo",
  "tipo": "tabela",
  "titulo": "Comparativo de Praias",
  "icone": "fa-table",
  "colunas": ["Praia", "Distância", "Ondas", "Infraestrutura"],
  "linhas": [
    ["Copacabana", "Centro", "Fortes", "Completa"],
    ["Ipanema", "Zona Sul", "Moderadas", "Completa"]
  ]
}
```

#### 4. Seção de Lista (Pontos Turísticos)

```json
{
  "id": "pontos",
  "tipo": "lista",
  "titulo": "Pontos Turísticos",
  "icone": "fa-map-marked-alt",
  "items": [
    {
      "titulo": "Cristo Redentor",
      "tipo": "Monumento",
      "descricao": "Uma das 7 maravilhas do mundo moderno...",
      "dica": "Vá cedo para evitar filas"
    }
  ]
}
```

#### 5. Seção de Gastronomia

```json
{
  "id": "gastronomia",
  "tipo": "gastronomia",
  "titulo": "O que Comer",
  "icone": "fa-utensils",
  "items": [
    {
      "nome": "Feijoada",
      "emoji": "🍲",
      "descricao": "Prato típico brasileiro...",
      "onde": "Restaurantes tradicionais",
      "preco": "R$ 40-60",
      "imagem": "URL_da_imagem"
    }
  ]
}
```

#### 6. Seção de Orçamento

```json
{
  "id": "orcamento",
  "tipo": "orcamento",
  "titulo": "Quanto Custa?",
  "icone": "fa-money-bill-wave",
  "opcoes": [
    {
      "nivel": "Econômico",
      "cor": "#4caf50",
      "total": "R$ 2.000",
      "items": [
        {"item": "Passagem", "valor": "R$ 400"},
        {"item": "Hospedagem", "valor": "R$ 700"}
      ]
    }
  ]
}
```

#### 7. Seção de Dicas

```json
{
  "id": "dicas",
  "tipo": "dicas",
  "titulo": "Dicas Práticas",
  "icone": "fa-lightbulb",
  "items": [
    {
      "tipo": "info",
      "titulo": "Melhor Época",
      "icone": "fa-calendar",
      "conteudo": "Dezembro a Março..."
    },
    {
      "tipo": "warning",
      "titulo": "Segurança",
      "icone": "fa-shield-alt",
      "conteudo": "Evite ostentar..."
    },
    {
      "tipo": "tip",
      "titulo": "Economia",
      "icone": "fa-piggy-bank",
      "conteudo": "Use transporte público..."
    }
  ]
}
```

### Materiais para Download

```json
{
  "download_materiais": [
    {
      "titulo": "Checklist de Viagem",
      "descricao": "Lista completa do que levar",
      "icone": "fa-list-check",
      "arquivo": "rio-checklist.pdf"
    }
  ]
}
```

---

## 🎨 Ícones Disponíveis (Font Awesome)

### Destinos:
- `fa-umbrella-beach` - Praias
- `fa-mountain` - Montanhas
- `fa-city` - Cidades
- `fa-landmark` - Monumentos
- `fa-torii-gate` - Ásia
- `fa-flag-usa` - EUA
- `fa-water` - Caribe

### Categorias:
- `fa-utensils` - Gastronomia
- `fa-map-marked-alt` - Pontos turísticos
- `fa-money-bill-wave` - Orçamento
- `fa-calendar-alt` - Datas
- `fa-lightbulb` - Dicas
- `fa-info-circle` - Informações
- `fa-shield-alt` - Segurança
- `fa-piggy-bank` - Economia

**Ver todos:** https://fontawesome.com/icons

---

## 📸 Imagens

### Onde Hospedar Imagens:

**Opção 1: Unsplash (Recomendado)**
```
https://images.unsplash.com/photo-ID?w=1200&h=400&fit=crop
```
- Gratuito
- Alta qualidade
- Rápido

**Opção 2: GitHub**
```
guias/rio-de-janeiro/imagens/praia.jpg
```
- Adicione pasta `imagens/` no guia
- Faça upload das fotos
- Use caminho relativo

**Opção 3: Cloud (Google Drive, Dropbox)**
- Gere link público
- Cole no JSON

### Tamanhos Recomendados:

- **Capa do guia:** 1600x600px
- **Imagens de seção:** 1200x400px
- **Cards:** 1200x300px
- **Gastronomia:** 400x250px

---

## 📂 Estrutura de Arquivos do Guia

```
guias/
└── rio-de-janeiro/
    ├── config.json          ← Configuração principal (OBRIGATÓRIO)
    ├── imagens/             ← Pasta opcional para imagens
    │   ├── capa.jpg
    │   ├── praia1.jpg
    │   └── praia2.jpg
    └── downloads/           ← Materiais para download
        ├── checklist.pdf
        └── mapa.pdf
```

---

## 🔧 Editando Guias Existentes

### Via GitHub (Interface Web):

1. Acesse o repositório no GitHub
2. Navegue até `guias/fortaleza/config.json`
3. Clique no ícone de lápis (Edit)
4. Faça suas alterações
5. Commit changes
6. Aguarde 1-2 minutos (Netlify atualiza)

### Via Editor Local:

1. Clone o repositório
2. Edite `guias/[destino]/config.json`
3. Git commit e push
4. Pronto!

---

## ✅ Checklist para Novo Guia

- [ ] Criar pasta `guias/[nome-do-guia]/`
- [ ] Criar `config.json` com estrutura completa
- [ ] Adicionar ID em `assets/js/guias.js`
- [ ] Escolher ícone apropriado
- [ ] Adicionar imagens de alta qualidade
- [ ] Revisar textos (gramática, ortografia)
- [ ] Testar localmente (opcional)
- [ ] Fazer upload no GitHub
- [ ] Verificar no site (aguardar 2 min)
- [ ] Compartilhar nas redes sociais!

---

## 🐛 Resolução de Problemas

### Guia não aparece na lista:

1. Verifique se adicionou o ID em `/assets/js/guias.js`
2. Confirme que o arquivo é `config.json` (não `config.txt`)
3. Valide o JSON em https://jsonlint.com
4. Limpe cache do navegador (Ctrl+Shift+R)

### Imagens não carregam:

1. Verifique se a URL está correta
2. Teste a URL diretamente no navegador
3. Certifique-se que a imagem é pública
4. Use HTTPS (não HTTP)

### Erro ao carregar guia:

1. Valide JSON em https://jsonlint.com
2. Verifique vírgulas e aspas
3. Certifique-se que todos os campos obrigatórios estão preenchidos
4. Abra console do navegador (F12) para ver erro específico

---

## 🎓 Exemplos Prontos

### Guia Simples (Praia):

```json
{
  "id": "jericoacoara",
  "titulo": "Jericoacoara - Paraíso do Vento",
  "subtitulo": "Uma das 10 praias mais bonitas do mundo",
  "descricao": "Guia completo de Jericoacoara com dicas de hospedagem, passeios e como chegar.",
  "meta": {
    "duracao": "4-7 dias",
    "orcamento": "R$ 1.800",
    "clima": "28-32°C"
  },
  "icone": "fa-umbrella-beach",
  "imagem_capa": "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=1600&h=600&fit=crop",
  "secoes": [
    {
      "tipo": "texto",
      "titulo": "Sobre Jericoacoara",
      "icone": "fa-info-circle",
      "conteudo": "Jericoacoara é uma vila de pescadores transformada em destino turístico..."
    }
  ]
}
```

### Guia Completo (Cidade):

Veja `guias/fortaleza/config.json` como referência completa.

---

## 💡 Dicas de Conteúdo

### Escrita:

- **Seja específico:** "R$ 2.500" em vez de "barato"
- **Use números:** "Top 5" em vez de "várias"
- **Inclua preços:** Sempre que possível
- **Dê dicas práticas:** "Chegue 30 min antes"

### Estrutura:

- **Comece com intro:** Apresente o destino
- **Organize por tópicos:** Praias, pontos, gastronomia
- **Inclua orçamento:** 3 níveis (econômico, médio, confortável)
- **Finalize com dicas:** Segurança, melhor época

### SEO:

- **Use palavras-chave:** Nome do destino, "guia de viagem"
- **Títulos descritivos:** "Praias do Rio" não "Praias"
- **Tags relevantes:** Máximo 5-7 tags

---

## 📞 Suporte

**Dúvidas?**
- 📧 E-mail: equipelevevida@gmail.com
- 📱 WhatsApp: +55 (65) 99977-7000

**Recursos:**
- Validador JSON: https://jsonlint.com
- Ícones Font Awesome: https://fontawesome.com/icons
- Imagens Unsplash: https://unsplash.com

---

## 🎉 Próximos Guias Sugeridos

Prioridade alta:
- [ ] Rio de Janeiro
- [ ] São Paulo
- [ ] Salvador
- [ ] Florianópolis
- [ ] Foz do Iguaçu

Internacionais:
- [ ] Lisboa
- [ ] Buenos Aires
- [ ] Patagônia
- [ ] Machu Picchu

---

**Última atualização:** Novembro 2024
**Versão do Sistema:** 2.0

Voe alto, Viva Leve! ✈️
