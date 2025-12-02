from flask import Flask, render_template_string, url_for

app = Flask(__name__)
app.secret_key = "supersecretkey"

html_template = """
<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8">
<title>Mini Balatro Angolano ⚡</title>
<link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
</head>
<body>

<header>
  <h1>Africell Portal ⚡</h1>
  <nav>
    <a href="#" onclick="mostrarPagina('home')">Início</a>
    <a href="#" onclick="mostrarPagina('jogo'); iniciarJogo();">Mini Balatro</a>
    <a href="#" onclick="mostrarPagina('profile')">Perfil</a>
  </nav>
</header>

<main>
  <!-- HOME -->
  <section id="home" class="pagina" style="display:block;">
    <h2>Bem-vindo ao Balatro Angolano!</h2>
    <p>Escolha cartas de províncias e ganhe MB, XP e badges!</p>
    <button onclick="mostrarPagina('jogo'); iniciarJogo();">Começar ⚡</button>
  </section>

  <!-- JOGO -->
  <section id="jogo" class="pagina">
    <div id="jogo-container">
      <!-- Perfil / Pontuação -->
      <div id="perfil-container">
        <div><strong>MB:</strong> <span id="perfil-mb">100</span></div>
        <div><strong>XP:</strong> <span id="perfil-xp">0</span></div>
      </div>

      <!-- Conteúdo central: cartas + mensagens lateral -->
      <div id="balatro-lateral">
        <!-- Grid de cartas -->
        <div id="cartas"></div>
        <!-- Caixa de mensagens lateral -->
        <div id="mensagens"></div>
      </div>
    </div>
  </section>

  <!-- PERFIL -->
  <section id="profile" class="pagina">
    <h2>Perfil do Jogador</h2>
    <div><strong>MB:</strong> <span id="perfil-mb-profile">100</span></div>
    <div><strong>XP:</strong> <span id="perfil-xp-profile">0</span></div>
    <h3>Badges:</h3>
    <div id="badges-list"></div>
  </section>
</main>

<script src="{{ url_for('static', filename='js/jogo.js') }}"></script>
</body>
</html>
"""

@app.route("/")
def home():
    return render_template_string(html_template)

if __name__ == "__main__":
    app.run(debug=True)
