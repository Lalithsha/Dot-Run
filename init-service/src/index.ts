import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {copys3Folder} from "./aws"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())
 
app.post('/api/v1/project',async(req:Request,res:Response)=>{
    // Hit database to ensure this replId is not taken
    const {replId, language} = req.body;


    if(!replId){
        return res.status(400).json({error:"replId is required"});
    }

    await copys3Folder(`base/${language}`,`code/${replId}`);
    return res.send("project created successfully");
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
