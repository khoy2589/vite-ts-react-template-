import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import path from "path";

// // Import Router
// import APIRouter from './src/routes/api.v1.route';

dotenv.config()
const app = express();
/*
 localhost คือชื่อโฮสต์ของคอมพิวเตอร์ 
 localhost มีพอร์ตตั้งแต่ 1-65535 
 ที่สามารถใช้งานได้ในทางเทคนิค
 */
// const port = process.env.APP_PORT ?? 2589;

// cors ป้องกัน allow-cors แต่กรณีผม ผมไม่ได้ป้องกันอะไรมาก เพราะเปิดเป็น public
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// ส่วนนี้ vercel เค้าใช้ ejs ไม่ได้ก็เลยอ่านไฟล์ html ทั่วไปแทน
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'views/index.html'));
});

// ผมใช้ app.use แทน app.get เพราะจะได้กำหนด url ได้ทั้งหมดทีเดียว และไปใช้ router ในการแยกแต่ละ url อีกที
// app.use('/api/v1', APIRouter);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'custom console banner',
    configureServer(server) {
      server.httpServer?.on('listening', () => {
        const address = server.httpServer?.address();
        const port = typeof address === 'object' && address?.port ? address.port : '';
        console.log(`Express is Running on Port : ${port}`);
        console.log('\x1b[1m\x1b[32m%s\x1b[0m', `
    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃                                       ┃
    ┃   Express is Running on Port : ${port}   ┃
    ┃         http://localhost:${port}         ┃
    ┃                                       ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    `);
      })
    }
  }],
  server: {
    port: 2589,
  },
})
