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
          <a class="btn-interesse" href="https://wa.me/551281196260?text=Olá! Tenho interesse na peça: ${encodeURIComponent(p.nome)}" target="_blank">
            Tenho interesse
          </a>
        </div>
        <div class="tags">
          ${p.tags.map(t => `<span class="tag">${capitalizar(t)}</span>`).join("")}
        </div>
      </div>
    `;

    if (temMultiplas) {
      const img = card.querySelector("img");
      const dots = card.querySelectorAll(".dot");

      const mostrarImagem = (index) => {
        const total = p.imagens.length;
        const novoIndex = (index + total) % total;
        card.dataset.imgIndex = novoIndex;
        img.src = p.imagens[novoIndex];
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

document.addEventListener("DOMContentLoaded", () => {
  renderFiltros();
  renderCatalogo();
  renderBusca();
});
