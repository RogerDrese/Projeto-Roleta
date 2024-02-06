document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("rouletteCanvas");
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    const numSlices = 36;
    const sliceAngle = (2 * Math.PI) / numSlices;
    let rotationSpeed = 0.1; // Velocidade de rotação inicial
    let resultAngle; // Ângulo correspondente ao número vencedor

    // Função para desenhar o pedaço da pizza
    function drawPizzaSlice(startAngle, endAngle, color) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    // Função para desenhar a roleta de pizza
    function drawPizzaRoulette() {
        let sliceNumber = 0;
        for (let i = 0; i < numSlices; i++) {
            let startAngle = sliceAngle * i;
            let endAngle = sliceAngle * (i + 1);
            let color = (i % 2 === 0) ? "red" : "white"; // Alternando cores
            drawPizzaSlice(startAngle, endAngle, color);
            ctx.fillStyle = "black";
            ctx.font = "bold 12px Arial";
            ctx.textAlign = "center";
            ctx.fillText(sliceNumber, centerX + Math.cos(startAngle + sliceAngle / 2) * radius / 2, centerY + Math.sin(startAngle + sliceAngle / 2) * radius / 2);
            sliceNumber++;
        }
    }

    // Função para girar a roleta
    function spinRoulette() {
        const result = Math.floor(Math.random() * numSlices);
        resultAngle = (result + 0.5) * sliceAngle; // Calcula o ângulo correspondente ao número vencedor
        let rotation = 0;

        const spinInterval = setInterval(function () {
            if (rotation < resultAngle) {
                rotation += rotationSpeed;
                rotateCanvas(rotation);
            } else {
                clearInterval(spinInterval);
                showWinner(result); // Exibe o resultado
            }
        }, 10);
    }

    // Função para rotacionar o canvas
    function rotateCanvas(angle) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        ctx.translate(-centerX, -centerY);
        drawPizzaRoulette();
    }

    // Função para exibir o número vencedor
    function showWinner(winnerNumber) {
        ctx.fillStyle = "blue";
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Número vencedor: " + winnerNumber, centerX, centerY + radius + 30);
        drawArrow(resultAngle);
    }

    // Função para desenhar a seta indicadora
    function drawArrow(angle) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(centerX + Math.cos(angle) * radius * 0.8, centerY + Math.sin(angle) * radius * 0.8);
        ctx.lineTo(centerX + Math.cos(angle + 0.3) * radius, centerY + Math.sin(angle + 0.3) * radius);
        ctx.lineTo(centerX + Math.cos(angle - 0.3) * radius, centerY + Math.sin(angle - 0.3) * radius);
        ctx.closePath();
        ctx.fill();
    }

    // Desenha a roleta de pizza inicial
    drawPizzaRoulette();

    // Adiciona um listener de evento para o botão de girar
    document.getElementById("spinButton").addEventListener("click", spinRoulette);
});
