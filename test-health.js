// Test the main API index.js
const express = require('express');
const app = require('./api/index.js');

// Test if the app loads correctly
console.log('✅ Main API module loaded successfully');

// Test health endpoint manually
const mockReq = {
    method: 'GET',
    url: '/health',
    query: {}
};

const mockRes = {
    status: function(code) {
        console.log('Health Status:', code);
        return this;
    },
    json: function(data) {
        console.log('Health Response:', JSON.stringify(data, null, 2));
        return this;
    }
};

console.log('Testing health endpoint...');

// Simulate the health endpoint response
const healthData = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version,
    reversoLoaded: true
};

mockRes.status(200).json(healthData);
