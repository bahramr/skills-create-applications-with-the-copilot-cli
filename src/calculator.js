#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 *
 * Supports the following math operations:
 *   - Addition (+, add)
 *   - Subtraction (-, subtract)
 *   - Multiplication (*, multiply)
 *   - Division (/, divide) — handles division by zero gracefully
 *   - Modulo (%, mod) — handles modulo by zero gracefully
 *   - Exponentiation (^, pow) — raises the first operand to the power of the second
 *   - Square root (sqrt) — unary operation, second operand may be omitted
 *
 * Usage:
 *   node calculator.js <num1> <operation> <num2>
 *   node calculator.js <num1> sqrt
 *
 * Examples:
 *   node calculator.js 5 + 3
 *   node calculator.js 10 divide 2
 *   node calculator.js 10 % 3
 *   node calculator.js 2 ^ 10
 *   node calculator.js 9 sqrt
 */

// Map of accepted operation symbols/words to their canonical operation name.
const OPERATIONS = {
  "+": "add",
  add: "add",
  "-": "subtract",
  subtract: "subtract",
  "*": "multiply",
  x: "multiply",
  multiply: "multiply",
  "/": "divide",
  divide: "divide",
  "%": "modulo",
  mod: "modulo",
  modulo: "modulo",
  "^": "exponentiate",
  "**": "exponentiate",
  pow: "exponentiate",
  exponentiate: "exponentiate",
  sqrt: "sqrt",
};

// Operations that only require a single operand.
const UNARY_OPERATIONS = new Set(["sqrt"]);

/** Adds two numbers. */
function add(a, b) {
  return a + b;
}

/** Subtracts the second number from the first. */
function subtract(a, b) {
  return a - b;
}

/** Multiplies two numbers. */
function multiply(a, b) {
  return a * b;
}

/** Divides the first number by the second. Throws on division by zero. */
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return a / b;
}

/** Returns the remainder of dividing the first number by the second. Throws on modulo by zero. */
function modulo(a, b) {
  if (b === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }
  return a % b;
}

/** Raises the first number to the power of the second. */
function exponentiate(a, b) {
  const result = Math.pow(a, b);
  if (Number.isNaN(result)) {
    throw new Error(`Cannot compute ${a} raised to the power of ${b}.`);
  }
  return result;
}

/** Computes the square root of a number. Throws for negative operands. */
function sqrt(a) {
  if (a < 0) {
    throw new Error("Cannot compute the square root of a negative number.");
  }
  return Math.sqrt(a);
}

/**
 * Performs the requested operation on two operands.
 * @param {number} a - First operand.
 * @param {string} operation - One of the supported operation symbols/names.
 * @param {number} b - Second operand.
 * @returns {number} The result of the operation.
 */
function calculate(a, b, operation) {
  const op = OPERATIONS[operation];
  if (!op) {
    throw new Error(
      `Unsupported operation "${operation}". Supported operations: + - * / % ^ sqrt (add, subtract, multiply, divide, modulo, exponentiate, sqrt).`
    );
  }

  switch (op) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
    case "modulo":
      return modulo(a, b);
    case "exponentiate":
      return exponentiate(a, b);
    case "sqrt":
      return sqrt(a);
    default:
      // Should be unreachable because OPERATIONS only maps to known ops.
      throw new Error(`Unhandled operation "${op}".`);
  }
}

function printUsage() {
  console.log("Usage: node calculator.js <num1> <operation> [num2]");
  console.log(
    "Operations: + - * / % ^ sqrt (or add, subtract, multiply, divide, modulo, exponentiate, sqrt)"
  );
  console.log("Example: node calculator.js 5 + 3");
  console.log("Example: node calculator.js 10 % 3");
  console.log("Example: node calculator.js 2 ^ 10");
  console.log("Example: node calculator.js 9 sqrt");
}

function main(argv) {
  const args = argv.slice(2);

  if (args.length !== 2 && args.length !== 3) {
    printUsage();
    process.exit(1);
  }

  const [rawA, operation, rawB] = args;
  const isUnary = UNARY_OPERATIONS.has(OPERATIONS[operation]);

  if (args.length === 2 && !isUnary) {
    console.error(`Error: Operation "${operation}" requires two operands.`);
    printUsage();
    process.exit(1);
  }

  if (args.length === 3 && isUnary) {
    console.error(`Error: Operation "${operation}" only accepts one operand.`);
    printUsage();
    process.exit(1);
  }

  const a = Number(rawA);
  const b = isUnary ? 0 : Number(rawB);

  if (Number.isNaN(a) || (!isUnary && Number.isNaN(b))) {
    console.error("Error: Both operands must be valid numbers.");
    printUsage();
    process.exit(1);
  }

  try {
    const result = calculate(a, b, operation);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Only run the CLI when this file is executed directly (not when imported/required).
if (require.main === module) {
  main(process.argv);
}

// Aliases matching common naming conventions (power/squareRoot).
const power = exponentiate;
const squareRoot = sqrt;

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  exponentiate,
  power,
  sqrt,
  squareRoot,
  calculate,
};
