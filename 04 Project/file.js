const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-grid button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }
  addDigit(digit) {
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();
  }

  processOperations(operation) {
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }

      return;
    }

    let operationValue;
    const previuos = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previuos + current;
        this.updateScreen(operationValue, operation, current, previuos);
        break;
      case "-":
        operationValue = previuos - current;
        this.updateScreen(operationValue, operation, current, previuos);
        break;
      case "/":
        operationValue = previuos / current;
        this.updateScreen(operationValue, operation, current, previuos);
        break;
      case "*":
        operationValue = previuos * current;
        this.updateScreen(operationValue, operation, current, previuos);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "C":
        this.processCOperator();
        break;
      case "CE":
        this.processCEOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previuos = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      if (previuos === 0) {
        operationValue = current;
      }
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }
  changeOperation(operation) {
    const mathOperations = ["*", "/", "-", "+"];
    if (!mathOperations.includes(operation)) {
      return;
    }
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }
  processCOperator() {
    this.currentOperationText.innerText = "";
  }
  processCEOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }
  processEqualOperator(){

    let operation = previousOperationText.innerText.split(" ")[1];

    this.processOperations(operation);
  }
}
const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;
    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperations(value);
    }
  });
});
