import { execFile } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const npmCli = process.env.npm_execpath;

if (!npmCli) {
  throw new Error('npm_execpath is required to inspect the package archive.');
}

const destination = await mkdtemp(path.join(os.tmpdir(), 'stackline-resize-observer-pack-'));

try {
  const { stdout } = await execFileAsync(
    process.execPath,
    [npmCli, 'pack', '--dry-run', '--json', '--pack-destination', destination],
    { cwd: process.cwd(), maxBuffer: 10 * 1024 * 1024 },
  );
  process.stdout.write(stdout);
} finally {
  await rm(destination, { recursive: true, force: true });
}
