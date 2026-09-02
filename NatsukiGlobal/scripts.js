const firebaseConfig = {
    apiKey: atob("QUl6YVN5RHVpejlJUmUwYTBDTERyUDVSZV93WmFReUV5akpEa0ow"),
    authDomain: "natsukibooper.firebaseapp.com",
    databaseURL: "https://natsukibooper-default-rtdb.firebaseio.com",
    projectId: "natsukibooper",
    storageBucket: "natsukibooper.firebasestorage.app",
    messagingSenderId: "926971256823",
    appId: "1:926971256823:web:4ae9268d8338a0ca6718f2"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const boopsRef = db.ref('boops');
let egg = false;

const global_send_toggle = document.getElementById('global_send_toggle');
const global_recieve_toggle = document.getElementById('global_recieve_toggle')
const character = document.getElementById('char')

const sessionId = Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let input = [];

const mainImage = document.getElementById('main-image');
const mainImageWrap = document.getElementById('main-image-wrap');

const sprites = {
    natsuki: ['natsuki1.png', 'natsuki2.png', 'natsuki3.png', 'natsuki4.png', 'natsuki5.png'],
    yuri: ['yuri1.png', 'yuri2.png', 'yuri3.png', 'yuri4.png', 'yuri5.png'],
    sayori: ['sayori1.png', 'sayori2.png', 'sayori3.png', 'sayori4.png', 'sayori5.png']
};
const idle_sprites = {
    natsuki: 'natsukiIdle.png',
    yuri: 'yuriIdle.png',
    sayori: 'sayoriIdle.png'
}
const css_color = {
    natsuki: '#db73f0',
    yuri: '#7d0096',
    sayori: '#f1a796'
}

document.documentElement.style.setProperty('--character-color', css_color[character.value]);
mainImage.src = idle_sprites[character.value]

//Character changer
character.addEventListener('change', () => {
    mainImage.src = idle_sprites[character.value];
    document.documentElement.style.setProperty('--character-color', css_color[character.value]);
})

function createBoopText(text, timeout = 500, color = 'black') {
    const clickText = document.createElement('div');
    clickText.className = 'click-text';
    clickText.innerText = text;
    clickText.style.color = color;

    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 50;
    const randomX = Math.max(10, Math.random() * maxX);
    const randomY = Math.max(10, Math.random() * maxY);

    clickText.style.left = randomX + 'px';
    clickText.style.top = randomY + 'px';
    clickText.style.transform = `rotate(${(Math.random()*60)-30}deg)`;

    document.body.appendChild(clickText);
    setTimeout(() => clickText.remove(), timeout);
}

//Local
function triggerBoopEffect() {
    clearTimeout(window._imageTimeout);
    const activeSprites = sprites[character.value];
    const randomPersona = activeSprites[Math.floor(Math.random() * activeSprites.length)];
    const yuri_chance = (character.value == 'yuri') ? (Math.floor(Math.random()*100)) : 0;
    // console.log(yuri_chance);
    mainImage.src = (yuri_chance == 69) ? 'yuri666.png' : randomPersona;
    window._imageTimeout = setTimeout(() => {
        mainImage.src = idle_sprites[character.value]
    }, 500);

    const clickText = document.createElement('div');
    clickText.className = 'click-text';
    if (yuri_chance == 69) {
        clickText.innerText = '*SLICE*';
    } else {
        clickText.innerText = '*boop*'
    }

    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 50;
    const randomX = Math.max(10, Math.random() * maxX);
    const randomY = Math.max(10, Math.random() * maxY);

    clickText.style.left = randomX + 'px';
    clickText.style.top = randomY + 'px';
    clickText.style.transform = `rotate(${(Math.random()*60)-30}deg)`;

    document.body.appendChild(clickText);
    setTimeout(() => clickText.remove(), 500);
}

window.addEventListener('keydown', function(e) {
    input.push(e.keyCode);

    if (input.toString().indexOf(konamiCode.toString()) >= 0) {
        egg = true;
        switch (character.value) {
            case 'yuri':
                mainImage.src = 'yuriEasteregg.png';
                document.getElementById('yuri_egg').style.display = 'block';
                mainImage.style.animation = 'shake 0.5s infinite';
                mainImageWrap.style.bottom = '-5px';
                setTimeout(function() {
                    mainImage.src = 'yuriIdle.png';
                    document.getElementById('yuri_egg').style.display = 'none';
                    mainImage.style.animation = 'none';
                    mainImageWrap.style.bottom = '0';
                }, 500);
                egg = false;
                break;
            case 'natsuki':
                mainImage.src = 'natsuki666.gif';
                document.getElementById('yuri_egg').style.display = 'block';
                document.getElementById('yuri_egg').style.backgroundColor = 'rgba(155, 0, 0, 0.36)';
                createBoopText('play with me', 500);
                for (let i = 0; i < 15; i++) {
                    setTimeout(function() {
                        createBoopText('play with me', 500);
                    }, 100 * i);
                }
                setTimeout(function() {
                    mainImage.src = 'natsuki666_2.gif';
                    const neck_snap = new Audio('crack.ogg');
                    neck_snap.play();
                    document.getElementById('yuri_egg').style.backgroundColor = 'rgba(179, 0, 0, 0.53)';
                    for (let i = 0; i < 12; i++) {
                        setTimeout(function() {
                            createBoopText('PLAY WITH ME', 500, 'red');
                        }, 100 * i);
                    }
                    setTimeout(function() {
                        mainImage.style.animation = 'zoomInScreamer 0.5s forwards';
                        const run = new Audio('run.ogg');
                        run.play();
                    }, 300);
                    for (let i = 0; i < 6; i++) {
                        setTimeout(function() {
                            createBoopText('PLAY WITH ME', 500, 'red');
                        }, 50 * i);
                    }
                    setTimeout(function() {
                        document.getElementById('yuri_egg').style.backgroundColor = 'rgb(0, 0, 0)'
                    }, 650);
                }, 1700);
                setTimeout(function() {
                    mainImage.style.animation = 'none';
                    mainImage.src = 'natsukiIdle.png';
                    document.getElementById('yuri_egg').style.display = 'none';
                    document.getElementById('yuri_egg').style.backgroundColor = 'rgba(209, 0, 0, 0.5)';
                    egg = false;
                }, 3700);
                break;
            case 'sayori':
                mainImage.src = 'sayori666.png';
                document.getElementById('yuri_egg').style.background = 'rgba(0, 0, 0, 0)'
                document.getElementById('yuri_egg').style.display = 'block';
                const sayonara = new Audio('sayonara.ogg');
                sayonara.play();
                sayonara.onended = function() { 
                    window.open('','_self').close();
                };
                setTimeout(function() {
                    mainImage.style.animation = 'grayscaler 20s forwards';
                    setTimeout(function() {
                        document.getElementById('yuri_egg').style.display = 'block';
                        document.getElementById('yuri_egg_2').style.display = 'block';
                        document.getElementById('yuri_egg').style.animation = 'screenoff 0.7s ease-in-out forwards';
                        mainImage.remove();
                    }, 20000)
                }, 7000)
                document.getElementById('switch-div').remove();
        }
        input = [];
    }

    if (input.length > konamiCode.length) {
        input.shift();
    }
});

mainImage.addEventListener('click', () => {
    triggerBoopEffect();

    if (global_send_toggle.checked) {

        const newBoopRef = boopsRef.push({
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            sessionId: sessionId,
            character: character.value
        });

        setTimeout(() => {
            newBoopRef.remove().catch(err => console.warn('Boop already removed', err));
        }, 600);

    }
});

//Global
boopsRef.limitToLast(1).on('child_added', (snapshot) => {
    const data = snapshot.val();

    if (data.sessionId === sessionId || !(global_recieve_toggle.checked) || !(data.character === character.value) || egg === true) {
        return;
    }

    triggerBoopEffect();
    });

setInterval(() => {
    const cutoff = Date.now() - 5000;
    boopsRef.orderByChild('timestamp')
        .endAt(cutoff)
        .once('value', (snapshot) => {
            snapshot.forEach((child) => child.ref.remove());
        });
}, 30000);