#!/usr/bin/env node

const readline = require("readline");
const boxen    = require("boxen");
const chalk    = require("chalk");

const c      = chalk;
const accent = c.hex("#5BB0F7").bold;
const dim    = c.hex("#4a5568");
const hi     = c.hex("#e8eaf0").bold;
const muted  = c.hex("#8ab4f8");
const ok     = c.hex("#4ade80").bold;
const warn   = c.hex("#facc15");
const err    = c.hex("#f87171").bold;
const gold   = c.hex("#FFD500").bold;
const steel  = c.hex("#94a3b8");
const soft   = c.hex("#cbd5e1");
const teal   = c.hex("#2dd4bf");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function cls() {
  process.stdout.write("\x1Bc");
}

async function typewrite(text, delay = 13) {
  for (const ch of text) {
    process.stdout.write(ch);
    await sleep(delay);
  }
  process.stdout.write("\n");
}

function bar(filled, total = 20) {
  return accent("█".repeat(filled)) + dim("░".repeat(total - filled));
}

function stripAnsi(str) {
  return str.replace(/\x1B\[[0-9;]*m/g, "").replace(/\x1B\[[\d;]*[A-Za-z]/g, "");
}

function wrapText(text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? cur + " " + w : w;
    if (test.length > maxWidth) { if (cur) lines.push(cur); cur = w; }
    else cur = test;
  }
  if (cur) lines.push(cur);
  return lines;
}

const profile = {
  website:  "http://sunmeat.shop/",
  linkedin: "https://www.linkedin.com/in/sunmeat/",
  github:   "https://github.com/sunmeat",
  npx:      "npx sunmeat@latest",
};

const languages = [
  { name: "C++",        level: 18, label: "Systems & Performance" },
  { name: "C#",         level: 18, label: ".NET / ASP.NET Core"   },
  { name: "JavaScript", level: 17, label: "Fullstack Web"         },
  { name: "SQL",        level: 17, label: "Databases"             },
  { name: "Java",       level: 16, label: "Android & Enterprise"  },
  { name: "Python",     level: 15, label: "Backend & Automation"  },
  { name: "PHP",        level: 13, label: "Server-side Web"       },
  { name: "Kotlin",     level: 12, label: "Android"               },
];

const skills = {
  mobile: [
    "Jetpack Compose",
    "Material Design",
    "MAUI",
    "MVI / MVVM"
  ],
  frameworks: [
    "ASP.NET Core",
    "Spring Boot",
    "Django",
    "Node.js",
    "React"
  ],
  tooling: [
    "Git & GitHub",
    "Docker",
    "CI/CD",
    "Figma",
    "AI Ecosystem"
  ]
};

const hobbies = [
  { icon: "🎹", name: "Music",           detail: "accordion, piano, melodica, sopilka, flute, kalimba, ukulele, guitar" },
  { icon: "🎤", name: "Karaoke",         detail: "syntax errors don't exist in song"                                    },
  { icon: "📷", name: "Photography",     detail: "Carpathians, Bulgaria, Amsterdam - through the lens"                 },
  { icon: "🌿", name: "Gardening",       detail: "same patience as debugging, more butterflies"                        },
  { icon: "🎲", name: "Board Games",     detail: "Munchkin - playing like a Boss. Elo: 1150+"                                      },
  { icon: "🎨", name: "Acrylic Paint",   detail: "creative chaos, proudly committed to every stroke"                  },
  { icon: "✈️",  name: "Travel",          detail: "the highlight of my life" },
];

const quotes = [
  { text: "The unreal is more powerful than the real.",                                                               author: "Chuck Palahniuk"          },
  { text: "Stay hungry. Stay foolish.",                                                                               author: "Steve Jobs"                },
  { text: "Great minds discuss ideas; average minds discuss events; small minds discuss people.",                      author: "Eleanor Roosevelt"         },
  { text: "The best error message is the one that never shows up.",                                                   author: "Thomas Fuchs"              },
  { text: "Code is like humour. When you have to explain it, it's bad.",                                              author: "Cory House"                },
  { text: "Any fool can write code a computer understands. Good programmers write code humans understand.",           author: "Martin Fowler"             },
  { text: "First, solve the problem. Then, write the code.",                                                          author: "John Johnson"              },
  { text: "Make it work, make it right, make it fast.",                                                               author: "Kent Beck"                 },
  { text: "Simplicity is the soul of efficiency.",                                                                    author: "Austin Freeman"            },
  { text: "Before software can be reusable it first has to be usable.",                                               author: "Ralph Johnson"             },
  { text: "The most dangerous phrase in the language is: we've always done it this way.",                             author: "Grace Hopper"              },
  { text: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.", author: "Antoine de Saint-Exupery"},
  { text: "In theory, theory and practice are the same. In practice, they are not.",                                 author: "Albert Einstein"           },
  { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",                                   author: "Benjamin Franklin"         },
  { text: "The mediocre teacher tells. The good teacher explains. The great teacher inspires.",                       author: "William Arthur Ward"       },
  { text: "Education is not the filling of a pail, but the lighting of a fire.",                                      author: "W.B. Yeats"                },
  { text: "A teacher affects eternity; he can never tell where his influence stops.",                                 author: "Henry Brooks Adams"        },
  { text: "The art of teaching is the art of assisting discovery.",                                                   author: "Mark Van Doren"            },
  { text: "It does not matter how slowly you go as long as you do not stop.",                                         author: "Confucius"                 },
  { text: "The only way to do great work is to love what you do.",                                                    author: "Steve Jobs"                },
  { text: "Programming isn't about what you know; it's about what you can figure out.",                               author: "Chris Pine"                },
  { text: "Software is a great combination of artistry and engineering.",                                             author: "Bill Gates"                },
  { text: "Always code as if the person maintaining your code is a violent psychopath who knows where you live.",     author: "Martin Golding"            },
  { text: "Debugging is twice as hard as writing the code in the first place.",                                       author: "Brian W. Kernighan"        },
  { text: "Walking on water and developing software from a spec are easy if both are frozen.",                        author: "Edward V. Berard"          },
  { text: "Life is what happens when you're busy making other plans.",                                                author: "John Lennon"               },
  { text: "In the middle of every difficulty lies opportunity.",                                                      author: "Albert Einstein"           },
  { text: "Imagination is more important than knowledge.",                                                            author: "Albert Einstein"           },
  { text: "The function of good software is to make the complex appear simple.",                                      author: "Grady Booch"               },
  { text: "It always seems impossible until it's done.",                                                              author: "Nelson Mandela"            },
  { text: "The cave you fear to enter holds the treasure you seek.",                                                  author: "Joseph Campbell"           },
  { text: "We are what we repeatedly do. Excellence, then, is not an act but a habit.",                               author: "Aristotle"                 },
  { text: "A person who never made a mistake never tried anything new.",                                              author: "Albert Einstein"           },
  { text: "You can't connect the dots looking forward; you can only connect them looking backward.",                  author: "Steve Jobs"                },
  { text: "The secret of getting ahead is getting started.",                                                          author: "Mark Twain"                },
  { text: "The beautiful thing about learning is that nobody can take it away from you.",                             author: "B.B. King"                 },
  { text: "Simplicity does not precede complexity, but follows it.",                                                  author: "Alan Perlis"               },
  { text: "Do not wait to strike till the iron is hot; make it hot by striking.",                                     author: "W.B. Yeats"                },
  { text: "One looks back with appreciation to the brilliant teachers.",                                              author: "Carl Jung"                 },
  { text: "The best teacher is one who suggests rather than dogmatizes.",                                             author: "Edward Bulwer-Lytton"      },
];

function bx(content, borderColor, title) {
  const opts = {
    padding:          { top: 1, bottom: 1, left: 2, right: 2 },
    margin:           { top: 0, bottom: 1, left: 2, right: 0 },
    borderStyle:      "round",
    borderColor,
  };
  if (title) { opts.title = title; opts.titleAlignment = "center"; }
  return boxen(content, opts);
}

function showWelcome() {
  cls();

  const banner = [
    c.hex("#3a8ee6").bold("██████╗ ██╗     ███████╗██╗  ██╗"),
    c.hex("#4d9df0").bold("██╔══██╗██║     ██╔════╝╚██╗██╔╝"),
    c.hex("#5faaff").bold("███████║██║     █████╗   ╚███╔╝ "),
    c.hex("#79baff").bold("██╔══██║██║     ██╔══╝   ██╔██╗ "),
    c.hex("#95caff").bold("██║  ██║███████╗███████╗██╔╝ ██╗"),
    c.hex("#afd9ff").bold("╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝"),
  ].join("\n");

  const content = [
    banner,
    "",
    dim("┄".repeat(36)),
    "",
    hi("Oleksandr Zahoruiko") + "   " + dim("·") + "   " + accent("@sunmeat"),
    steel("Engineer  ·  Lecturer  ·  Developer"),
    dim("Orléans, France"),
    "",
    dim("┄".repeat(36)),
    "",
    dim("web      →  ") + muted("sunmeat.shop"),
    dim("github   →  ") + muted("github.com/sunmeat"),
    dim("linkedin →  ") + muted("linkedin.com/in/sunmeat"),
    "",
    dim("run card →  ") + accent("npx sunmeat@latest"),
  ].join("\n");

  console.log(boxen(content, {
    padding:     { top: 1, bottom: 1, left: 3, right: 3 },
    margin:      { top: 1, bottom: 1, left: 2, right: 0 },
    borderStyle: "double",
    borderColor: "#3d7fc9",
  }));
}

function showAbout() {
  cls();

  const content = [
    hi("Oleksandr Zahoruiko"),
    steel("Age 37   ·   Orléans, France"),
    "",
    dim("┄".repeat(48)),
    "",

    soft("Software Engineer & Lecturer specializing in Web "),
    soft("& Mobile Development. For nearly two decades"),
    soft("I have been designing and delivering practical courses"),
    soft("that bridge academic knowledge with real-world"),
    soft("software engineering practices."),
    "",
    soft("I genuinely love what I do - teaching isn't just a job,"),
    soft("it's the way I make sense of the world."),
    "",
    dim("┄".repeat(48)),
    "",
    dim("[") + teal("personality") + dim("]"),
    dim("engaging · responsible · optimistic · creative · friendly"),
    "",
    warn("Il y a des fleurs partout pour qui veut bien les voir."),
  ].join("\n");

  console.log(bx(content, "#5BB0F7", " About Me "));
}

function showSkills() {
  cls();

  const langLines = languages.map((lang) => {
    const nm  = muted(lang.name.padEnd(13));
    const b   = bar(lang.level);
    const lbl = dim("  " + lang.label);
    return nm + " " + b + lbl;
  });

  console.log(bx(langLines.join("\n"), "#3d7fc9", " Languages & Proficiency "));

  const dot = dim("  ·  ");
  const fmtList = (arr) => arr.map((x) => teal(x)).join(dot);

  const fwLines = [
    hi("Mobile ") + dim("  ·  ") + fmtList(skills.mobile),
    "",
    hi("Frameworks ") + dim("  ·  ") + fmtList(skills.frameworks),
    "",
    hi("Tools  ") + dim("  ·  ") + fmtList(skills.tooling),
    "",
  ].join("\n");

  console.log(bx(fwLines, "#2dd4bf", " Frameworks & Tools "));
}

function showHobbies() {
  cls();

  const lines = hobbies.map((h) => {
    return h.icon + "  " + hi(h.name.padEnd(16)) + " " + dim(h.detail);
  });

  console.log(bx(lines.join("\n"), "#fb7185", " Hobbies & Passions "));
}

function showQuote() {
  cls();

  const q     = quotes[Math.floor(Math.random() * quotes.length)];
  const lines = wrapText(q.text, 54);

  const formatted = lines.map((l, i) => {
    if (lines.length === 1)        return c.italic.hex("#e2e8f0")('"' + l + '"');
    if (i === 0)                   return c.italic.hex("#e2e8f0")('"' + l);
    if (i === lines.length - 1)    return c.italic.hex("#e2e8f0")(l + '"');
    return c.italic.hex("#e2e8f0")(l);
  });

  const content = [
    ...formatted,
    "",
    dim("─  ") + steel(q.author),
  ].join("\n");

  console.log(bx(content, "#FFD500", " My favourite quotes "));
}

async function showContact() {
  cls();

  process.stdout.write("\n  " + dim("opening browser...  "));
  await typewrite(accent("sunmeat.shop"), 22);
  console.log();

  const content = [
    ok("web     ") + "  " + muted("http://sunmeat.shop/"),
    ok("github  ") + "  " + muted("https://github.com/sunmeat"),
    ok("linkedin") + "  " + muted("https://www.linkedin.com/in/sunmeat/"),
    "",
    dim("┄".repeat(44)),
    "",
    dim("npx  →  ") + accent("npx sunmeat@latest"),
  ].join("\n");

  console.log(bx(content, "#4ade80", " Contact & Links "));

  try {
    const { exec } = require("child_process");
    const url = "http://sunmeat.shop/";
    const cmd = process.platform === "win32"
      ? `start "" "${url}"`
      : process.platform === "darwin"
        ? `open "${url}"`
        : `xdg-open "${url}"`;
    exec(cmd);
    console.log("  " + ok("Opened: ") + muted("http://sunmeat.shop/") + "\n");
  } catch (_) {
    console.log("  " + dim("Visit: ") + muted("http://sunmeat.shop/") + "\n");
  }
}

async function showMatrix(onExit) {
  cls();
  process.stdout.write("\x1B[?25l");

  const termCols = process.stdout.columns || 80;
  const termRows = process.stdout.rows    || 24;
  const colCount = Math.floor(termCols / 2);
  const rowCount = termRows - 1;

  const charset = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF".split("");

  const grid = Array.from({ length: rowCount }, () =>
    Array.from({ length: colCount }, () => ({ ch: " ", age: 99 }))
  );

  const drops = Array.from({ length: colCount }, (_, i) => ({
    col:   i,
    row:   -(Math.random() * rowCount),
    speed: 0.3 + Math.random() * 0.7,
    len:   6 + Math.floor(Math.random() * 14),
  }));

  let running = true;

  const rlMatrix = readline.createInterface({ input: process.stdin, terminal: false });
  rlMatrix.once("line", () => { running = false; rlMatrix.close(); });

  while (running) {
    for (const drop of drops) {
      const r = Math.floor(drop.row);
      if (r >= 0 && r < rowCount && drop.col >= 0 && drop.col < colCount) {
        grid[r][drop.col] = { ch: charset[Math.floor(Math.random() * charset.length)], age: 0 };
      }

      for (let i = 1; i <= drop.len; i++) {
        const tr = r - i;
        if (tr >= 0 && tr < rowCount && drop.col >= 0 && drop.col < colCount) {
          if (grid[tr][drop.col].age > 18) grid[tr][drop.col] = { ch: " ", age: 99 };
        }
      }

      drop.row += drop.speed;
      if (drop.row - drop.len > rowCount) {
        drop.row   = -(Math.random() * rowCount * 0.5);
        drop.len   = 6 + Math.floor(Math.random() * 14);
        drop.speed = 0.3 + Math.random() * 0.7;
      }
    }

    for (let r = 0; r < rowCount; r++)
      for (let col = 0; col < colCount; col++)
        if (grid[r][col].age < 99) grid[r][col].age++;

    process.stdout.write("\x1B[H");

    const dropSet = new Set(drops.map((d) => Math.floor(d.row) * colCount + d.col));

    const outputLines = [];
    for (let r = 0; r < rowCount; r++) {
      let line = "";
      for (let col = 0; col < colCount; col++) {
        const cell = grid[r][col];
        if (cell.ch === " " || cell.age >= 99) {
          line += "  ";
        } else if (dropSet.has(r * colCount + col)) {
          line += c.hex("#ffffff").bold(cell.ch) + " ";
        } else if (cell.age < 3) {
          line += c.hex("#aaffcc")(cell.ch) + " ";
        } else if (cell.age < 8) {
          line += c.hex("#00ee44")(cell.ch) + " ";
        } else if (cell.age < 16) {
          line += c.hex("#007722")(cell.ch) + " ";
        } else {
          line += c.hex("#003311")(cell.ch) + " ";
        }
      }
      outputLines.push(line);
    }

    const exitMsg  = "[ Press Enter to exit ]";
    const padLeft  = Math.max(0, Math.floor(termCols / 2) - Math.ceil(exitMsg.length / 2));
    outputLines.push(" ".repeat(padLeft) + c.hex("#ffffff").bold(exitMsg));

    process.stdout.write(outputLines.join("\n"));
    await sleep(70);
  }

  process.stdout.write("\x1B[?25h");
  onExit();
}

const MENU = [
  { key: "1", label: "About Me"            },
  { key: "2", label: "Skills & Tech Stack" },
  { key: "3", label: "Hobbies & Passions"  },
  { key: "4", label: "Random Quote"        },
  { key: "5", label: "Contact & Links"     },
  { key: "6", label: "Matrix Mode"         },
  { key: "0", label: "Exit"                },
];

const SCREENS = {
  "1": showAbout,
  "2": showSkills,
  "3": showHobbies,
  "4": showQuote,
  "5": showContact,
};

function renderMenu() {
  const W   = 36;
  const bdr = c.hex("#3d7fc9");
  const top = bdr("╭" + "─".repeat(W) + "╮");
  const sep = bdr("├" + "─".repeat(W) + "┤");
  const bot = bdr("╰" + "─".repeat(W) + "╯");

  const ts    = " Navigation ";
  const tpad  = Math.floor((W - ts.length) / 2);
  const tline = bdr("│") + " ".repeat(tpad) + hi(ts) + " ".repeat(W - tpad - ts.length) + bdr("│");

  console.log("\n  " + top);
  console.log("  " + tline);
  console.log("  " + sep);

  for (const item of MENU) {
    const key    = "[" + item.key + "]";
    const rawLen = 2 + key.length + 2 + item.label.length;
    const pad    = " ".repeat(Math.max(0, W - rawLen));

    if (item.key === "0") {
      console.log("  " + bdr("│") + "  " + dim(key) + "  " + dim(item.label) + pad + bdr("│"));
    } else if (item.key === "6") {
      console.log("  " + bdr("│") + "  " + c.hex("#00ff41").bold(key) + "  " + c.hex("#00cc33")(item.label) + pad + bdr("│"));
    } else {
      console.log("  " + bdr("│") + "  " + accent(key) + "  " + muted(item.label) + pad + bdr("│"));
    }
  }

  console.log("  " + bot);
  process.stdout.write("\n  " + hi("> "));
}

async function main() {
  showWelcome();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  if (process.stdin.isTTY) process.stdin.setRawMode(false);

  const askMenu = () => {
    renderMenu();
    rl.once("line", async (input) => {
      const choice = input.trim();
      const item   = MENU.find((m) => m.key === choice);

      if (!item) {
        console.log(err("\n  Invalid choice. Please try again."));
        return askMenu();
      }

      if (item.key === "0") {
        cls();
        const content = [
          c.hex("#4488ff").bold("Glory to Ukraine!") + "   " + gold("Glory to the Heroes!"),
          "",
          dim("Thanks for visiting  -  ") + accent("sunmeat"),
        ].join("\n");
        console.log(bx(content, "#FFD500"));
        rl.close();
        process.exit(0);
      }

      if (item.key === "6") {
        rl.pause();
        await showMatrix(() => {
          rl.resume();
          cls();
          showWelcome();
          askMenu();
        });
        return;
      }

      await SCREENS[item.key]();
      askMenu();
    });
  };

  askMenu();
}

main().catch((e) => {
  process.stdout.write("\x1B[?25h");
  console.error(e);
  process.exit(1);
});
