(() => {
  "use strict";
  const displayEl = document.getElementById("display");
  let currentInput = "0";
  let previousInput = null;
  let operator = null;
  let resetNext = false;

  const updateDisplay = (value) => {
    displayEl.textContent = value;
  };

  const appendNumber = (num) => {
    if (resetNext) {
      currentInput = "";
      resetNext = false;
    }
    if (num === "." && currentInput.includes(".")) return;
    if (currentInput === "0" && num !== ".") {
      currentInput = num;
    } else {
      currentInput += num;
    }
    updateDisplay(currentInput);
  };

  const chooseOperator = (op) => {
    if (operator && !resetNext) compute();
    previousInput = currentInput;
    operator = op;
    resetNext = true;
  };

  const compute = () => {
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;
    let result;
    switch (operator) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "/":
        result = curr === 0 ? "Error" : prev / curr;
        break;
      default:
        return;
    }
    currentInput = String(result);
    operator = null;
    previousInput = null;
    resetNext = true;
    updateDisplay(currentInput);
  };

  const clearAll = () => {
    currentInput = "0";
    previousInput = null;
    operator = null;
    resetNext = false;
    updateDisplay(currentInput);
  };

  const deleteLast = () => {
    if (resetNext) {
      clearAll();
      return;
    }
    currentInput = currentInput.slice(0, -1) || "0";
    updateDisplay(currentInput);
  };

  const handleKey = (e) => {
    if (e.target.tagName === "BUTTON") return;
    if (/\d/.test(e.key)) appendNumber(e.key);
    if (e.key === ".") appendNumber(".");
    if (["+", "-", "*", "/"].includes(e.key)) chooseOperator(e.key);
    if (e.key === "Enter" || e.key === "=") {
      e.preventDefault();
      compute();
    }
    if (e.key === "Backspace") deleteLast();
    if (e.key === "Escape") clearAll();
  };

  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { action, value } = btn.dataset;
      if (value && !action) appendNumber(value);
      if (action === "operator") chooseOperator(value);
      if (action === "equals") compute();
      if (action === "clear") clearAll();
      if (action === "delete") deleteLast();
    });
  });

  window.addEventListener("keydown", handleKey);
  updateDisplay(currentInput);
})();
