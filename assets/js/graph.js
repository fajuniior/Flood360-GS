/**
 * Gráfico de nível do rio - Problem Solving
 * Flood360 - Prevenção de Enchentes
 */

document.addEventListener("DOMContentLoaded", function () {
  // Dados do nível do rio (simulados)
  const riverData = {
    labels: ["04/06", "05/06", "06/06", "07/06", "08/06", "09/06", "10/06", "11/06", "12/06", "13/06"],
    measured: [0.9, 1.07, 1.2, 1.4, 1.75, 2.05, 2.3, 2.7, 2.55, 2.5],
    model: [0.9, 1.05, 1.22, 1.42, 1.7, 2.02, 2.35, 2.72, 2.6, 2.0],
    riskLevel: 2.0, // Nível de risco definido
  };

  // Dados históricos para a tabela
  const historicalData = [
    { day: 1, date: "04/06/2025", level: 0.9, status: "Normal" },
    { day: 2, date: "05/06/2025", level: 1.07, status: "Normal" },
    { day: 3, date: "06/06/2025", level: 1.2, status: "Normal" },
    { day: 4, date: "07/06/2025", level: 1.4, status: "Normal" },
    { day: 5, date: "08/06/2025", level: 1.75, status: "Atenção" },
    { day: 6, date: "09/06/2025", level: 2.05, status: "Risco" },
    { day: 7, date: "10/06/2025", level: 2.3, status: "Risco" },
    { day: 8, date: "11/06/2025", level: 2.7, status: "Risco Alto" },
    { day: 9, date: "12/06/2025", level: 2.55, status: "Risco Alto" },
    { day: 10, date: "13/06/2025", level: 2.5, status: "Risco Alto" },
  ];

  // Cores padrão para os datasets do gráfico
  const defaultColors = {
      measured: { border: "#0077cc", background: "rgba(0, 119, 204, 0.2)" },
      model: { border: "#2a9d8f", background: "rgba(42, 157, 143, 0.2)" },
      risk: { border: "#e63946", background: "rgba(230, 57, 70, 0.2)" }
  };

  // Configurar o gráfico de nível do rio
  const ctx = document.getElementById("riverLevelChart").getContext("2d");
  const riverLevelChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: riverData.labels,
      datasets: [
        {
          label: "Nível Medido",
          data: riverData.measured,
          backgroundColor: defaultColors.measured.background,
          borderColor: defaultColors.measured.border,
          borderWidth: 3,
          pointRadius: 5,
          pointBackgroundColor: defaultColors.measured.border,
          tension: 0.3,
        },
        {
          label: "Modelo Polinomial",
          data: riverData.model,
          backgroundColor: defaultColors.model.background,
          borderColor: defaultColors.model.border,
          borderWidth: 3,
          pointRadius: 5,
          pointBackgroundColor: defaultColors.model.border,
          borderDash: [5, 5],
          tension: 0.3,
        },
        {
          label: "Nível de Risco",
          data: Array(riverData.labels.length).fill(riverData.riskLevel),
          backgroundColor: defaultColors.risk.background,
          borderColor: defaultColors.risk.border,
          borderWidth: 2,
          pointRadius: 0,
          borderDash: [10, 5],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Nível do Rio (metros)",
            color: getComputedStyle(document.body).getPropertyValue("--dark-text") || "#1d3557", // Cor dinâmica
          },
          grid: {
            color: getComputedStyle(document.body).getPropertyValue("--light-blue") || "rgba(0, 0, 0, 0.1)", // Cor dinâmica
          },
          ticks: {
             color: getComputedStyle(document.body).getPropertyValue("--dark-text") || "#1d3557", // Cor dinâmica
          }
        },
        x: {
          title: {
            display: true,
            text: "Data",
            color: getComputedStyle(document.body).getPropertyValue("--dark-text") || "#1d3557", // Cor dinâmica
          },
          grid: {
            color: getComputedStyle(document.body).getPropertyValue("--light-blue") || "rgba(0, 0, 0, 0.1)", // Cor dinâmica
          },
           ticks: {
             color: getComputedStyle(document.body).getPropertyValue("--dark-text") || "#1d3557", // Cor dinâmica
          }
        },
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
             color: getComputedStyle(document.body).getPropertyValue("--dark-text") || "#1d3557", // Cor dinâmica
          }
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          titleFont: {
            size: 14,
          },
          bodyFont: {
            size: 14,
          },
          callbacks: {
            label: function (context) {
              return context.dataset.label + ": " + context.parsed.y + "m";
            },
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      animation: {
        duration: 1000,
        easing: "easeOutQuart",
      },
    },
  });

  // Função para atualizar cores dos eixos/legendas com base no tema
  function updateGraphTheme() {
      const isDark = document.body.classList.contains("theme-dark");
      const textColor = isDark ? "#e0e0e0" : "#1d3557";
      const gridColor = isDark ? "#555" : "rgba(0, 0, 0, 0.1)";

      riverLevelChart.options.scales.y.title.color = textColor;
      riverLevelChart.options.scales.y.grid.color = gridColor;
      riverLevelChart.options.scales.y.ticks.color = textColor;

      riverLevelChart.options.scales.x.title.color = textColor;
      riverLevelChart.options.scales.x.grid.color = gridColor;
      riverLevelChart.options.scales.x.ticks.color = textColor;

      riverLevelChart.options.plugins.legend.labels.color = textColor;

      riverLevelChart.update("none"); // Atualiza sem reanimar
  }

  // Preencher a tabela de dados históricos
  const tableBody = document.querySelector("#historicalData tbody");
  historicalData.forEach((data) => {
    const row = document.createElement("tr");

    // Adicionar classe baseada no status
    let statusClass = "";
    if (data.status === "Risco") {
      statusClass = "risk-row";
    } else if (data.status === "Risco Alto") {
      statusClass = "high-risk-row";
    } else if (data.status === "Atenção") {
      statusClass = "attention-row";
    }
    if (statusClass) row.classList.add(statusClass);

    row.innerHTML = `
            <td>${data.day}</td>
            <td>${data.date}</td>
            <td>${data.level.toFixed(2)}</td>
            <td>${data.status}</td>
        `;
    tableBody.appendChild(row);
  });

  // Atualizar estatísticas (valores fixos da análise original)
  document.getElementById("maxLevel").textContent = "2,72m";
  document.getElementById("riskDays").textContent = "4,77";
  document.getElementById("peakDay").textContent = "7,33";

  // Posicionar o indicador de nível atual na barra de risco
  const riskBar = document.getElementById("riskBar");
  if (riskBar) {
      const currentLevel = 2.35; // Nível atual do rio (exemplo)
      const maxLevelScale = 3.5; // Nível máximo da escala visual da barra
      const position = Math.min(100, (currentLevel / maxLevelScale) * 100); // Limita a 100%

      // Criar e posicionar o indicador
      const indicator = document.createElement("div");
      indicator.classList.add("current-level-indicator");
      indicator.style.left = `${position}%`;
      indicator.setAttribute("title", `Nível atual: ${currentLevel}m`);
      riskBar.appendChild(indicator);
  }

  // Observar mudanças no tema para atualizar o gráfico
  const themeObserver = new MutationObserver((mutationsList) => {
      for(let mutation of mutationsList) {
          if (mutation.type === "attributes" && mutation.attributeName === "class") {
              updateGraphTheme();
          }
      }
  });

  themeObserver.observe(document.body, { attributes: true });

  // Atualizar tema do gráfico na carga inicial
  updateGraphTheme();

});

