// Mr. Baser - Base Conversion and Calculator Logic

// DOM Elements - Converter
const inputType = document.getElementById('inputType');
const outputType = document.getElementById('outputType');
const inputValue = document.getElementById('inputValue');
const outputValue = document.getElementById('outputValue');
const convertBtn = document.getElementById('convertBtn');
const clearBtn = document.getElementById('clearBtn');
const swapBtn = document.getElementById('swapBtn');
const copyBtn = document.getElementById('copyBtn');
const customBaseSection = document.getElementById('customBaseSection');
const customBaseInput = document.getElementById('customBase');
const appModeRadios = document.querySelectorAll('input[name="appMode"]');
const converterSection = document.getElementById('converterSection');
const converterQuickActions = document.getElementById('converterQuickActions');

// DOM Elements - Calculator
const calculatorSection = document.getElementById('calculatorSection');
const operand1Input = document.getElementById('operand1');
const operand2Input = document.getElementById('operand2');
const operand1BaseSelect = document.getElementById('operand1Base');
const operand2BaseSelect = document.getElementById('operand2Base');
const resultBaseSelect = document.getElementById('resultBase');
const calcOutput = document.getElementById('calcOutput');
const calcCalculateBtn = document.getElementById('calcCalculateBtn');
const calcClearBtn = document.getElementById('calcClearBtn');
const calcCopyBtn = document.getElementById('calcCopyBtn');
const opButtons = document.querySelectorAll('.op-btn');
let selectedOperation = '+';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateCustomBaseVisibility();
    updateAppMode();
});

// Setup Event Listeners
function setupEventListeners() {
    // Converter event listeners
    convertBtn.addEventListener('click', convert);
    clearBtn.addEventListener('click', clearAll);
    swapBtn.addEventListener('click', swapValues);
    copyBtn.addEventListener('click', copyResult);
    
    inputType.addEventListener('change', handleInputTypeChange);
    outputType.addEventListener('change', handleOutputTypeChange);
    
    appModeRadios.forEach(radio => {
        radio.addEventListener('change', updateAppMode);
    });
    
    customBaseInput.addEventListener('change', () => {
        const base = parseInt(customBaseInput.value);
        if (!validateBase(base)) {
            customBaseInput.classList.add('error');
        } else {
            customBaseInput.classList.remove('error');
        }
    });
    
    // Allow Enter key to trigger conversion
    inputValue.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            convert();
        }
    });
    
    // Calculator event listeners
    calcCalculateBtn.addEventListener('click', calculate);
    calcClearBtn.addEventListener('click', clearCalculator);
    calcCopyBtn.addEventListener('click', copyCalcResult);
    
    opButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            opButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            selectedOperation = e.target.dataset.op;
        });
    });
    
    // Allow Enter key to trigger calculation
    operand2Input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            calculate();
        }
    });
}

// Update App Mode (Converter vs Calculator)
function updateAppMode() {
    const isCalculatorMode = document.querySelector('input[name="appMode"][value="calculator"]:checked');
    
    if (isCalculatorMode) {
        calculatorSection.style.display = 'block';
        converterSection.style.display = 'none';
        converterQuickActions.style.display = 'none';
        customBaseSection.style.display = 'none';
    } else {
        calculatorSection.style.display = 'none';
        converterSection.style.display = 'block';
        converterQuickActions.style.display = 'flex';
        updateCustomBaseVisibility();
    }
}

// Update Custom Base Section Visibility
function updateCustomBaseVisibility() {
    const isCustomMode = document.querySelector('input[name="mode"][value="custom"]:checked');
    customBaseSection.style.display = isCustomMode ? 'block' : 'none';
    
    // If in custom mode, set both selects to custom
    if (isCustomMode) {
        inputType.value = 'custom';
        outputType.value = 'custom';
    }
}

// Handle Input Type Change
function handleInputTypeChange() {
    if (inputType.value === 'custom') {
        document.querySelector('input[name="mode"][value="custom"]').checked = true;
        customBaseSection.style.display = 'block';
    }
}

