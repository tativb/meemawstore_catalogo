# Meemaw Store — Catálogo 3D

Catálogo online de peças impressas em 3D. MVP simples com filtros por tag, busca e botão de interesse via WhatsApp.

## Estrutura

```
meemawstore_catalogo/
├── index.html       # Página principal
├── style.css        # Estilos
├── app.js           # Lógica de filtros e renderização
├── data.js          # Dados dos produtos (edite aqui!)
└── imgs/
    └── placeholder/ # Imagem padrão para produtos sem foto
```

## Como adicionar produtos

Abra o `data.js` e adicione um novo objeto no array `produtos`:

```js
{
  id: 7,                          // número único
  nome: "Nome da Peça",
  preco: 15.00,
  categoria: "Categoria",
  tags: ["tag1", "tag2"],         // usado nos filtros
  material: "PLA",
  cores: ["Cor 1", "Cor 2"],
  descricao: "Descrição curta da peça.",
  imagem: "imgs/nome-da-foto.jpg" // coloque a foto na pasta imgs/
}
```

## Como adicionar fotos

1. Coloque as fotos na pasta `imgs/`
2. Atualize o campo `imagem` no `data.js` com o caminho correto

## WhatsApp

No `app.js`, substitua o número no link de interesse:

```
https://wa.me/5500000000000
```

Troque `5500000000000` pelo seu número com DDI + DDD + número (sem espaços ou símbolos).

## Publicar no GitHub Pages

1. Vá em **Settings** do repositório
2. Clique em **Pages**
3. Em *Source*, selecione a branch `main` e pasta `/root`
4. Salve — em alguns minutos o site estará no ar em `https://seuusuario.github.io/meemawstore_catalogo`
