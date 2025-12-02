 // ========== Funções de exibição ==========
function mostrarPagina(id) {
  document.querySelectorAll('.pagina').forEach(p => p.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  if (id === 'profile') carregarPerfil();
  if (id === 'leaderboard') carregarRanking();
}

// ========== Registro e Login simulados ==========
function registrar() {
  const user = document.getElementById('reg-user').value;
  const pass = document.getElementById('reg-pass').value;
  if (!user || !pass) return alert("Preencha todos os campos!");

  const novoUser = { nome: user, senha: pass, pontos: 0, nivel: "Novato", badges: [] };
  localStorage.setItem("usuario", JSON.stringify(novoUser));
  alert("Conta criada com sucesso!");
  mostrarPagina('login');
}

function login() {
  const user = document.getElementById('login-user').value;
  const pass = document.getElementById('login-pass').value;
  const dados = JSON.parse(localStorage.getItem('usuario'));

  if (dados && dados.nome === user && dados.senha === pass) {
    localStorage.setItem('logado', 'true');
    alert(`Bem-vindo de volta, ${user}!`);
    mostrarPagina('profile');
  } else {
    alert("Usuário ou senha incorretos!");
  }
}

function logout() {
  localStorage.removeItem('logado');
  mostrarPagina('home');
}

// ========== Perfil ==========
function carregarPerfil() {
  const user = JSON.parse(localStorage.getItem('usuario'));
  if (!user) return mostrarPagina('login');

  document.getElementById('perfil-nome').innerText = user.nome;
  document.getElementById('perfil-pontos').innerText = user.pontos;
  document.getElementById('perfil-nivel').innerText = user.nivel;
  document.getElementById('perfil-badges').innerText = user.badges.join(", ") || "Nenhuma";
}

// ========== Ranking (Fake) ==========
function carregarRanking() {
  const lista = document.getElementById('ranking-lista');
  const ranking = [
    { nome: "Elísio", pontos: 450 },
    { nome: "Ana", pontos: 380 },
    { nome: "Carlos", pontos: 330 }
  ];
  const user = JSON.parse(localStorage.getItem('usuario'));
  if (user) ranking.push({ nome: user.nome, pontos: user.pontos });

  lista.innerHTML = ranking.map(u => `<li>${u.nome} — ${u.pontos} pts</li>`).join('');
}

// ========== Quiz ==========
const perguntas = [
  { q: "Qual é a capital de Angola?", a: ["Luanda", "Benguela", "Lubango"], correta: 0 },
  { q: "Em que ano foi fundada a Africell Angola?", a: ["2019", "2022", "2020"], correta: 1 }
];

let quizIndex = 0;
let pontos = 0;

function iniciarQuiz() {
  quizIndex = 0;
  pontos = 0;
  mostrarPergunta();
}

function mostrarPergunta() {
  const container = document.getElementById('quiz-container');
  if (quizIndex < perguntas.length) {
    const p = perguntas[quizIndex];
    container.innerHTML = `<h3>${p.q}</h3>` +
      p.a.map((alt, i) => `<button onclick="responder(${i})">${alt}</button>`).join('');
  } else {
    container.innerHTML = `<h3>Fim do quiz! Pontos: ${pontos}</h3>`;
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user) {
      user.pontos += pontos;
      user.badges.push("Participante do Quiz");
      user.nivel = user.pontos > 300 ? "Explorador" : "Novato";
      localStorage.setItem('usuario', JSON.stringify(user));
    }
  }
}

function responder(idx) {
  if (idx === perguntas[quizIndex].correta) pontos += 10;
  quizIndex++;
  mostrarPergunta();
}

