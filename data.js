const produtos = [
  {
    id: 1,
    nome: "Suporte Apple Watch",
    preco: 25.80,
    categoria: "Suportes",
    tags: ["suportes", "até 30 reais"],
    material: "PLA",
    cores: ["Diversas cores disponíveis"],
    descricao: "Suporte para Apple Watch, prático e elegante para sua mesa.",
    imagens: ["imgs/suportes/SuporteCarregadorApplewatch.jpg"]
  },
  {
    id: 2,
    nome: "Suporte iPhone 17",
    preco: 46.68,
    categoria: "Suportes",
    tags: ["suportes", "até 50 reais"],
    material: "PLA",
    cores: ["Diversas cores disponíveis"],
    descricao: "Suporte para iPhone 17, ideal para mesa ou escritório.",
    imagens: ["imgs/suportes/SuporteIphone.jpg"]
  },
  {
    id: 3,
    nome: "Suporte Hot Wheels 4 carrinhos (modular)",
    preco: 22.06,
    categoria: "Suportes",
    tags: ["suportes", "até 30 reais"],
    material: "PLA",
    cores: ["Diversas cores disponíveis"],
    descricao: "Suporte modular para 4 carrinhos Hot Wheels. Pode ser expandido!",
    imagens: ["imgs/suportes/SuporteHotWhells.jpg"]
  },
  {
    id: 4,
    nome: "Suporte Jogo de Cartas",
    preco: 40.02,
    categoria: "Suportes",
    tags: ["suportes", "até 50 reais"],
    material: "PLA",
    cores: ["Diversas cores disponíveis"],
    descricao: "Suporte organizador para baralho e jogos de cartas.",
    imagens: ["imgs/suportes/jogosCartas_1.jpg", "imgs/suportes/jogosCartas_2.jpg", "imgs/suportes/jogosCartas_3.jpg", "imgs/suportes/jogosCartas_4.jpg"]
  },
  {
    id: 5,
    nome: "Vaso Estilo Lego 15cm",
    preco: 63.30,
    categoria: "Utilidades",
    tags: ["utilidades", "até 70 reais"],
    material: "PLA",
    cores: ["Diversas cores disponíveis"],
    descricao: "Vaso decorativo estilo Lego com 15cm de altura. Charmoso e divertido.",
    imagens: ["imgs/utilidades/vasoEstiloLego15cm.jpg"]
  },
  {
    id: 6,
    nome: "Vaso Carinha Coração 6cm",
    preco: 32.08,
    categoria: "Utilidades",
    tags: ["utilidades", "até 40 reais"],
    material: "PLA",
    cores: ["Diversas cores disponíveis"],
    descricao: "Vasinho fofo com carinha de coração, 6cm de diâmetro. Perfeito para suculentas.",
    imagens: ["imgs/placeholder/placeholder.jpg"]
  },
  {
    id: 7,
    nome: "Porta Copos Costela de Adão (kit 6un)",
    preco: 73.26,
    categoria: "Utilidades",
    tags: ["utilidades", "até 80 reais", "kit"],
    material: "PLA",
    cores: ["Diversas cores disponíveis"],
    descricao: "Kit com 6 porta copos com estampa de Costela de Adão. Decorativo e funcional.",
    imagens: ["imgs/kits/KitCostelaAdao.jpg"]
  },
  {
    id: 8,
    nome: "Porta Guardanapos Costela de Adão",
    preco: 39.98,
    categoria: "Utilidades",
    tags: ["utilidades", "até 40 reais"],
    material: "PLA",
    cores: ["Diversas cores disponíveis"],
    descricao: "Porta guardanapos com estampa de Costela de Adão. Lindo para a mesa de jantar.",
    imagens: ["imgs/placeholder/placeholder.jpg"]
  },
  {
    id: 9,
    nome: "Porta Copos Sakurá (kit 6un)",
    preco: 64.36,
    categoria: "Utilidades",
    tags: ["utilidades", "até 70 reais", "kit"],
    material: "PLA",
    cores: ["Diversas cores disponíveis"],
    descricao: "Kit com 6 porta copos com estampa de Sakurá. Delicado e elegante.",
    imagens: ["imgs/placeholder/placeholder.jpg"]
  },
  {
    id: 10,
    nome: "Porta Foto Tulipa",
    preco: 14.42,
    categoria: "Utilidades",
    tags: ["utilidades", "até 20 reais"],
    material: "PLA",
    cores: ["Diversas cores disponíveis"],
    descricao: "Porta foto em formato de tulipa. Perfeito para guardar memórias especiais.",
    imagens: ["imgs/placeholder/placeholder.jpg"]
  },
  {
    id: 11,
    nome: "Vaso Elegante 15cm",
    preco: 50.00,
    categoria: "Utilidades",
    tags: ["utilidades", "até 50 reais"],
    material: "PLA",
    cores: ["Diversas cores disponíveis"],
    descricao: "Vaso elegante com 15cm de altura, design sofisticado para qualquer ambiente.",
    imagens: ["imgs/placeholder/placeholder.jpg"]
  },
  {
    id: 12,
    nome: "Quadro Cristão",
    preco: 54.42,
    categoria: "Religiosos",
    tags: ["religiosos", "até 60 reais"],
    material: "PLA",
    cores: ["Diversas cores disponíveis"],
    descricao: "Quadro decorativo com tema cristão. Lindo para presentear ou decorar.",
    imagens: ["imgs/religiosos/QuadroCristao_1.jpg"]
  },
  {
    id: 13,
    nome: "Marcador de Livro Cristão (kit 5un)",
    preco: 9.80,
    categoria: "Religiosos",
    tags: ["religiosos", "até 10 reais", "kit"],
    material: "PLA",
    cores: ["Diversas cores disponíveis"],
    descricao: "Kit com 5 marcadores de livro com tema cristão. Ótimo para presentear.",
    imagens: ["imgs/religiosos/marcadorCristao_1.jpg", "imgs/religiosos/marcadorCristao_2.jpeg"]
  },
  {
    id: 14,
    nome: "Nossa Senhora Aparecida 7cm",
    preco: 20.68,
    categoria: "Religiosos",
    tags: ["religiosos", "até 30 reais", "figuras"],
    material: "PLA",
    cores: ["Diversas cores disponíveis"],
    descricao: "Imagem de Nossa Senhora Aparecida com 7cm. Delicada e cheia de fé.",
    imagens: ["imgs/placeholder/placeholder.jpg"]
  },
  {
    id: 15,
    nome: "Chaveiro Fé",
    preco: 9.50,
    categoria: "Chaveiros",
    tags: ["chaveiros", "até 10 reais", "religiosos"],
    material: "PLA",
    cores: ["Diversas cores disponíveis"],
    descricao: "Chaveiro com a palavra Fé em relevo. Singelo e cheio de significado.",
    imagens: ["imgs/placeholder/placeholder.jpg"]
  },
  {
    id: 16,
    nome: "Patolino Batman",
    preco: 0.00,
    categoria: "Figuras",
    tags: ["figuras"],
    material: "PLA",
    cores: ["Diversas cores disponíveis"],
    descricao: "Figura do Patolino vestido de Batman. Colecionável e divertido.",
    imagens: ["imgs/figuras/PatolinoBatman.jpg"]
  }
];