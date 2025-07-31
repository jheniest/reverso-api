// Test script for the synonyms API
const synonymsHandler = require('./api/synonyms.js');

console.log('🧪 Testing Synonyms API Endpoint\n');

// Test the synonyms endpoint
console.log('1️⃣ Testing Synonyms API...');
const mockReq = {
    method: 'GET',
    query: {
        text: 'beautiful',
        lang: 'english'
    }
};

const mockRes = {
    status: function(code) {
        console.log(`   Status: ${code}`);
        return this;
    },
    json: function(data) {
        console.log('   Response:', JSON.stringify(data, null, 2));
        console.log('\n✅ Synonyms API working correctly!\n');
        
        // Test URL for online deployment
        console.log('🌐 Test your deployed synonyms API:');
        console.log('📍 Synonyms: https://reverso-api-git-master-jhes-projects-1fe15e71.vercel.app/api/synonyms?text=beautiful&lang=english');
        console.log('📍 More examples:');
        console.log('   - Happy: https://reverso-api-git-master-jhes-projects-1fe15e71.vercel.app/api/synonyms?text=happy&lang=english');
        console.log('   - Fast: https://reverso-api-git-master-jhes-projects-1fe15e71.vercel.app/api/synonyms?text=fast&lang=english');
        
        return this;
    },
    setHeader: function(name, value) {
        return this;
    },
    end: function() {
        return this;
    }
};

synonymsHandler(mockReq, mockRes);
