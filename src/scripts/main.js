AOS.init({
    duration: 800,
    once: true
});

const dataDoEvento = new Date("jul 13, 2027 20:00:00");
const timeStampDoEvento = dataDoEvento.getTime();

const contaAsHoras = setInterval(function () {
    const agora = new Date();
    const timeStampAtual = agora.getTime();

    const distanciaAteOEvento = timeStampDoEvento - timeStampAtual;

    const diaEmMs = 1000 * 60 * 60 * 24;
    const horaEmMs = 1000 * 60 * 60;
    const minutoEmMs = 1000 * 60;

    const diasAteOEvento = Math.floor(distanciaAteOEvento / diaEmMs);
    const horasAteOEvento = Math.floor((distanciaAteOEvento % diaEmMs) / horaEmMs);
    const minutosAteOEvento = Math.floor((distanciaAteOEvento % horaEmMs) / minutoEmMs);
    const segundosAteOEvento = Math.floor((distanciaAteOEvento % minutoEmMs) / 1000);

    document.getElementById('dias').textContent = String(diasAteOEvento).padStart(2, '0');
    document.getElementById('horas').textContent = String(horasAteOEvento).padStart(2, '0');
    document.getElementById('minutos').textContent = String(minutosAteOEvento).padStart(2, '0');
    document.getElementById('segundos').textContent = String(segundosAteOEvento).padStart(2, '0');

    if (distanciaAteOEvento < 0) {
        clearInterval(contaAsHoras);
        document.getElementById('contador').innerHTML = '<span class="countdown__ended">🎉 A festa já começou!</span>';
    }
}, 1000);

const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confetes = [];
const coresConfete = ['#ffd166', '#ff4d8d', '#06d6a0', '#4cc9f0', '#ffffff'];

function redimensionarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', redimensionarCanvas);
redimensionarCanvas();

for (let i = 0; i < 45; i++) {
    confetes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        tamanho: Math.random() * 6 + 4,
        velocidadeY: Math.random() * 1.4 + 0.6,
        velocidadeX: (Math.random() - 0.5) * 0.8,
        cor: coresConfete[Math.floor(Math.random() * coresConfete.length)],
        angulo: Math.random() * 360
    });
}

function animarConfetes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetes.forEach((c) => {
        c.y += c.velocidadeY;
        c.x += c.velocidadeX;
        c.angulo += 2;

        if (c.y > canvas.height) {
            c.y = -10;
            c.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.angulo * Math.PI) / 180);
        ctx.fillStyle = c.cor;
        ctx.globalAlpha = 0.75;
        ctx.fillRect(-c.tamanho / 2, -c.tamanho / 2, c.tamanho, c.tamanho * 0.6);
        ctx.restore();
    });

    requestAnimationFrame(animarConfetes);
}
animarConfetes();

const formRsvp = document.getElementById('form-rsvp');
const mensagemRsvp = document.getElementById('rsvp-mensagem');

formRsvp.addEventListener('submit', function (evento) {
    evento.preventDefault();
    const nome = document.getElementById('nome-convidado').value.trim();
    const acompanhantes = document.getElementById('acompanhantes').value;

    if (nome) {
        const textoAcomp = acompanhantes === '0'
            ? 'sem acompanhantes'
            : `com +${acompanhantes} acompanhante(s)`;

        mensagemRsvp.innerHTML = `✨ Presença confirmada para <u>${nome}</u> (${textoAcomp})! Nos vemos na festa!`;
        formRsvp.reset();
    }
});
