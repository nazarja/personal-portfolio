// Requires
const express = require('express');
const path = require('path');

// Paths
const public = path.join(__dirname, '../public');
const projects = path.join(__dirname, '../projects');

// Express
const app = express();
app.use(express.static(public));
app.use(express.static(projects));
app.set('view engine', 'ejs');

/*=======================
    Routes
=======================*/

app.get('/', (req, res) => {
    res.render(
        'pages/index',
        { title: 'Full Stack Developer Portfolio | Sean Murphy' }
    );
});

app.get('/info', (req, res) => {
    res.render(
        'pages/index',
        { title: 'Info | Contact' }
    );
});

/*=======================
    Start Server
=======================*/

// Start app
app.listen(5000, () => {
    console.log('App running at http://localhost:5000');
});