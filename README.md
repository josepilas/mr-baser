# Mr. Baser 🔢

**The Ultimate Base Conversion Tool for Developers, Students, and Curious Minds.**

## 📖 Overview

**Mr. Baser** is a lightweight, client-side web application designed to seamlessly convert text and numbers between various numerical bases. Whether you are a developer debugging binary data, a computer science student learning about number systems, or just someone curious about how "Hello World" looks in Octal, Mr. Baser handles it all instantly in your browser.

No server-side processing, no data tracking—just pure, fast conversion logic running locally on your machine.

## ✨ Features

### 🔄 Multi-Mode Conversion
- **Standard Text Mode**: Automatically detects and converts between common formats:
  - **Text** (ASCII/Unicode)
  - **Binary** (Base 2)
  - **Octal** (Base 8)
  - **Decimal** (Base 10)
  - **Hexadecimal** (Base 16)
  
- **Custom Base Mode**: Unlock any base from **2 to 36**.
  - Need Base 3? No problem.
  - Working with Base 32 encoding? Supported.
  - Input your custom base, and Mr. Baser adapts instantly.

### 🚀 User Experience
- **Real-time Conversion**: Type and see results immediately.
- **Smart Detection**: Automatically identifies input formats where possible.
- **Quick Actions**:
  - 📋 **Copy**: One-click copy to clipboard.
  - 🔄 **Swap**: Instantly swap input and output values.
  - 🗑️ **Clear**: Reset fields with a single click.
- **Responsive Design**: Works perfectly on desktops, tablets, and mobile devices.
- **Error Handling**: Clear, friendly error messages for invalid inputs.

## 🎯 Purpose

The primary goal of **Mr. Baser** is to simplify the often tedious task of base conversion. 

1. **For Developers**: Quickly decode hex dumps, verify binary flags, or encode strings into specific bases for hashing/salt generation.
2. **For Students**: Visualize how numbers change across different systems, aiding in the understanding of computer architecture and mathematics.
3. **For Privacy**: Since all calculations happen in the browser using JavaScript, sensitive data never leaves your device.

## 🛠️ Tech Stack

- **HTML5**: Semantic structure for accessibility.
- **CSS3**: Modern styling with gradients, flexbox/grid layout, and responsive media queries.
- **JavaScript (ES6+)**: Vanilla JS logic for high-performance conversion algorithms without external dependencies.

## 🚀 How to Use

### Option 1: Local File
1. Clone or download this repository.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).
3. Start converting!

### Option 2: Live Server (Development)
If you have VS Code with the "Live Server" extension:
1. Right-click `index.html`.
2. Select "Open with Live Server".

### Usage Guide
1. **Select Mode**: Toggle between "Standard Text" (for common bases) or "Custom Base" (for specific numbers like 3, 7, 12, etc.).
2. **Input Data**: Type your text or number into the **Input** box.
   - If using Custom Base, enter the base number (e.g., `8` for octal) in the settings field.
3. **Select Target**: Choose what you want to convert **to** from the dropdown menus.
4. **Read Result**: The **Output** box updates automatically.

## 📂 Project Structure

```text
mr-baser/
├── index.html      # Main HTML structure
├── styles.css      # Visual styling and layout
├── script.js       # Conversion logic and event handling
└── README.md       # This documentation file
```

## 🧠 Conversion Logic

Mr. Baser uses standard mathematical algorithms for conversion:
- **To Decimal**: Parses the input string using the source radix.
- **From Decimal**: Converts the decimal integer to the target radix string.
- **Text Handling**: 
  - *Text → Number*: Converts each character to its ASCII/Unicode code point.
  - *Number → Text*: Interprets number sequences as ASCII/Unicode code points to reconstruct characters.

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit pull requests for:
- Additional features (e.g., history log, file upload support).
- UI/UX improvements.
- Bug fixes.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

**Made with ❤️ for the coding community.**
