const Reverso = require('./src/reverso.js')
const reverso = new Reverso()

console.log('Testing English to Portuguese translation...\n')

// Test 1: Simple translation
reverso.getTranslation('Hello, how are you?', 'english', 'portuguese', (err, response) => {
    if (err) {
        console.error('Translation Error:', err.message)
    } else {
        console.log('Translation Result:')
        console.log(response)
        console.log('\n' + '='.repeat(50) + '\n')
    }
})

// Test 2: Get context examples
reverso.getContext('good morning', 'english', 'portuguese', (err, response) => {
    if (err) {
        console.error('Context Error:', err.message)
    } else {
        console.log('Context Examples:')
        console.log(response)
        console.log('\n' + '='.repeat(50) + '\n')
    }
})

// Test 3: Spell check in English
reverso.getSpellCheck('helo world', 'english', (err, response) => {
    if (err) {
        console.error('Spell Check Error:', err.message)
    } else {
        console.log('Spell Check Result:')
        console.log(response)
    }
})
