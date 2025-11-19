import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const dbPath=path.join(__dirname,'../../data/users.db');

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const { username,password }=req.body;
  if(!username||!password) return res.status(400).json({error:'All fields required'});

  const db=new sqlite3.Database(dbPath);
  db.get('SELECT * FROM users WHERE username=?',[username],async(err,user)=>{
    if(err) return res.status(500).json({error:err.message});
    if(!user) return res.status(400).json({error:'Invalid username or password'});
    const valid=await bcrypt.compare(password,user.password);
    if(!valid) return res.status(400).json({error:'Invalid username or password'});
    res.status(200).json({id:user.id,userId:user.userId,username:user.username,email:user.email});
  });
  db.close();
}
