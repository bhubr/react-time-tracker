import express from 'express';
import appRootPath from 'app-root-path';
import { spawn } from 'child_process';

const router = express.Router();
const lockScreenPy = `${appRootPath}/misc/lockscreen.py`;

router.get('/', (req, res) => {
  spawn('python', [lockScreenPy]);
  res.json({});
});

export default router;
