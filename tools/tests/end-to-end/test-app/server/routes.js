import { WebApp } from 'meteor/webapp';
import { Meteor } from 'meteor/meteor';

// Home
WebApp.connectHandlers.use('/home', (req, res, next) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Welcome to Meteor!</title>
      <style>
        body {
          padding: 10px;
          font-family: sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
        }
        button {
          padding: 10px 20px;
          font-size: 1em;
          cursor: pointer;
        }
        .app-link {
          text-align: center;
          margin-top: 30px;
          padding: 20px;
        }
        ul {
          padding-left: 20px;
        }
        li {
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to Meteor!</h1>

        <div class="hello-section">
          <button onclick="incrementCounter()">Click Me</button>
          <p>You've pressed the button <span id="counter">0</span> times.</p>
        </div>

        <div class="info-section">
          <h2>Learn Meteor!</h2>
          <ul>
            <li><a href="https://www.meteor.com/try" target="_blank">Do the Tutorial</a></li>
            <li><a href="http://guide.meteor.com" target="_blank">Follow the Guide</a></li>
            <li><a href="https://docs.meteor.com" target="_blank">Read the Docs</a></li>
            <li><a href="https://forums.meteor.com" target="_blank">Discussions</a></li>
          </ul>
        </div>

        <div class="app-link">
          <p>Ready to see the task management app?</p>
          <a href="/app" style="text-decoration: none;">
            <button>Enter the To-Do App</button>
          </a>
          <br>
          <small style="color: #ccc;">(Note: /app will show login if not authenticated)</small>
        </div>
      </div>
      
      <script>
        let count = 0;
        function incrementCounter() {
          count++;
          document.getElementById('counter').innerText = count;
        }
      </script>
    </body>
    </html>
  `);
});

// Login page
WebApp.connectHandlers.use('/login', (req, res, next) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Meteor Login</title>
      <style>
        body { 
          font-family: sans-serif; 
          background: linear-gradient(to bottom, #315481, #918e82 100%);
          margin: 0; padding: 20px; color: white;
        }
        .container { max-width: 400px; margin: 50px auto; padding: 40px; background: rgba(255,255,255,0.1); border-radius: 10px; }
        input, button { width: 100%; padding: 10px; margin: 10px 0; border: none; border-radius: 5px; box-sizing: border-box; }
        button { background: #315481; color: white; cursor: pointer; }
        .back-link { text-align: center; margin-top: 20px; }
        a { color: #ffeb3b; text-decoration: none; }
        .note { font-size: 14px; color: #ccc; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Login to Meteor App</h1>
        <p>This is a <strong>server-rendered login page</strong></p>
        
        <div class="note">
          <strong>Demo Credentials:</strong><br>
          Username: meteorite<br>
          Password: password
        </div>
        
        <p>For the actual login, click "Enter the To-Do App" below to use the original Meteor reactive login:</p>
        
        <a href="/app" style="text-decoration: none;">
          <button type="button">Enter the To-Do App (with Meteor Auth)</button>
        </a>
        
        <div class="back-link">
          <a href="/home">Back to Home Page</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

// requires authentication or redirects to show login
WebApp.connectHandlers.use('/app', (req, res, next) => {
  next();
});

// Redirect root to home
WebApp.connectHandlers.use('/', (req, res, next) => {
  if (req.url === '/' || req.url === '/test-app') {
    res.writeHead(302, {'Location': '/home'});
    res.end();
  } else {
    next();
  }
});

console.log('Meteor routes configured.');
