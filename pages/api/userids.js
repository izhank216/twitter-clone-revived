import seedrandom from 'seedrandom';

export default function handler(req,res){
  if(req.method!=='GET') return res.status(405).json({error:'Method not allowed'});
  const { seed } = req.query;
  const rng = seed?seedrandom(seed):seedrandom();
  let userId='';
  for(let i=0;i<12;i++){userId+=Math.floor(rng()*10);}
  res.status(200).json({userId});
}
