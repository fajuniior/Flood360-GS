/**
 * Quiz de Risco de Enchente
 * Flood360 - Prevenção de Enchentes
 */

document.addEventListener("DOMContentLoaded", function () {
  // Perguntas do Quiz de Risco
  const quizQuestions = [
    {
      question: "Você mora próximo a algum rio, lago ou canal que já transbordou?",
      options: [
        { text: "Sim, várias vezes", points: 3 },
        { text: "Às vezes, em grandes chuvas", points: 2 },
        { text: "Raramente, mas já aconteceu", points: 1 },
        { text: "Não, nunca aconteceu", points: 0 },
      ],
    },
    {
      question: "Sua casa possui sistema de drenagem (ralos, calhas, sarjetas) bem conservado?",
      options: [
        { text: "Sim, muito bem conservado", points: 0 },
        { text: "Funciona razoavelmente", points: 1 },
        { text: "Quase não funciona", points: 2 },
        { text: "Não possui/está muito ruim", points: 3 },
      ],
    },
    {
      question: "O terreno onde você mora é de baixa, média ou alta altitude?",
      options: [
        { text: "Alta altitude (colina, morro)", points: 0 },
        { text: "Média altitude", points: 1 },
        { text: "Baixa altitude (próximo ao nível da água)", points: 3 },
        { text: "Não sei ao certo", points: 2 },
      ],
    },
    {
      question: "Sua região tem histórico de obras de contenção ou barragem?",
      options: [
        { text: "Sim, e são bem conservadas", points: 0 },
        { text: "Sim, mas mal conservadas", points: 2 },
        { text: "Nunca tiveram obras", points: 3 },
        { text: "Não sei dizer", points: 1 },
      ],
    },
    {
      question: "Durante a última chuva forte, o que aconteceu com a água no seu quintal/rua?",
      options: [
        { text: "Escorreu normalmente", points: 0 },
        { text: "Formou pequenas poças", points: 1 },
        { text: "Alagou parcialmente", points: 2 },
        { text: "Alagou totalmente (enchente)", points: 3 },
      ],
    },
    {
      question: "Seu bairro possui algum sistema de alerta (app, sirene, SMS) em caso de enchente?",
      options: [
        { text: "Sim, funciona bem", points: 0 },
        { text: "Existe, mas é falho", points: 2 },
        { text: "Não existe nenhum", points: 3 },
        { text: "Não sei se existe", points: 1 },
      ],
    },
    {
      question: "Quando chove muito, como é a vazão dos bueiros/sarjetas na sua rua?",
      options: [
        { text: "Vazão boa, esvazia rápido", points: 0 },
        { text: "Vazão média, demora um pouco", points: 1 },
        { text: "Vazão ruim, entope fácil", points: 3 },
        { text: "Nunca reparei nisso", points: 2 },
      ],
    },
    {
      question: "Sua casa possui reservatório (cisterna) ou compartimento para armazenar água da chuva?",
      options: [
        { text: "Sim, e raramente transborda", points: 0 },
        { text: "Sim, mas às vezes transborda", points: 2 },
        { text: "Não possui, mas gostaria", points: 1 },
        { text: "Não possui e não pretendo", points: 3 },
      ],
    },
    {
      question: "Você já precisou evacuar sua casa devido a enchentes?",
      options: [
        { text: "Sim, mais de uma vez", points: 3 },
        { text: "Uma única vez", points: 2 },
        { text: "Nunca, mas quase precisei", points: 1 },
        { text: "Nunca precisei", points: 0 },
      ],
    },
    {
      question: "Quando há alerta de chuva intensa, você...?",
      options: [
        { text: "Verifico aplicativo/alerta e me previno", points: 0 },
        { text: "Fico atento, mas nem sempre tomo providências", points: 2 },
        { text: "Ignoro, não me preocupo", points: 3 },
        { text: "Confiro, mas não sei o que fazer", points: 1 },
      ],
    },
  ];

  // Variáveis do quiz
  let currentQuestion = 0;
  const totalQuestions = quizQuestions.length;
  let userAnswers = Array(totalQuestions).fill(null);

  // Elementos do DOM
  const quizContent = document.getElementById("quiz-content");
  const progressFill = document.querySelector(".progress-fill");
  const currentQuestionSpan = document.getElementById("current-question");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");
  const quizResult = document.getElementById("quiz-result");
  const scoreValue = document.getElementById("score-value"); // Elemento para mostrar a pontuação
  const scoreMessage = document.getElementById("score-message"); // Elemento para mostrar a mensagem de risco
  const resultAnswers = document.getElementById("result-answers"); // Container para detalhes (opcional)
  const restartBtn = document.getElementById("restart-btn");
  const quizTitle = document.querySelector(".section-title");
  const quizDescription = document.querySelector(".section-description");
  const quizProgressText = document.querySelector(".progress-text");

  // Inicializar o quiz
  initQuiz();

  // Função para inicializar o quiz
  function initQuiz() {
    // Atualizar título e descrição
    if (quizTitle) quizTitle.textContent = "Quiz de Risco de Enchente";
    if (quizDescription) quizDescription.textContent = "Responda às perguntas para avaliar o risco de enchente na sua área.";
    if (quizProgressText) quizProgressText.innerHTML = `Pergunta <span id="current-question">1</span> de ${totalQuestions}`;

    // Resetar variáveis
    currentQuestion = 0;
    userAnswers = Array(totalQuestions).fill(null);

    // Mostrar a primeira pergunta
    showQuestion(currentQuestion);

    // Atualizar a barra de progresso
    updateProgress();

    // Esconder o resultado
    quizResult.style.display = "none";
    document.querySelector(".quiz-container").style.display = "block";

    // Configurar botões
    prevBtn.disabled = true;
    nextBtn.disabled = false;
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
  }

  // Função para mostrar uma pergunta
  function showQuestion(questionIndex) {
    // Atualizar o número da pergunta atual
    const currentQSpan = document.getElementById("current-question");
    if (currentQSpan) currentQSpan.textContent = questionIndex + 1;

    // Obter a pergunta atual
    const question = quizQuestions[questionIndex];

    // Criar o HTML da pergunta
    let questionHTML = `
            <div class="question-container">
                <div class="question-text">${questionIndex + 1}. ${question.question}</div>
                <div class="options-container">
        `;

    // Adicionar as opções
    question.options.forEach((option, index) => {
      const isSelected = userAnswers[questionIndex] === index;
      const selectedClass = isSelected ? "selected" : "";

      questionHTML += `
                <div class="option ${selectedClass}" data-index="${index}">
                    <div class="option-marker">${String.fromCharCode(65 + index)}</div>
                    <div class="option-text">${option.text}</div>
                </div>
            `;
    });

    questionHTML += `
                </div>
            </div>
        `;

    // Inserir o HTML no container
    quizContent.innerHTML = questionHTML;

    // Adicionar event listeners às opções
    document.querySelectorAll(".option").forEach((option) => {
      option.addEventListener("click", selectOption);
    });

    // Atualizar botões de navegação
    updateNavButtons();
  }

  // Função para selecionar uma opção
  function selectOption(event) {
    // Obter o elemento clicado
    const selectedOption = event.currentTarget;
    const optionIndex = parseInt(selectedOption.dataset.index);

    // Remover a classe 'selected' de todas as opções
    document.querySelectorAll(".option").forEach((option) => {
      option.classList.remove("selected");
    });

    // Adicionar a classe 'selected' à opção clicada
    selectedOption.classList.add("selected");

    // Salvar a resposta do usuário (índice da opção)
    userAnswers[currentQuestion] = optionIndex;

    // Atualizar botões de navegação
    updateNavButtons();
  }

  // Função para atualizar a barra de progresso
  function updateProgress() {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    if (progressFill) progressFill.style.width = `${progress}%`;
  }

  // Função para atualizar os botões de navegação
  function updateNavButtons() {
    // Botão anterior
    prevBtn.disabled = currentQuestion === 0;

    // Botão próximo/enviar
    if (currentQuestion === totalQuestions - 1) {
      nextBtn.style.display = "none";
      submitBtn.style.display = "block";

      // Verificar se todas as perguntas foram respondidas
      const allAnswered = userAnswers.every((answer) => answer !== null);
      submitBtn.disabled = !allAnswered;
    } else {
      nextBtn.style.display = "block";
      submitBtn.style.display = "none";

      // Verificar se a pergunta atual foi respondida
      nextBtn.disabled = userAnswers[currentQuestion] === null;
    }
  }

  // Event listener para o botão anterior
  prevBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion(currentQuestion);
      updateProgress();
    }
  });

  // Event listener para o botão próximo
  nextBtn.addEventListener("click", () => {
    if (currentQuestion < totalQuestions - 1 && userAnswers[currentQuestion] !== null) {
      currentQuestion++;
      showQuestion(currentQuestion);
      updateProgress();
    }
  });

  // Event listener para o botão enviar
  submitBtn.addEventListener("click", () => {
    // Verificar se todas as perguntas foram respondidas
    const allAnswered = userAnswers.every((answer) => answer !== null);

    if (allAnswered) {
      showResult();
    } else {
      alert("Por favor, responda todas as perguntas antes de enviar.");
    }
  });

  // Event listener para o botão reiniciar
  restartBtn.addEventListener("click", initQuiz);

  // Função para mostrar o resultado
  function showResult() {
    // Calcular a pontuação total
    let totalScore = 0;
    userAnswers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== null) {
        totalScore += quizQuestions[questionIndex].options[answerIndex].points;
      }
    });
    
    // Calcular a pontuação máxima possível
    let maxPossibleScore = 0;
    quizQuestions.forEach(question => {
      // Encontrar a opção com maior pontuação em cada pergunta
      const maxPoints = Math.max(...question.options.map(option => option.points));
      maxPossibleScore += maxPoints;
    });
    
    // Atualizar o valor da pontuação e pontuação máxima na tela
    if (scoreValue) scoreValue.textContent = totalScore; // Mostra a pontuação total
    const maxScoreElement = document.getElementById("max-score");
    if (maxScoreElement) maxScoreElement.textContent = maxPossibleScore; // Mostra a pontuação máxima possível

    // Definir a mensagem com base na pontuação total
    let riskLevel = "";
    let riskMessage = "";
    let riskClass = "";

    if (totalScore <= 5) {
      riskLevel = "Baixo Risco";
      riskMessage = "🔹 Baixo risco de enchente no seu perfil. Mantenha-se informado e continue acompanhando alertas locais.";
      riskClass = "baixo-risco";
    } else if (totalScore <= 15) {
      riskLevel = "Risco Moderado";
      riskMessage = "🔶 Risco moderado. Avalie melhorias no sistema de drenagem e fique atento a alertas meteorológicos.";
      riskClass = "moderado-risco";
    } else {
      riskLevel = "Alto Risco";
      riskMessage = "🔴 Alto risco de enchente! Procure orientação técnica para reforçar barreiras, elevar móveis e ter sempre um plano de evacuação.";
      riskClass = "alto-risco";
    }

    // Atualizar a mensagem de risco na tela
    if (scoreMessage) {
        scoreMessage.innerHTML = `<strong>${riskLevel}</strong><br>${riskMessage}`;
        // Remover classes anteriores e adicionar a nova
        scoreMessage.classList.remove("baixo-risco", "moderado-risco", "alto-risco");
        scoreMessage.classList.add(riskClass);
    }

    // Limpar detalhes das respostas anteriores (não vamos mostrar detalhes individuais)
    if (resultAnswers) resultAnswers.innerHTML = "";
    const resultDetailsTitle = document.querySelector(".result-details h4");
    if (resultDetailsTitle) resultDetailsTitle.style.display = 'none'; // Esconde o título "Detalhes das Respostas"

    // Esconder o quiz e mostrar o resultado
    document.querySelector(".quiz-container").style.display = "none";
    quizResult.style.display = "block";
  }
});

