/* Initialization
   ========================================================================== */

let $shell = {
  eventOperationMemory: {},
};
$shell.elementSelector = ".shell";
$shell.element = document.querySelector($shell.elementSelector);

setTimeout(() => {
  $shell.element.classList.add("ready");
}, 2000);

/* Window management
   ========================================================================== */

$shell.windowManager = {
  titleDrag(e) {
    e = e || window.event;
    e.preventDefault();

    const mem = $shell.eventOperationMemory;
    mem.element = e.target.parentElement;
    $shell.windowManager.setActive(mem.element);

    mem.prevClientX = e.clientX;
    mem.prevClientY = e.clientY;
    document.onmouseup = $shell.windowManager.endDrag;
    document.onmousemove = $shell.windowManager.drag;
  },
  drag(e) {
    e = e || window.event;
    e.preventDefault();

    const mem = $shell.eventOperationMemory;

    if (event.button === 0) {
      mem.xOffset = mem.prevClientX - e.clientX;
      mem.yOffset = mem.prevClientY - e.clientY;
      mem.prevClientX = e.clientX;
      mem.prevClientY = e.clientY;

      let xPos = mem.element.offsetLeft - mem.xOffset;
      if (xPos < 0) mem.xPos = 0;
      if (xPos > $shell.element.offsetWidth - 5) xPos = $shell.element.offsetWidth - 5;

      let yPos = mem.element.offsetTop - mem.yOffset;
      if (yPos < 0) yPos = 0;
      if (yPos > $shell.element.offsetHeight - 5) yPos = $shell.element.offsetHeight - 5;

      mem.element.style.left = xPos + "px";
      mem.element.style.top = yPos + "px";
    }
  },
  endDrag() {
    document.onmouseup = null;
    document.onmousemove = null;
  },
  setActive(window) {
    $shell.windowManager.inactivateWindows();
    window.parentElement.appendChild(window);
    window.classList.add("active");
  },
  inactivateWindows() {
    $shell.element.querySelectorAll('.window.active').forEach((window) => {
      window.classList.remove("active");
    });
  },
  initialize() {
    $shell.element.querySelectorAll('.window').forEach((window) => {
      window.addEventListener("click", (e) => {
        if (e.target.nodeName === "DIV")
          this.setActive(window)
      });
    });

    $shell.element.querySelectorAll('.window__title').forEach((windowTitle) => {
      windowTitle.setAttribute("draggable", "");
      windowTitle.addEventListener("mousedown", this.titleDrag);
    });

    $shell.element.querySelectorAll('.window--resizable').forEach((window) => {
      console.log("make resizable")
      /*
        window.resizable({
          start: makeActive,
          containment: 'body'
        });
      */
    });
  }
}

$shell.theme = {
  themes: [{
      file: "themes/win-classic/win9x-16clr.css",
      title: "Windows 9x, 16 colors"
    },
    {
      file: "win-classic/win9x-256clr",
      title: "Windows 9x, 256 colors"
    },
    {
      file: "win-classic/win9x-16bit",
      title: "Windows 9x, High Color 16-bit"
    },
    {
      file: "win-classic/win9x-32bit",
      title: "Windows 9x, True Color 32-bit"
    },
    {
      file: "win-classic/win2k",
      title: "Windows 2000"
    },
    {
      file: "win-classic/vaporwave",
      title: "ウィンドウズ"
    },
  ],
  setTheme(theme) {
    document.getElementById('theme').setAttribute('href', 'themes/' + theme + '.css');
  },
  createThemeSwitcher() {
    let themeSwitcher = document.createElement("div");
    themeSwitcher.classList.add("window")

    let windowTitle = document.createElement("div");
    windowTitle.classList.add("window__title")
    windowTitle.innerHTML = "Theme Switcher";

    let windowContent = document.createElement("div");
    windowContent.classList.add("window__content");

    let themeSelect = document.createElement("select");
    themeSelect.classList.add("form__select");
    this.themes.forEach(theme => {
      let themeOption = document.createElement("option");
      themeOption.value = theme.file;
      themeOption.innerHTML = theme.title;
      themeSelect.append(themeOption);
    });
    themeSelect.addEventListener("change", () => $shell.windowManager.setActive(themeSwitcher))
    /* themeSelect.selectmenu({
      width: 200,
      select: function (event) {
        if (event.target.value) {
          this.setTheme(event.target.value);
        }
      }
    }); */
    windowContent.append(themeSelect);

    themeSwitcher.append(windowTitle);
    themeSwitcher.append(windowContent);

    $shell.element.querySelector(".window-manager").append(themeSwitcher);
  }
}

$shell.theme.createThemeSwitcher();
$shell.windowManager.initialize();