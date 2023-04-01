const prompt = document.querySelector('.input');
const outputWrapper = document.querySelector('.output-wrapper');

let randomVersion = "";
function setRandomVersion() {
    let versionPattern = "1.0.0";
    for (let i = 0; i < versionPattern.length; i++) {
        if (versionPattern[i] === ".") {
            randomVersion += ".";
        } else {
            randomVersion += Math.floor(Math.random() * 10);
        }
    }
    const welcomeMessage = document.querySelector(".welcome-message");
    welcomeMessage.innerHTML = `Personal website v${randomVersion}`;
}
setRandomVersion();

function appendOutput(text) {
    const output = document.createElement('div');
    output.innerHTML = text;
    outputWrapper.appendChild(output);
    outputWrapper.scrollTop = outputWrapper.scrollHeight;
}

function createPrompt() {
    prompt.value = '';
    prompt.focus();
    prompt.addEventListener('keydown', handleKeyDown);
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        const command = prompt.value.trim();
        prompt.removeEventListener('keydown', handleKeyDown);
        appendOutput(`<br>sigmanor@website:~$ ${command}<br>`);
        executeCommand(command);
    }
}

function executeCommand(command) {
    if (command.includes('echo ')) {
        const echoText = command.split('echo ')[1];
        appendOutput(echoText);
        createPrompt();
        return;
    }

    switch (command) {
        case '':
            createPrompt();
            break;
        case 'help':
            appendOutput('Available commands:<br>');
            appendOutput('- help: display list of available commands<br>');
            appendOutput('- about: understand the purpose of this website<br>');
            appendOutput('- contacts: how can you get in touch with me<br>');
            appendOutput('- echo &lt;text&gt;: display your text in the terminal output<br>');
            appendOutput('- clear: clear the output screen<br>');

            createPrompt();
            break;
        case 'clear':
            createPrompt();
            outputWrapper.innerHTML = `
                <div class="welcome-message">Personal website v${randomVersion}</div>
                <div class="about-section">
                    <p>Hello there 😏 Want to know what this all about for 🤔 Just type the <strong>"about"</strong> command</p>
                    <p>Also, you can type <strong>"help"</strong> to get a list of all available commands</p>
                </div>
            `;
            randomVersion();
            break;
        case 'about'://
            appendOutput(`<br>👋 My name is Oleksandr, this is my personal website that features a design inspired by a terminal interface.<br>`);
            appendOutput('<br>I\`m from <strong>Ukraine</strong> <a href="https://stand-with-ukraine.pp.ua" target="_blank"><img class="uaFlag" style="vertical-align: bottom;" width="21" height="21" src="./assets/ukraine.png" alt="UA"></a> and developing cool things is both my primary profession and one of my passions.');
            appendOutput('<br>If you\'re interested, my GitHub page can be found <a href="https://github.com/Sigmanor" target="_blank">here</a>.');
            createPrompt();
            break;
        case 'ping':
            appendOutput('pong 🏓<br>');
            createPrompt();
            break;
        case 'contacts':
            const telegram = '<a title="telegram" href="https://t.me/sigmanor" target="_blank"><img src="./assets/telegram.svg" alt="telegram"></a>';
            const linkedin = '<a title="linkedin" href="https://www.linkedin.com/in/oleksandr-panchenko-5a88a721a" target="_blank"><img src="./assets/linkedin.svg" alt="linkedin"></a>';
            const email = '<a title="email" href="mailto:sigmanor@pm.me" target="_blank"><img src = "./assets/mail.png" alt="linkedin"></a>';
            appendOutput(`<br> ${telegram} ${linkedin} ${email}`);
            createPrompt();
            break;
        default:
            appendOutput(`"${command}" is not a recognized command. Type "help" for a list of available commands.<br>`);
            createPrompt();
            break;
    }
}

createPrompt();

function focusInput() {
    let focusedElement = null;
    const elements = document.querySelectorAll('body');
    elements.forEach((element) => {
        element.addEventListener('click', () => {
            const prompt = document.querySelector('.input');
            prompt.focus();
            focusedElement = element;
        });
        element.addEventListener('blur', () => {
            if (focusedElement && focusedElement !== element) {
                focusedElement.focus();
            }
        });
    });
};

focusInput();