// Handle Output Type Change
function handleOutputTypeChange() {
    if (outputType.value === 'custom') {
        document.querySelector('input[name="mode"][value="custom"]').checked = true;
        customBaseSection.style.display = 'block';
    }
}

// Get the actual base value
function getBase(selectElement) {
    const value = selectElement.value;
    
    if (value === 'text') {
        return 'text';
    } else if (value === 'custom') {
        const base = parseInt(customBaseInput.value);
        if (isNaN(base) || base < 2 || base > 36) {
            throw new Error('Custom base must be between 2 and 36');
        }
        return base;
    } else {
        return parseInt(value);
    }
}

// Convert function
function convert() {
    try {
        const input = inputValue.value.trim();
        
        if (!input) {
            outputValue.value = '';
            return;
        }
        
        const fromBase = getBase(inputType);
        const toBase = getBase(outputType);
        
        let result;
        
        // Convert to decimal first (intermediate step)
        let decimalValue;
        
        if (fromBase === 'text') {
            // Text to decimal: convert each character to its char code
            decimalValue = Array.from(input).map(char => char.charCodeAt(0));
        } else {
            // Parse the input as the source base
            // For numeric bases, we might have multiple numbers separated by spaces
            const parts = input.split(/\s+/);
            decimalValue = parts.map(part => {
                if (part === '') return null;
                const num = parseInt(part, fromBase);
                if (isNaN(num)) {
                    throw new Error(`Invalid number "${part}" for base ${fromBase}`);
                }
                return num;
            }).filter(n => n !== null);
        }
        
        // Convert from decimal to target base
        if (toBase === 'text') {
            // Decimal to text: convert each number to its character
            result = decimalValue.map(code => {
                if (code < 0 || code > 0x10FFFF) {
                    throw new Error(`Invalid character code: ${code}`);
                }
                return String.fromCharCode(code);
            }).join('');
        } else {
            // Decimal to target base
            result = decimalValue.map(num => {
                if (num < 0) {
                    return '-' + Math.abs(num).toString(toBase).toUpperCase();
                }
                return num.toString(toBase).toUpperCase();
            }).join(' ');
        }
        
        outputValue.value = result;
        outputValue.classList.remove('error');
        outputValue.classList.add('success');
        
        setTimeout(() => {
            outputValue.classList.remove('success');
        }, 1000);
        
    } catch (error) {
        outputValue.value = `Error: ${error.message}`;
        outputValue.classList.add('error');
        console.error('Conversion error:', error);
    }
}

// Clear all fields
function clearAll() {
    inputValue.value = '';
    outputValue.value = '';
    inputValue.classList.remove('error');
    outputValue.classList.remove('error');
    inputValue.focus();
}

// Swap input and output
function swapValues() {
    const temp = inputValue.value;
    inputValue.value = outputValue.value;
    outputValue.value = temp;
    
    // Also swap the base selections
    const tempType = inputType.value;
    inputType.value = outputType.value;
    outputType.value = tempType;
    
    // Update custom base visibility if needed
    if (inputType.value === 'custom' || outputType.value === 'custom') {
        customBaseSection.style.display = 'block';
        document.querySelector('input[name="mode"][value="custom"]').checked = true;
    }
}

// Copy result to clipboard
async function copyResult() {
    if (!outputValue.value) {
        alert('No result to copy!');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(outputValue.value);
        
        // Visual feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        copyBtn.style.background = '#28a745';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
        
    } catch (err) {
        // Fallback for older browsers
        outputValue.select();
        document.execCommand('copy');
        
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        copyBtn.style.background = '#28a745';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }
}

// Utility: Validate base input
function validateBase(base) {
    return !isNaN(base) && base >= 2 && base <= 36;
}

// Get base value for calculator
function getCalcBase(selectElement) {
    const value = selectElement.value;
    
    if (value === 'custom') {
        const base = parseInt(customBaseInput.value);
        if (isNaN(base) || base < 2 || base > 36) {
            throw new Error('Custom base must be between 2 and 36');
        }
        return base;
    } else {
        return parseInt(value);
    }
}

// Parse number from a specific base
function parseFromBase(str, base) {
    const trimmed = str.trim();
    const num = parseInt(trimmed, base);
    if (isNaN(num)) {
        throw new Error(`Invalid number "${trimmed}" for base ${base}`);
    }
    return num;
}

