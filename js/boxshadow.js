import * as defaults from "./defaults/defaults.js";

const boxShadowRanges = document.querySelectorAll(".range-selector input[type='range']");
const shadowColor = document.querySelector(".shadow-color");
const demoBox = document.querySelector(".preview .demo");
const shadowStyleCheckbox = document.querySelector(".shadow-style");

const setShadowProperties = () => {
  demoBox.style.setProperty("--shadow-x", document.querySelector("input[data-style=x]").value + "px");
  demoBox.style.setProperty("--shadow-y", document.querySelector("input[data-style=y]").value + "px");
  demoBox.style.setProperty("--shadow-blur", document.querySelector("input[data-style=blur]").value + "px");
  demoBox.style.setProperty("--shadow-spread", document.querySelector("input[data-style=spread]").value + "px");
  demoBox.style.setProperty("--shadow-color", document.querySelector("input[type=color]").value);
};
const setBoxProperties = () => {
  demoBox.style.setProperty("--border-radius", document.querySelector("input[data-property=borderRadius]").value + "px");
  demoBox.style.setProperty("--width", document.querySelector("input[data-property=width]").value + "px");
  demoBox.style.setProperty("--height", document.querySelector("input[data-property=height]").value + "px");
  demoBox.style.setProperty("--bg-color", document.querySelector("input[data-style=bg-color]").value);
  demoBox.style.setProperty("--border-color", document.querySelector("input[data-style=border-color]").value);
};
const resetShadowProperties = () => {
  demoBox.style.setProperty("--shadow-x", defaults.DEFAULTSHADOWX + "px");
  demoBox.style.setProperty("--shadow-y", defaults.DEFAULTSHADOWY + "px");
  demoBox.style.setProperty("--shadow-blur", defaults.DEFAULTSHADOWBLUR + "px");
  demoBox.style.setProperty("--shadow-spread", defaults.DEFAULTSHADOWSPREAD + "px");
  demoBox.style.setProperty("--shadow-color", defaults.DEFAULTSHADOWCOLOR);

  // set input range and text to their default values 
  document.querySelector(".hz-offset").value = defaults.DEFAULTSHADOWX;
  document.querySelector("input[data-target='hz-offset']").value = defaults.DEFAULTSHADOWX;
  document.querySelector(".vr-offset").value = defaults.DEFAULTSHADOWY;
  document.querySelector("input[data-target='vr-offset']").value = defaults.DEFAULTSHADOWY;
  document.querySelector(".blur-offset").value = defaults.DEFAULTSHADOWBLUR;
  document.querySelector("input[data-target='blur-offset']").value = defaults.DEFAULTSHADOWBLUR;
  document.querySelector(".spread-offset").value = defaults.DEFAULTSHADOWSPREAD;
  document.querySelector("input[data-target='spread-offset']").value = defaults.DEFAULTSHADOWSPREAD;
};
const resetBoxProperties = () => {
  demoBox.style.setProperty("--border-radius", defaults.DEFAULTBORDERRADIUS + "px");
  demoBox.style.setProperty("--width", defaults.DEFAULTWIDTH + "px");
  demoBox.style.setProperty("--height", defaults.DEFAULTHEIGHT + "px");
  demoBox.style.setProperty("--bg-color", defaults.DEFAULTBGCOLOR);
  demoBox.style.setProperty("--border-color", defaults.DEFAULTBORDERCOLOR);
  
  // set input range and text to their default values 
  document.querySelector(".demo-border-radius-offset").value = defaults.DEFAULTBORDERRADIUS;
  document.querySelector("input[data-target='demo-border-radius-offset']").value = defaults.DEFAULTBORDERRADIUS;
  document.querySelector(".demo-width-offset").value = defaults.DEFAULTWIDTH;
  document.querySelector("input[data-target='demo-width-offset']").value = defaults.DEFAULTWIDTH;
  document.querySelector(".demo-height-offset").value = defaults.DEFAULTHEIGHT;
  document.querySelector("input[data-target='demo-height-offset']").value = defaults.DEFAULTHEIGHT;
};
// set shadow style [inset, outset]
shadowStyleCheckbox.addEventListener("change", e => {
  setShadowProperties();
  if(e.target.checked){
    demoBox.style.setProperty("--shadow-style", e.target.getAttribute("name"));
  }
  else{
    demoBox.style.removeProperty("--shadow-style");
  }
});

// set shadow color
shadowColor.addEventListener("input", e => {
  let color = e.target.value;
  demoBox.style.setProperty("--shadow-x", document.querySelector("input[data-style=x]").value + "px");
  demoBox.style.setProperty("--shadow-y", document.querySelector("input[data-style=y]").value + "px");
  demoBox.style.setProperty("--shadow-blur", document.querySelector("input[data-style=blur]").value + "px");
  demoBox.style.setProperty("--shadow-spread", document.querySelector("input[data-style=spread]").value + "px");
  demoBox.style.setProperty("--shadow-color", color);
});

