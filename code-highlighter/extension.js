const vscode = require('vscode');

function activate(context) {
    const config = vscode.workspace.getConfiguration('commentHighlighter');
    const keywords = config.get('keywords') || ['TODO', 'FIXME'];

    // Define styles
    const styles = {
        TODO: vscode.window.createTextEditorDecorationType({
            backgroundColor: 'rgba(255,255,0,0.2)' // yellow
        }),
        FIXME: vscode.window.createTextEditorDecorationType({
            backgroundColor: 'rgba(255,0,0,0.2)' // red
        })
    };

    // Function to update highlights
    function updateHighlights(editor) {
        if (!editor) return;

        const document = editor.document;
        const text = document.getText();
        const TODORanges = [];
        const FIXMERanges = [];

        text.split('\n').forEach((line, lineNumber) => {
            keywords.forEach(keyword => {
                const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
                let match;
                while ((match = regex.exec(line)) !== null) {
                    const range = new vscode.Range(
                        new vscode.Position(lineNumber, match.index),
                        new vscode.Position(lineNumber, match.index + match[0].length)
                    );
                    if (keyword === 'TODO') {
                        TODORanges.push(range);
                    } else if (keyword === 'FIXME') {
                        FIXMERanges.push(range);
                    }
                }
            });
        });

        editor.setDecorations(styles.TODO, TODORanges);
        editor.setDecorations(styles.FIXME, FIXMERanges);
    }

    // Update highlights when the active editor changes
    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            updateHighlights(editor);
        }
    });

    // Update highlights when the document changes
    vscode.workspace.onDidChangeTextDocument(event => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event.document === editor.document) {
            updateHighlights(editor);
        }
    });

    // Initial update for the currently active editor
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        updateHighlights(editor);
    }

    // Command to toggle highlighting
    let isHighlightingEnabled = true;
    const toggleHighlighting = vscode.commands.registerCommand('commentHighlighter.toggle', () => {
        isHighlightingEnabled = !isHighlightingEnabled;
        vscode.window.showInformationMessage(`Comment highlighting ${isHighlightingEnabled ? 'enabled' : 'disabled'}`);

        if (!isHighlightingEnabled) {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                editor.setDecorations(styles.TODO, []);
                editor.setDecorations(styles.FIXME, []);
            }
        } else {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                updateHighlights(editor);
            }
        }
    });

    // Register the toggle command
    context.subscriptions.push(toggleHighlighting);

    // Command to count lines of code in the project
    const countLinesCommand = vscode.commands.registerCommand('extension.countLines', async () => {
        const files = await vscode.workspace.findFiles('**/*.{js,ts,py,java,cpp,c,cs}');
        let totalLines = 0;

        for (const file of files) {
            const document = await vscode.workspace.openTextDocument(file);
            for (let i = 0; i < document.lineCount; i++) {
                const line = document.lineAt(i);
                if (!line.isEmptyOrWhitespace) {
                    totalLines++;
                }
            }
        }

        vscode.window.showInformationMessage(`Total non-empty lines of code in project: ${totalLines}`);
    });

    // Register the count lines command
    context.subscriptions.push(countLinesCommand);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};