import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendDir = path.resolve(__dirname, 'backend');
const frontendDir = path.resolve(__dirname, 'frontend');

console.log('🚀 Starting SkillScan Platform...');
console.log('📦 Starting Backend on http://localhost:5001 (dir: ' + backendDir + ')');
console.log('💻 Starting Frontend on http://localhost:5173 (dir: ' + frontendDir + ')');

const backend = spawn('npm', ['run', 'dev'], {
  cwd: backendDir,
  shell: true,
  stdio: 'inherit',
});

const frontend = spawn('npm', ['run', 'dev'], {
  cwd: frontendDir,
  shell: true,
  stdio: 'inherit',
});

const cleanup = () => {
  if (backend && !backend.killed) backend.kill();
  if (frontend && !frontend.killed) frontend.kill();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
