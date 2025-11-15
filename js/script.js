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
                    <p>Hello there 😏 Want to know what this is all about 🤔 Just type the <strong>"about"</strong> command</p>
                    <p>You can also type <strong>"help"</strong> to get a list of all available commands</p>
                </div>
            `;
      randomVersion();
      break;
    case 'about':
      appendOutput(`<br>👋 My name is Oleksandr, and this is my personal website featuring a design inspired by a terminal interface.<br>`);
      appendOutput('<br>I\'m from <strong>Ukraine</strong> <a class="flag-link" href="https://stand-with-ukraine.pp.ua" target="_blank">🇺🇦</a> and developing cool things is both my primary profession and one of my passions.');
      appendOutput('<br>If you\'re interested, you can find my GitHub page <a href="https://github.com/Sigmanor" target="_blank">here</a>.');
      createPrompt();
      break;
    case 'ping':
      appendOutput('pong 🏓<br>');
      createPrompt();
      break;
    case 'contacts':
      const xLink = '<a title="x" href="https://x.com/sigmanor" target="_blank">https://x.com/sigmanor</a>';
      const linkedinLink = '<a title="linkedin" href="https://www.linkedin.com/in/sigmanor/" target="_blank">https://www.linkedin.com/in/sigmanor/</a>';
      const emailLink = '<a title="email" href="mailto:dock-brunt-rarity@duck.com" target="_blank">dock-brunt-rarity@duck.com</a>';
      appendOutput(`<br>${xLink}<br>${linkedinLink}<br>${emailLink}`);
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