// manage inputs range and text values accordingly
const controlInputs = element => {
  element.addEventListener("input", e => {
    let value = e.target.value;
    let target = e.target.dataset.target;
    let element = document.querySelector(`.${target}`);
    element.value = value;
    setShadowProperties();
  });
  let inputText = document.querySelector(`.${element.getAttribute("data-target")}`);
  let inputRange = document.querySelector(`input[data-target=${element.getAttribute("data-target")}]`);
  inputText.addEventListener("keydown", e => {
    let value = e.target.value;
    if(e.keyCode == 38 && value < 100){
      e.target.value++;
      inputRange.value = value;
      setShadowProperties();
    } 
    if(e.keyCode == 40 && value > 0){
      e.target.value--;
      inputRange.value = value;
      setShadowProperties();
    }
  }); 
  inputText.addEventListener("input", e => {
    let value = e.target.value;
    if(!isNaN(value)){
      inputRange.value = value;
      inputText.classList.remove("error");
      setShadowProperties();
    }
    else{
      inputRange.value = 0;
      inputText.classList.add("error");
    }
  });
};

boxShadowRanges.forEach(range => {
  controlInputs(range);
});

// customize demo box
const boxProperties = document.querySelectorAll(".range-selector-demo input[type='range']");
boxProperties.forEach(prop => {
  prop.addEventListener("input", e => {
    let value = e.target.value;
    let target = e.target.getAttribute("data-target");
    let element = document.querySelector(`.${target}`);
    element.value = value;
    setBoxProperties();
    setShadowProperties();
  });
});
const boxStyleProperties = document.querySelectorAll("input[data-box='demo-box']");
boxStyleProperties.forEach(prop => {
  prop.addEventListener("input", () => {
    setBoxProperties();
  });
});

// set default values
(function manageInputs() {
  resetShadowProperties();
  resetBoxProperties();
  boxShadowRanges.forEach(range => {
    const value = range.value;
    document.querySelector(`.${range.getAttribute("data-target")}`).value = value;
  });
  boxProperties.forEach(input => {
    const value = input.value;
    document.querySelector(`.${input.getAttribute("data-target")}`).value = value;
  });
})();

// copy CSS style
const copyCode = document.querySelector(".copy-demo-code");
copyCode.addEventListener("click", () => {
  if(copyCode.innerHTML.toLowerCase() != "copied"){
    const style = getComputedStyle(demoBox);
    const shadowStyle = style.getPropertyValue("box-shadow");
    const backgroundColor = style.getPropertyValue("background-color");
    const border = style.getPropertyValue("border");
    const width = parseInt(style.getPropertyValue("width"));
    const height = parseInt(style.getPropertyValue("height"));
    const text = `
      width: ${width};
      height: ${height};
      -moz-box-shadow: ${shadowStyle};
      -webkit-box-shadow: ${shadowStyle};
      box-shadow: ${shadowStyle};
      background-color: ${backgroundColor};
      border: ${border};
    `;
    navigator.clipboard.writeText(text);
    copyCode.innerHTML = "Copied";
  }
});

// allow copy text btn to copy style on any value change
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", e => {
    if(copyCode.innerHTML.toLowerCase() == "copied"){
      copyCode.innerHTML = "Copy CSS Text";
    }
  });
});

// reset styles
const resetStyles = document.querySelector(".reset-btn");
resetStyles.addEventListener("click", () => {
  resetBoxProperties();
  resetShadowProperties();
});

// toggle properties menu on small devices
const mainSection = document.querySelector(".box-shadow-gen");
const toggleControl = document.querySelector(".toggle-control");
const toggleShape = document.querySelector(".toggle-shape");

toggleControl.addEventListener("click", () => {
  toggleControl.classList.toggle("show");
  if(mainSection.classList.contains("toggle-shape-menu")){
    mainSection.classList.remove("toggle-shape-menu");
    toggleShape.classList.remove("show");
  }
  toggleShadowMenu();
});
toggleShape.addEventListener("click", () => {
  toggleShape.classList.toggle("show");
  if(mainSection.classList.contains("toggle-shadow-menu")){
    mainSection.classList.remove("toggle-shadow-menu");
    toggleControl.classList.remove("show");
  }
  toggleShapeMenu();
});

const toggleShadowMenu = () => {
  if(toggleControl.classList.contains("show")){
    mainSection.classList.add("toggle-shadow-menu");
  }
  else{
    mainSection.classList.remove("toggle-shadow-menu");
  }
}
const toggleShapeMenu = () => {
  if(toggleShape.classList.contains("show")){
    mainSection.classList.add("toggle-shape-menu");
  }
  else{
    mainSection.classList.remove("toggle-shape-menu");
  }
}