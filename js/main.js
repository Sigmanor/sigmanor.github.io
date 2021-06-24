// User Commands
function echo(...a) {
  return a.join(' ')
}
echo.usage = "echo arg [arg ...]"
echo.doc = "Echos to output whatever arguments are input"

function projects() {
  return ('github: https://github.com/Sigmanor')
}
projects.usage = ""
projects.doc = "List of my projects"

function contacts() {
  return ('facebook - https://www.fb.com/SlGMANOR' + '\n' +
    'telegram - https://t.me/Sigmanor' + '\n' +
    'email - sigmanor@pm.me')
}
contacts.usage = ""
contacts.doc = "How can you contact me"


const getUserInformation = new Promise((resolve, reject) => {
  let apiKey = '44853bfc7d424428ab97f0d16c43ac7c';
  $.getJSON('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey, function (data) {
    resolve(JSON.stringify(data, null, 1));
  });
});

function user() {
  return getUserInformation.then((value) => {
    return value.replace(/(?:,|"|{|})/g, '').replace("security:", "\n[security]").replace("ip_address:", "[location]\nip_address:").replace("timezone:", "[timezone]").replace("flag:", "[flag]").replace("currency:", "[currency]").replace("connection:", "[connection]");
    // .replace(/{/g, '').replace(/}/g, '').replace(/"/g, '');
  });
}
user.usage = ""
user.doc = "All I can know about you (but I swear I will don't remember this data)"

function about() {
  return ('My name is Alexander, I`m from Ukraine. One of my hobbies is Programming.' + '\n' +
    'You can look to my github page https://github.com/Sigmanor' + '\n' +
    'Maybe you will find there something interesting.' + '\n' +
    ' ' + '\n' +
    'This website was created using:' + '\n' +
    'https://codepen.io/MattCowley/pen/jqBbdG' + '\n' +
    ' ' + '\n' +
    'Licence:' + '\n' +
    'https://raw.githubusercontent.com/Sigmanor/sigmanor.github.io/master/LICENSE')
}
about.usage = ""
about.doc = "A little bit about me and this website"

function clear() {
  $("#outputs").html("")
}
clear.usage = ""
clear.doc = "Clears the terminal screen"

function help(cmd) {
  if (cmd) {
    let result = ""
    let usage = cmds[cmd].usage
    let doc = cmds[cmd].doc
    result += (typeof usage === 'function') ? usage() : usage
    result += "\n"
    result += (typeof doc === 'function') ? doc() : doc
    return result
  } else {
    let result = "**Commands:**\n\n"
    print = Object.keys(cmds)
    for (let p of print) {
      result += "- " + p + "\n"
    }
    return result
  }
}
help.usage = "help [command]"
help.doc = "Without an argument, lists available commands. If used with an argument displays the usage & docs for the command."

var cmds = {
  projects,
  contacts,
  about,
  user,
  clear,
  echo,
  help,
}

/*
 * * * * * * * * USER INTERFACE * * * * * * *
 */

// Set Focus to Input
$('.console').click(function () {
  $('.console-input').focus()
})

// Display input to Console
function input() {
  var cmd = $('.console-input').val()
  $("#outputs").append("<div class='output-cmd'>" + cmd + "</div>")
  $('.console-input').val("")
  autosize.update($('textarea'))
  $("html, body").animate({
    scrollTop: $(document).height()
  }, 300);
  return cmd
}

// Output to Console
function output(print) {
  var md = new Remarkable({
    breaks: true,
    linkify: true,
    linkTarget: true
  });

  $("#outputs").append(md.render(print))
  $(".console").scrollTop($('.console-inner').height());
}

// Break Value
var newLine = "<br/> &nbsp;";

autosize($('textarea'))

var cmdHistory = []
var cursor = -1

// Get User Command
$('.console-input').on('keydown', function (event) {
  if (event.which === 38) {
    // Up Arrow
    cursor = Math.min(++cursor, cmdHistory.length - 1)
    $('.console-input').val(cmdHistory[cursor])
  } else if (event.which === 40) {
    // Down Arrow
    cursor = Math.max(--cursor, -1)
    if (cursor === -1) {
      $('.console-input').val('')
    } else {
      $('.console-input').val(cmdHistory[cursor])
    }
  } else if (event.keyCode == 13) {
    event.preventDefault();
    cursor = -1
    let text = input()
    let args = getTokens(text)[0]
    let cmd = args.shift().value
    args = args.filter(x => x.type !== 'whitespace').map(x => x.value)
    cmdHistory.unshift(text)
    if (typeof cmds[cmd] === 'function') {
      let result = cmds[cmd](...args)
      if (result === void (0)) {
        // output nothing
      } else if (result instanceof Promise) {
        result.then(output)
      } else {
        console.log(result)
        output(result)
      }
    } else if (cmd.trim() === '') {
      output('')
    } else {
      output("Command not found: `" + cmd + "`")
      output("Use 'help' for list of commands.")
    }

    if (cmd.trim() === 'easteregg') {
      console.log('Wow, you found an easter egg, congratulations, now you can tell your friends how clever you are :) You can click this link, and I will also find out about it http://bit.ly/8oqSuiUnNDcTBL160hmTACShEUoqH9uFIChMolipEm8N1NEPkuyayjQ Who knows, maybe this link is another easter egg?')
    }

  }
});

$(document).ready(function () {
  // $(".console-input").keypress(function (event) {
  // var inputValue = event.which;
  // allow letters and whitespaces only.
  // if (!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)) {
  //   event.preventDefault();
  // }
  // });
});

//ParticlesBG
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
var count_particles, stats, update;
stats = new Stats;
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
count_particles = document.querySelector('.js-count-particles');
update = function () {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);