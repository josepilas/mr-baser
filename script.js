// Mr. Baser - Base Conversion Logic

// DOM Elements
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
const modeRadios = document.querySelectorAll('input[name="mode"]');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateCustomBaseVisibility();
});

// Setup Event Listeners
function setupEventListeners() {
    convertBtn.addEventListener('click', convert);
    clearBtn.addEventListener('click', clearAll);
    swapBtn.addEventListener('click', swapValues);
    copyBtn.addEventListener('click', copyResult);
    
    inputType.addEventListener('change', handleInputTypeChange);
    outputType.addEventListener('change', handleOutputTypeChange);
    
    modeRadios.forEach(radio => {
        radio.addEventListener('change', updateCustomBaseVisibility);
    });
    
    // Allow Enter key to trigger conversion
    inputValue.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            convert();
        }
    });
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

// Auto-update custom base section when changing to custom
customBaseInput.addEventListener('change', () => {
    const base = parseInt(customBaseInput.value);
    if (!validateBase(base)) {
        customBaseInput.classList.add('error');
    } else {
        customBaseInput.classList.remove('error');
    }
});

// Add some example conversions on page load for demonstration
window.addEventListener('load', () => {
    // Optional: Add placeholder examples
    inputValue.placeholder = 'Try: Hello World or 65 66 67 or 101010';
});
