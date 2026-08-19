import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const declarationPath = path.resolve('lib/exports/resize-observer.d.ts');
const declaration = await readFile(declarationPath, 'utf8');
const esmDeclaration = declaration.replace(
  /from (['"])(\.\.\/[^'"]+)\1/g,
  (_match, quote, specifier) => `from ${quote}${specifier}.js${quote}`,
);

await Promise.all([
  writeFile(path.resolve('lib/exports/resize-observer.d.mts'), esmDeclaration, 'utf8'),
  writeFile(path.resolve('lib/exports/resize-observer.d.cts'), declaration, 'utf8'),
]);
