#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 *
 * Supports the four basic math operations:
 *   - Addition (+, add)
 *   - Subtraction (-, subtract)
 *   - Multiplication (*, multiply)
 *   - Division (/, divide) — handles division by zero gracefully
 *
 * Usage:
 *   node calculator.js <num1> <operation> <num2>
 *
 * Examples:
 *   node calculator.js 5 + 3
 *   node calculator.js 10 divide 2
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
};

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
      `Unsupported operation "${operation}". Supported operations: + - * / (add, subtract, multiply, divide).`
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
    default:
      // Should be unreachable because OPERATIONS only maps to known ops.
      throw new Error(`Unhandled operation "${op}".`);
  }
}

function printUsage() {
  console.log("Usage: node calculator.js <num1> <operation> <num2>");
  console.log("Operations: + - * / (or add, subtract, multiply, divide)");
  console.log("Example: node calculator.js 5 + 3");
}

function main(argv) {
  const args = argv.slice(2);

  if (args.length !== 3) {
    printUsage();
    process.exit(1);
  }

  const [rawA, operation, rawB] = args;
  const a = Number(rawA);
  const b = Number(rawB);

  if (Number.isNaN(a) || Number.isNaN(b)) {
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

module.exports = { add, subtract, multiply, divide, calculate };
