window.onload = function() {
    mostrarPagina('home');
    atualizarPerfil();
};

// ===== Navegação =====
function mostrarPagina(id){
    document.querySelectorAll('.pagina').forEach(p=>p.style.display='none');
    document.getElementById(id).style.display='block';
}

// ===== Dados do Jogador =====
let usuario = JSON.parse(localStorage.getItem('usuario')) || {
    pontos: 100,
    xp: 0,
    streak: 0
};

// ===== Sistema de badges =====
const badges = [
    {nome:"Viajante", xp:1000},
    {nome:"Explorador", xp:5000},
    {nome:"Soba", xp:10000},
    {nome:"Feiticeiro", xp:30000},
    {nome:"Mestre", xp:50000},
    {nome:"Lendário", xp:500000}
];

// ===== Províncias com raridade, habilidades e risco =====
const provincias = [
    {nome:"Luanda", raridade:"epica", xp:15, habilidade:"dobraProximoMB", risco:0.6},
    {nome:"Huíla", raridade:"rara", xp:10, habilidade:"xpExtra", risco:0.4},
    {nome:"Benguela", raridade:"rara", xp:10, habilidade:"cartaBonus", risco:0.4},
    {nome:"Namibe", raridade:"rara", xp:10, habilidade:"xpExtra", risco:0.4},
    {nome:"Lunda-Sul", raridade:"rara", xp:10, habilidade:"xpExtra", risco:0.4},
    {nome:"Huambo", raridade:"rara", xp:10, habilidade:"cartaRaraExtra", risco:0.4},
    // Baixo risco 5-20%
    {nome:"Moxico", raridade:"comum", xp:5, habilidade:"bonusStreak", risco:0.05 + Math.random()*0.15},
    {nome:"Lunda-Norte", raridade:"comum", xp:5, habilidade:"bonusStreak", risco:0.05 + Math.random()*0.15},
    {nome:"Cunene", raridade:"comum", xp:5, habilidade:"badgeAleatoria", risco:0.05 + Math.random()*0.15},
    {nome:"Malanje", raridade:"comum", xp:5, habilidade:"badgeAleatoria", risco:0.05 + Math.random()*0.15},
    {nome:"Cabinda", raridade:"comum", xp:5, habilidade:"mb50chance", risco:0.05 + Math.random()*0.15},
    {nome:"Bié", raridade:"comum", xp:5, habilidade:"xp50chance", risco:0.05 + Math.random()*0.15},
    {nome:"Bengo", raridade:"comum", xp:5, habilidade:"aleatorio", risco:0.05 + Math.random()*0.15},
    {nome:"Cuanza Norte", raridade:"comum", xp:5, habilidade:"equilibrada", risco:0.05 + Math.random()*0.15},
    {nome:"Cuanza Sul", raridade:"comum", xp:5, habilidade:"aleatorio", risco:0.05 + Math.random()*0.15},
    {nome:"Cuando Cubango", raridade:"comum", xp:5, habilidade:"aleatorio", risco:0.05 + Math.random()*0.15},
    {nome:"Uíge", raridade:"comum", xp:5, habilidade:"mbExtra", risco:0.05 + Math.random()*0.15},
    {nome:"Zaire", raridade:"comum", xp:5, habilidade:"aleatorio", risco:0.05 + Math.random()*0.15}
];

// ===== Criar Cartas =====
function criarCartas(){
    const container = document.getElementById('cartas');
    container.innerHTML = '';
    provincias.forEach(p=>{
        const card = document.createElement('div');
        card.className = `card ${p.raridade}`;
        card.innerText = p.nome;
        card.addEventListener('click', ()=>selecionarCarta(p));
        container.appendChild(card);
    });
}

// ===== Atualizar Perfil =====
function atualizarPerfil(){
    document.getElementById('perfil-xp').innerText = usuario.xp;
    document.getElementById('perfil-mb').innerText = usuario.pontos;

    document.getElementById('perfil-xp-profile').innerText = usuario.xp;
    document.getElementById('perfil-mb-profile').innerText = usuario.pontos;

    // Atualizar badges
    const badgesDiv = document.getElementById('badges-list');
    badgesDiv.innerHTML = '';
    let ultimoDesbloqueado = null;

    badges.forEach(b=>{
        const span = document.createElement('span');
        span.className = 'badge';
        span.innerText = b.nome;
        if(usuario.xp >= b.xp){
            span.classList.add('desbloqueado');
            ultimoDesbloqueado = span;
        } else {
            span.classList.add('bloqueado');
        }
        badgesDiv.appendChild(span);
    });

    if(ultimoDesbloqueado) ultimoDesbloqueado.classList.add('atual');

    localStorage.setItem('usuario', JSON.stringify(usuario));
}

// ===== Iniciar Jogo =====
function iniciarJogo(){
    criarCartas();
    document.getElementById('mensagens').innerHTML = '';
}

// ===== Mensagens Lateral =====
function adicionarMensagem(texto){
    const mensagensDiv = document.getElementById('mensagens');
    const msg = document.createElement('div');
    msg.innerHTML = texto;
    mensagensDiv.prepend(msg);
    if(mensagensDiv.children.length > 10) mensagensDiv.removeChild(mensagensDiv.lastChild);
}

// ===== Selecionar Carta =====
function selecionarCarta(carta){
    const perda = Math.random() < carta.risco;

    if(perda){
        usuario.pontos = Math.floor(usuario.pontos/2);
        usuario.xp = Math.floor(usuario.xp/2);
        adicionarMensagem(`⚠️ ${carta.nome} te enganou! Perdeu parte do MB e XP.`);
    } else {
        let ganhoXP = carta.xp;
        let multiplicador = 1;
        if(carta.raridade==="rara") multiplicador=1.5;
        else if(carta.raridade==="epica") multiplicador=2;

        usuario.xp += ganhoXP;
        usuario.pontos += Math.floor(ganhoXP*multiplicador);
        adicionarMensagem(`🎉 Visitou ${carta.nome}: +${ganhoXP} XP, +${Math.floor(ganhoXP*multiplicador)} MB`);
    }

    atualizarPerfil();
}