// Convert number to a specific base
function convertToBase(num, base) {
    if (num < 0) {
        return '-' + Math.abs(num).toString(base).toUpperCase();
    }
    return num.toString(base).toUpperCase();
}

// Calculator functions
function calculate() {
    try {
        const operand1Str = operand1Input.value.trim();
        const operand2Str = operand2Input.value.trim();
        
        if (!operand1Str || !operand2Str) {
            calcOutput.value = 'Error: Please enter both operands';
            calcOutput.classList.add('error');
            return;
        }
        
        const base1 = getCalcBase(operand1BaseSelect);
        const base2 = getCalcBase(operand2BaseSelect);
        const resultBase = getCalcBase(resultBaseSelect);
        
        // Parse operands to decimal
        const num1 = parseFromBase(operand1Str, base1);
        const num2 = parseFromBase(operand2Str, base2);
        
        let result;
        
        // Perform the operation
        switch (selectedOperation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    throw new Error('Division by zero');
                }
                result = num1 / num2;
                // For division, we'll show decimal if not evenly divisible
                if (!Number.isInteger(result)) {
                    calcOutput.value = result.toFixed(6).replace(/\.?0+$/, '');
                    calcOutput.classList.remove('error');
                    calcOutput.classList.add('success');
                    setTimeout(() => {
                        calcOutput.classList.remove('success');
                    }, 1000);
                    return;
                }
                result = Math.floor(result);
                break;
            case '%':
                if (num2 === 0) {
                    throw new Error('Modulo by zero');
                }
                result = num1 % num2;
                break;
            case '**':
                if (num2 > 20 || num2 < -20) {
                    throw new Error('Exponent too large (must be between -20 and 20)');
                }
                result = Math.pow(num1, num2);
                if (!Number.isInteger(result)) {
                    calcOutput.value = result.toFixed(6).replace(/\.?0+$/, '');
                    calcOutput.classList.remove('error');
                    calcOutput.classList.add('success');
                    setTimeout(() => {
                        calcOutput.classList.remove('success');
                    }, 1000);
                    return;
                }
                result = Math.round(result);
                break;
            default:
                throw new Error('Invalid operation');
        }
        
        // Convert result to target base
        const resultStr = convertToBase(result, resultBase);
        
        calcOutput.value = resultStr;
        calcOutput.classList.remove('error');
        calcOutput.classList.add('success');
        
        setTimeout(() => {
            calcOutput.classList.remove('success');
        }, 1000);
        
    } catch (error) {
        calcOutput.value = `Error: ${error.message}`;
        calcOutput.classList.add('error');
        console.error('Calculation error:', error);
    }
}

// Clear calculator fields
function clearCalculator() {
    operand1Input.value = '';
    operand2Input.value = '';
    calcOutput.value = '';
    selectedOperation = '+';
    opButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('.op-btn[data-op="+"]').classList.add('active');
    operand1Input.focus();
}

// Copy calculator result to clipboard
async function copyCalcResult() {
    if (!calcOutput.value) {
        alert('No result to copy!');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(calcOutput.value);
        
        // Visual feedback
        const originalText = calcCopyBtn.textContent;
        calcCopyBtn.textContent = '✓ Copied!';
        calcCopyBtn.style.background = '#28a745';
        
        setTimeout(() => {
            calcCopyBtn.textContent = originalText;
            calcCopyBtn.style.background = '';
        }, 2000);
        
    } catch (err) {
        // Fallback for older browsers
        calcOutput.select();
        document.execCommand('copy');
        
        const originalText = calcCopyBtn.textContent;
        calcCopyBtn.textContent = '✓ Copied!';
        calcCopyBtn.style.background = '#28a745';
        
        setTimeout(() => {
            calcCopyBtn.textContent = originalText;
            calcCopyBtn.style.background = '';
        }, 2000);
    }
}

// Add some example conversions on page load for demonstration
window.addEventListener('load', () => {
    // Optional: Add placeholder examples
    inputValue.placeholder = 'Try: Hello World or 65 66 67 or 101010';
});
