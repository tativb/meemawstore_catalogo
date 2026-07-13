const state = {
  categoria: "todas",
  preco: "todos"
};

const faixasPreco = [
  { label: "Até R$ 15",     valor: "ate15",   fn: p => p.preco <= 15 },
  { label: "Até R$ 30",     valor: "ate30",   fn: p => p.preco <= 30 },
  { label: "Até R$ 50",     valor: "ate50",   fn: p => p.preco <= 50 },
  { label: "Acima de R$ 50",valor: "acima50", fn: p => p.preco > 50 }
];

function todasAsCategorias() {
  const cats = new Set(produtos.map(p => p.categoria));
  return Array.from(cats).sort();
}

function renderFiltros() {
  const container = document.getElementById("filtros");
  container.innerHTML = "";

  // ── Seção Categorias ──
  const secCat = document.createElement("div");
  secCat.className = "filtro-secao";
  secCat.innerHTML = `<span class="filtro-secao-label">Categoria</span>`;

  const grupoCat = document.createElement("div");
  grupoCat.className = "filtro-grupo";

  [{ label: "Todas", valor: "todas" }, ...todasAsCategorias().map(c => ({ label: c, valor: c }))]
    .forEach(({ label, valor }) => {
      const btn = criarBtn(label, valor, "categoria");
      grupoCat.appendChild(btn);
    });

  secCat.appendChild(grupoCat);
  container.appendChild(secCat);

  // ── Seção Preço ──
  const secPreco = document.createElement("div");
  secPreco.className = "filtro-secao";
  secPreco.innerHTML = `<span class="filtro-secao-label">Preço</span>`;

  const grupoPreco = document.createElement("div");
  grupoPreco.className = "filtro-grupo";

  const btnTodosPreco = criarBtn("Todos", "todos", "preco");
  grupoPreco.appendChild(btnTodosPreco);

  faixasPreco.forEach(({ label, valor }) => {
    grupoPreco.appendChild(criarBtn(label, valor, "preco"));
  });

  secPreco.appendChild(grupoPreco);
  container.appendChild(secPreco);
}

function criarBtn(label, valor, tipo) {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.className = "btn-filtro" + (state[tipo] === valor ? " ativo" : "");
  btn.dataset.valor = valor;
  btn.dataset.tipo = tipo;
  btn.addEventListener("click", () => {
    state[tipo] = valor;
    document.querySelectorAll(`.btn-filtro[data-tipo="${tipo}"]`)
      .forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");
    renderCatalogo();
  });
  return btn;
}

function produtosFiltrados() {
  return produtos.filter(p => {
    const passaCat = state.categoria === "todas" || p.categoria === state.categoria;
    const faixa = faixasPreco.find(f => f.valor === state.preco);
    const passaPreco = !faixa || faixa.fn(p);
    return passaCat && passaPreco;
  });
}

