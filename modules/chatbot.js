const aimlHigh = require('aiml-high');
const fs = require('fs');
const path = require('path');

const aimlInterpreter = new aimlHigh({ name:'Catty' }, 'Goodbye');

const aimlPath = path.resolve(__dirname, './Brain');

// Read the directory
fs.readdir(aimlPath, (err, files) => {
    if (err) {
        console.error(`Error reading directory: ${err}`);
        return;
    }

    // Filter for .aiml files and convert to full file paths
    const aimlFiles = files.filter(file => file.endsWith('.aiml')).map(file => path.join(aimlPath, file));

    // Load the AIML files
    aimlInterpreter.loadFiles(aimlFiles);
});

aimlInterpreter.loadFiles([aimlPath]);

function switchPerson(input) {
    const replacements = {
        ' I ': ' you ',
        ' my ': ' your ',
        ' me ': ' you ',
        ' mine ': ' yours ',
        ' am ': ' are ',
        // Add more replacements as needed
    };
    
    let output = input;
    for (let [key, value] of Object.entries(replacements)) {
        output = output.replace(new RegExp(key, 'g'), value);
    }
    
    return output;
}

function askChatbot(question) {
    return new Promise((resolve, reject) => {
        aimlInterpreter.findAnswer(question.toUpperCase(), (answer, wildCardArray, input) => {
            let finalAnswer = answer;
            
            // Detect the <person/> tag in the response
            if (typeof answer === 'string' && answer.includes('<person/>')) {
                // Remove the tag
                finalAnswer = answer.replace('<person/>', '');
                
                // Switch person perspective
                finalAnswer = switchPerson(finalAnswer);
            }
            
            resolve(finalAnswer);
        });
    });
}

module.exports = askChatbot;
