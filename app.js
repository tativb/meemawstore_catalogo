const state = {
  filtroAtivo: "todos"
};

function todasAsTags() {
  const tags = new Set();
  produtos.forEach(p => p.tags.forEach(t => tags.add(t)));
  return Array.from(tags).sort();
}

function renderFiltros() {
  const container = document.getElementById("filtros");
  const tags = todasAsTags();

  const btnTodos = criarBtnFiltro("Todos", "todos");
  container.appendChild(btnTodos);

  tags.forEach(tag => {
    container.appendChild(criarBtnFiltro(capitalizar(tag), tag));
  });
}

function criarBtnFiltro(label, valor) {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.className = "btn-filtro" + (valor === state.filtroAtivo ? " ativo" : "");
  btn.dataset.filtro = valor;
  btn.addEventListener("click", () => {
    state.filtroAtivo = valor;
    document.querySelectorAll(".btn-filtro").forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");
    renderCatalogo();
  });
  return btn;
}

function renderCatalogo() {
  const grid = document.getElementById("catalogo");
  grid.innerHTML = "";

  const filtrados = state.filtroAtivo === "todos"
    ? produtos
    : produtos.filter(p => p.tags.includes(state.filtroAtivo));

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