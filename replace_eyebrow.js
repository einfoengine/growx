const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'components/modules');
const ignoreFiles = ['HeroAnimatedContent.tsx'];

function processDir(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') && !ignoreFiles.includes(file)) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes('{data.eyebrow}')) {
        // We look for a <p> element enclosing {data.eyebrow}
        const regex = /<p[^>]*>\s*\{data\.eyebrow\}\s*<\/p>/g;
        if (regex.test(content)) {
          console.log('Replacing in:', fullPath);
          content = content.replace(regex, '<Eyebrow text={data.eyebrow} />');
          
          // Add import if not present
          if (!content.includes('import Eyebrow')) {
            // Find the last import
            const lines = content.split('\n');
            let lastImportIndex = 0;
            for (let i = 0; i < lines.length; i++) {
              if (lines[i].startsWith('import ')) {
                lastImportIndex = i;
              }
            }
            lines.splice(lastImportIndex + 1, 0, 'import Eyebrow from "@/components/elements/Eyebrow";');
            content = lines.join('\n');
          }
          
          fs.writeFileSync(fullPath, content);
        }
      }
    }
  }
}

processDir(dir);
