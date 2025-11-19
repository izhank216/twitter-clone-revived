import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const dbPath=path.join(__dirname,'.../data/users.db');

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const { username,email,password }=req.body;
  if(!username||!email||!password) return res.status(400).json({error:'All fields required'});

  // Generate unique User ID from our API
  const userIdRes = await fetch('http://localhost:3000/api/userids?seed='+encodeURIComponent(username));
  const { userId } = await userIdRes.json();

  const hashed=await bcrypt.hash(password,10);
  const db=new sqlite3.Database(dbPath);
  const stmt=db.prepare('INSERT INTO users (userId,username,email,password) VALUES (?,?,?,?)');

  stmt.run(userId,username,email,hashed,function(err){
    if(err){
      if(err.message.includes('UNIQUE')) res.status(400).json({error:'Username or email exists'});
      else res.status(500).json({error:err.message});
    }else{
      res.status(201).json({id:this.lastID,userId,username,email});
    }
  });
  stmt.finalize();
  db.close();
}
