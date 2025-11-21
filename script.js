const loginCard = document.getElementById('loginCard');
const registerCard = document.getElementById('registerCard');
const scene = document.getElementById('scene');
const finalPhrase = document.getElementById('finalPhrase');

const btnGoToRegister = document.getElementById('btnGoToRegister');
const btnGoToLogin = document.getElementById('btnGoToLogin');
const btnLogin = document.getElementById('btnLogin');
const btnRegister = document.getElementById('btnRegister');

let activeCard = loginCard;

document.addEventListener('mousemove', (e) => {
    if (!activeCard) return;
    
    const x = (window.innerWidth / 2 - e.clientX) / 30;
    const y = (window.innerHeight / 2 - e.clientY) / 30;

    if (activeCard.classList.contains('card-active')) {
        activeCard.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    }
});

btnGoToRegister.addEventListener('click', () => {
    switchCard(loginCard, registerCard, 'left');
});

btnGoToLogin.addEventListener('click', () => {
    switchCard(registerCard, loginCard, 'right');
});

function switchCard(current, next, direction) {
    current.classList.remove('card-active');
    current.style.transform = '';

    current.classList.add('anim-exit-left');

    next.classList.remove('anim-exit-left');
    next.classList.add('anim-enter-right');

    setTimeout(() => {
        current.classList.remove('anim-exit-left');
        next.classList.remove('anim-enter-right');
        
        next.classList.add('card-active');
        activeCard = next;
    }, 600);
}

btnRegister.addEventListener('click', () => {
    const user = document.getElementById('regUser').value;
    const pass = document.getElementById('regPass').value;
    const status = document.getElementById('statusReg');
    const progWrapper = document.getElementById('progWrapperReg');
    const progBar = document.getElementById('progBarReg');

    if (!user || !pass) {
        triggerShake(registerCard);
        return;
    }

    progWrapper.style.display = 'block';
    progBar.style.width = '10%';
    status.innerText = "Criando chave de acesso...";
    
    setTimeout(() => { progBar.style.width = '60%'; }, 500);

    setTimeout(() => {
        progBar.style.width = '100%';
        status.innerText = "Sucesso!";
        status.style.color = '#4ade80';
        
        localStorage.setItem('user_' + user, pass);

        setTimeout(() => {
            document.getElementById('regUser').value = '';
            document.getElementById('regPass').value = '';
            status.innerText = '';
            progWrapper.style.display = 'none';
            
            switchCard(registerCard, loginCard, 'right');
        }, 1000);

    }, 1500);
});

btnLogin.addEventListener('click', () => {
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;
    const status = document.getElementById('statusLogin');
    const progWrapper = document.getElementById('progWrapperLogin');
    const progBar = document.getElementById('progBarLogin');

    const storedPass = localStorage.getItem('user_' + user);

    if (user && storedPass === pass) {
        progWrapper.style.display = 'block';
        progBar.style.width = '0%';
        status.innerText = "Autenticando...";
        
        setTimeout(() => { progBar.style.width = '100%'; }, 800);

        setTimeout(() => {
            const allChildren = loginCard.children;
            for (let i = 0; i < allChildren.length; i++) {
                allChildren[i].classList.add('zoom-out-item');
                allChildren[i].style.animationDelay = `${i * 0.1}s`;
            }

            setTimeout(() => {
                loginCard.style.opacity = '0';
                scene.style.transform = 'scale(0)';
                finalPhrase.classList.add('show');
            }, 1000);
            
        }, 1200);

    } else {
        triggerShake(loginCard);
        document.getElementById('loginPass').value = '';
        status.innerText = "Credenciais inválidas";
        status.style.color = '#ff4d4d';
    }
});

function triggerShake(card) {
    card.classList.add('shake-anim');
    if (navigator.vibrate) navigator.vibrate(200);
    setTimeout(() => {
        card.classList.remove('shake-anim');
    }, 300);
}
