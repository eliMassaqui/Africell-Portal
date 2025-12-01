from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Página inicial
@app.route('/')
def home():
    return render_template('home.html')

# Página de login (simulação)
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        usuario = request.form['username']
        # Simula login sempre bem-sucedido
        return redirect(url_for('profile', username=usuario))
    return render_template('login.html')

# Página de registro (simulação)
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Finge que criou uma conta
        return redirect(url_for('login'))
    return render_template('register.html')

# Perfil simulado
@app.route('/profile/<username>')
def profile(username):
    pontos = 320  # Valor simulado
    nivel = "Explorador"
    badges = ["Quiz Master", "Top Fan"]
    return render_template('profile.html', username=username, pontos=pontos, nivel=nivel, badges=badges)

# Ranking fake
@app.route('/leaderboard')
def leaderboard():
    ranking = [
        {"nome": "Elísio", "pontos": 450},
        {"nome": "Ana", "pontos": 380},
        {"nome": "Carlos", "pontos": 330}
    ]
    return render_template('leaderboard.html', ranking=ranking)

# Quiz simulado
@app.route('/quiz')
def quiz():
    perguntas = [
        {"q": "Qual é a capital de Angola?", "a": ["Luanda", "Benguela", "Lubango"], "correta": 0},
        {"q": "Em que ano foi fundada a Africell Angola?", "a": ["2019", "2022", "2020"], "correta": 1}
    ]
    return render_template('quiz.html', perguntas=perguntas)

if __name__ == '__main__':
    app.run(debug=True)

