# Color Highlighter

## Description

**Color Highlighter** is a Visual Studio Code extension that highlights specific keywords in your code comments (e.g., `TODO`, `FIXME`) with customizable background colors. Additionally, the extension provides a command to count the total number of non-empty lines of code in the entire project.

---

## Features

### 1. Comment Highlighting

- Highlights `TODO` comments with a yellow background.
- Highlights `FIXME` comments with a red background.
- Customizable keywords via settings.

### 2. Count Lines of Code

- Counts all non-empty lines of code in the project.
- Supports popular programming languages such as JavaScript, TypeScript, Python, Java, C, C++, and C#.

---

## Usage

### Highlight Comments

1. Open a file with one of the supported programming languages.
2. Add comments containing `TODO` or `FIXME` (or your custom keywords).
3. The comments will automatically be highlighted in yellow (for `TODO`) or red (for `FIXME`).

### Toggle Highlighting

1. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Search for `Toggle Comment Highlighter` and select the command to enable or disable highlighting.

### Count Lines of Code

1. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Search for `Count Lines of Code` and select the command.
3. A notification will display the total number of non-empty lines of code in the project.

---

## Configuration

You can customize the keywords to highlight via your VS Code settings:

1. Go to **File > Preferences > Settings** (or `Cmd+,` on macOS).
2. Search for `Comment Highlighter`.
3. Update the list of keywords to highlight (default: `TODO`, `FIXME`).

Example setting in `settings.json`:

```json
{
  "commentHighlighter.keywords": ["TODO", "FIXME", "NOTE"]
}
```

---

## Supported Languages

- JavaScript
- TypeScript
- Python
- Java
- C
- C++
- C#

---

## Installation

1. Download and install the `.vsix` file.
2. Open Visual Studio Code.
3. Go to **Extensions** (Ctrl+Shift+X or Cmd+Shift+X on macOS).
4. Click on the `...` menu in the top-right corner of the Extensions view.
5. Select **Install from VSIX...** and choose the downloaded `.vsix` file.

---

## Known Issues

- The extension may not highlight comments in unsupported languages.
- Performance may degrade for extremely large files.

---

## Contributing

If you'd like to contribute to this extension, feel free to submit a pull request or open an issue on GitHub.

---

## Release Notes

### 0.0.4
- Added Git repository

### 0.0.3
- Added Logo of Plugin

### 0.0.2

- Added `Count Lines of Code` command.
- Improved keyword highlighting.

### 0.0.1

- Initial release with `TODO` and `FIXME` highlighting.

---

## License

MIT
