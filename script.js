// Inicializar Ícones da biblioteca Lucide
lucide.createIcons();

/* ===================================================
   1. ACESSIBILIDADE: TEMA CLARO E ESCURO
   =================================================== */
const btnTheme = document.getElementById('btn-theme');
const themeIcon = document.getElementById('theme-icon');

// Verificar preferência salva ou do sistema
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.setAttribute('data-lucide', 'sun');
    lucide.createIcons();
}

btnTheme.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = 'light';

    if (currentTheme !== 'dark') {
        newTheme = 'dark';
        themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        themeIcon.setAttribute('data-lucide', 'moon');
    }

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    lucide.createIcons();
});

/* ===================================================
   2. ACESSIBILIDADE: CONTROLE DO TAMANHO DA FONTE
   =================================================== */
let currentFontScale = 100; // Porcentagem inicial
const minScale = 80;
const maxScale = 140;
const step = 10;

const btnDecrease = document.getElementById('btn-decrease-font');
const btnReset = document.getElementById('btn-reset-font');
const btnIncrease = document.getElementById('btn-increase-font');

function updateFontSize(scale) {
    currentFontScale = scale;
    document.documentElement.style.setProperty('--base-font-size', `${currentFontScale}%`);
}

btnIncrease.addEventListener('click', () => {
    if (currentFontScale < maxScale) {
        updateFontSize(currentFontScale + step);
    }
});

btnDecrease.addEventListener('click', () => {
    if (currentFontScale > minScale) {
        updateFontSize(currentFontScale - step);
    }
});

btnReset.addEventListener('click', () => {
    updateFontSize(100);
});

/* ===================================================
   3. SISTEMA DO QUIZ INTERATIVO
   =================================================== */
const quizData = [
    {
        question: "Quanto tempo você costuma passar nas redes sociais por dia?",
        options: [
            { text: "Menos de 1 hora", score: 3 },
            { text: "Entre 1 e 3 horas", score: 2 },
            { text: "Mais de 4 horas", score: 1 }
        ]
    },
    {
        question: "Você costuma verificar a fonte das notícias antes de compartilhá-las?",
        options: [
            { text: "Sempre verifico em sites confiáveis", score: 3 },
            { text: "Às vezes, quando desconfio", score: 2 },
            { text: "Raramente, compartilho o que acho interessante", score: 1 }
        ]
    },
    {
        question: "Qual sua atitude em relação à privacidade dos seus dados na web?",
        options: [
            { text: "Uso autenticação em 2 etapas e limito permissões", score: 3 },
            { text: "Sei da importância, mas quase não altero as configurações", score: 2 },
            { text: "Aceito todos os cookies e termos sem ler", score: 1 }
        ]
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;

const quizProgress = document.getElementById('quiz-progress');
const quizQuestion = document.getElementById('quiz-question');
const quizOptions = document.getElementById('quiz-options');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const resultTitle = document.getElementById('result-title');
const resultDesc = document.getElementById('result-desc');
const btnRestart = document.getElementById('btn-restart');

function loadQuestion() {
    const q = quizData[currentQuestionIndex];
    quizProgress.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
    quizQuestion.textContent = q.question;
    
    quizOptions.innerHTML = '';
    
    q.options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.textContent = opt.text;
        btn.addEventListener('click', () => handleAnswer(opt.score));
        quizOptions.appendChild(btn);
    });
}

function handleAnswer(score) {
    totalScore += score;
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';

    if (totalScore >= 8) {
        resultTitle.textContent = "Consciência Digital Excelente!";
        resultDesc.textContent = "Parabéns! Você demonstra altos níveis de controle sobre seu tempo, privacidade e senso crítico em relação às informações virtuais.";
    } else if (totalScore >= 5) {
        resultTitle.textContent = "Uso Moderado com Pontos de Atenção";
        resultDesc.textContent = "Você está no caminho certo, mas pode melhorar sua relação com a tecnologia. Aplique algumas das soluções acima para proteger melhor seus dados e tempo.";
    } else {
        resultTitle.textContent = "Alerta: Alto Risco de Sobrecarga Digital";
        resultDesc.textContent = "Atenção! Seus hábitos digitais podem estar afetando sua privacidade ou saúde mental. Considere adotar o detox digital e reforçar sua segurança na web.";
    }
}

btnRestart.addEventListener('click', () => {
    currentQuestionIndex = 0;
    totalScore = 0;
    resultScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    loadQuestion();
});

// Inicializar Quiz
loadQuestion();