function renderCatalogo() {
  const grid = document.getElementById("catalogo");
  grid.innerHTML = "";

  const filtrados = produtosFiltrados();

  if (filtrados.length === 0) {
    grid.innerHTML = `<p class="vazio">Nenhuma peça encontrada com esse filtro.</p>`;
    return;
  }

  filtrados.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.imgIndex = "0";

    const temMultiplas = p.imagens.length > 1;

    card.innerHTML = `
      <div class="card-img">
        <img src="${p.imagens[0]}" alt="${p.nome}" onerror="this.src='imgs/placeholder/placeholder.jpg'">
        ${temMultiplas ? `
          <button class="carrossel-btn prev" aria-label="Foto anterior">‹</button>
          <button class="carrossel-btn next" aria-label="Próxima foto">›</button>
          <div class="carrossel-dots">
            ${p.imagens.map((_, i) => `<span class="dot${i === 0 ? " ativo" : ""}"></span>`).join("")}
          </div>
        ` : ""}
      </div>
      <div class="card-body">
        <span class="categoria">${p.categoria}</span>
        <h3>${p.nome}</h3>
        <p class="descricao">${p.descricao}</p>
        <div class="card-footer">
          <span class="preco">R$ ${p.preco.toFixed(2).replace(".", ",")}</span>
          <a class="btn-interesse" href="https://wa.me/5500000000000?text=Olá! Tenho interesse na peça: ${encodeURIComponent(p.nome)}" target="_blank">
            Tenho interesse
          </a>
        </div>
        <div class="tags">
          ${p.tags.map(t => `<span class="tag">${capitalizar(t)}</span>`).join("")}
        </div>
      </div>
    `;

    const imgEl = card.querySelector("img");

    if (temMultiplas) {
      const dots = card.querySelectorAll(".dot");

      const mostrarImagem = (index) => {
        const total = p.imagens.length;
        const novoIndex = (index + total) % total;
        card.dataset.imgIndex = novoIndex;
        imgEl.src = p.imagens[novoIndex];
        dots.forEach((d, i) => d.classList.toggle("ativo", i === novoIndex));
      };

      card.querySelector(".prev").addEventListener("click", (e) => {
        e.stopPropagation();
        mostrarImagem(parseInt(card.dataset.imgIndex) - 1);
      });
      card.querySelector(".next").addEventListener("click", (e) => {
        e.stopPropagation();
        mostrarImagem(parseInt(card.dataset.imgIndex) + 1);
      });
    }

    // Abre modal ao clicar na foto
    imgEl.addEventListener("click", () => {
      abrirModal(p.imagens, parseInt(card.dataset.imgIndex) || 0);
    });

    grid.appendChild(card);
  });
}

function renderBusca() {
  const input = document.getElementById("busca");
  input.addEventListener("input", () => {
    const termo = input.value.toLowerCase();
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
      const nome = card.querySelector("h3").textContent.toLowerCase();
      const desc = card.querySelector(".descricao").textContent.toLowerCase();
      card.style.display = (nome.includes(termo) || desc.includes(termo)) ? "" : "none";
    });
  });
}

function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Modal ──
const modal = document.createElement("div");
modal.id = "modal";
modal.innerHTML = `
  <div class="modal-overlay"></div>
  <div class="modal-box">
    <button class="modal-fechar" aria-label="Fechar">✕</button>
    <button class="modal-nav prev" aria-label="Foto anterior">‹</button>
    <img class="modal-img" src="" alt="" />
    <button class="modal-nav next" aria-label="Próxima foto">›</button>
    <div class="modal-dots"></div>
    <div class="modal-counter"></div>
  </div>
`;
document.body.appendChild(modal);

const modalState = { imagens: [], index: 0 };

function abrirModal(imagens, index) {
  modalState.imagens = imagens;
  modalState.index = index;
  atualizarModal();
  modal.classList.add("ativo");
  document.body.style.overflow = "hidden";
}

function fecharModal() {
  modal.classList.remove("ativo");
  document.body.style.overflow = "";
}

function atualizarModal() {
  const { imagens, index } = modalState;
  modal.querySelector(".modal-img").src = imagens[index];
  modal.querySelector(".modal-counter").textContent = imagens.length > 1
    ? `${index + 1} / ${imagens.length}` : "";

  const dotsEl = modal.querySelector(".modal-dots");
  dotsEl.innerHTML = imagens.length > 1
    ? imagens.map((_, i) => `<span class="dot${i === index ? " ativo" : ""}"></span>`).join("") : "";

  modal.querySelector(".modal-nav.prev").style.display = imagens.length > 1 ? "" : "none";
  modal.querySelector(".modal-nav.next").style.display = imagens.length > 1 ? "" : "none";
}

function navModal(dir) {
  const total = modalState.imagens.length;
  modalState.index = (modalState.index + dir + total) % total;
  atualizarModal();
}

modal.querySelector(".modal-fechar").addEventListener("click", fecharModal);
modal.querySelector(".modal-overlay").addEventListener("click", fecharModal);
modal.querySelector(".modal-nav.prev").addEventListener("click", () => navModal(-1));
modal.querySelector(".modal-nav.next").addEventListener("click", () => navModal(1));

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("ativo")) return;
  if (e.key === "Escape") fecharModal();
  if (e.key === "ArrowLeft") navModal(-1);
  if (e.key === "ArrowRight") navModal(1);
});

document.addEventListener("DOMContentLoaded", () => {
  renderFiltros();
  renderCatalogo();
  renderBusca();
});
