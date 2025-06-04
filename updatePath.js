const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, 'build');
const indexPath = path.join(buildDir, 'index.html');

const jsDir = path.join(buildDir, 'static', 'js');
const cssDir = path.join(buildDir, 'static', 'css');

// Rename JS files
const jsFiles = fs.readdirSync(jsDir);
jsFiles.forEach(file => {
  if (file.startsWith('main.') && file.endsWith('.js')) {
    fs.renameSync(path.join(jsDir, file), path.join(jsDir, 'main.js'));
  }
  if (file.startsWith('main.') && file.endsWith('.js.map')) {
    fs.renameSync(path.join(jsDir, file), path.join(jsDir, 'main.js.map'));
  }
});

// Similarly for CSS if needed

// Update index.html references
let indexHtml = fs.readFileSync(indexPath, 'utf8');
indexHtml = indexHtml.replace(/main\.[a-f0-9]{8}\.js/g, 'main.js');
indexHtml = indexHtml.replace(/main\.[a-f0-9]{8}\.js\.map/g, 'main.js.map');
// similarly for CSS if needed
fs.writeFileSync(indexPath, indexHtml);
