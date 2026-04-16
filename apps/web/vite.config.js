import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// #region agent log
fetch('http://127.0.0.1:7247/ingest/e2921d2a-7c35-4466-a027-e493a6f1ef1c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b05b1a'},body:JSON.stringify({sessionId:'b05b1a',runId:'post-fix-1',hypothesisId:'H1',location:'vite.config.js:init',message:'Loaded Vite config with alias mapping',data:{cwd:process.cwd(),aliasTarget:path.resolve(process.cwd(),'src')},timestamp:Date.now()})}).catch(()=>{});
// #endregion

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
});
