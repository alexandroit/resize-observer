import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const rootDir = process.cwd();
const packageJson = JSON.parse(await fs.readFile(path.join(rootDir, "package.json"), "utf8"));
const version = packageJson.version;
const downloadRootDir = path.join(rootDir, "downloads");
const bundleDirName = `stackline-resize-observer-${version}`;
const bundleDir = path.join(downloadRootDir, bundleDirName);
const zipPath = path.join(downloadRootDir, `${bundleDirName}.zip`);

const installGuide = `@stackline/resize-observer ${version}

Browser bundle download
=======================

This folder is for browser applications that do not install packages from npm.

Files
-----
- resize-observer.browser.js
- LICENSE
- README.md

Script tag usage
----------------
<script src="./resize-observer.browser.js"></script>
<script>
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      console.log(entry.contentRect.width, entry.contentRect.height);
    }
  });

  observer.observe(document.querySelector("[data-resize-target]"));
</script>

Global name
-----------
window.ResizeObserver
`;

const downloadReadme = `# GitHub Downloads

This directory contains browser-ready downloads for developers who want to use \`@stackline/resize-observer\` with plain JavaScript.

Current version:

- [${bundleDirName}.zip](./${bundleDirName}.zip)

Inside the archive:

- \`resize-observer.browser.js\`
- \`README.md\`
- \`LICENSE\`
- \`INSTALLATION.txt\`
`;

await fs.rm(downloadRootDir, { recursive: true, force: true });
await fs.mkdir(bundleDir, { recursive: true });

await fs.copyFile(path.join(rootDir, "README.md"), path.join(bundleDir, "README.md"));
await fs.copyFile(path.join(rootDir, "LICENSE"), path.join(bundleDir, "LICENSE"));
await fs.copyFile(
  path.join(rootDir, "lib", "exports", "resize-observer.umd.js"),
  path.join(bundleDir, "resize-observer.browser.js")
);
await fs.writeFile(path.join(bundleDir, "INSTALLATION.txt"), installGuide, "utf8");
await fs.writeFile(path.join(downloadRootDir, "README.md"), downloadReadme, "utf8");

await execFileAsync("zip", ["-rq", zipPath, bundleDirName], {
  cwd: downloadRootDir
});

console.log(`Built GitHub download bundle into ${path.relative(rootDir, downloadRootDir)}/`);
