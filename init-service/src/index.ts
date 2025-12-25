import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {copys3Folder} from "./aws"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())
 
app.post('/api/v1/project',async(req:Request,res:Response)=>{
    try {
        // Hit database to ensure this replId is not taken
        const {replId, language} = req.body;
        
        console.log('[API] Received request:', { replId, language });

        if(!replId){
            return res.status(400).json({error:"replId is required"});
        }

        if(!language){
            return res.status(400).json({error:"language is required"});
        }

        const ALLOWED_LANGUAGES = ["node.js", "python", "javascript", "java", "c++", "c"];
        if (!ALLOWED_LANGUAGES.includes(language)) {
            return res.status(400).json({ error: "Invalid language" });
        }

        await copys3Folder(`base/${language}`,`code/${replId}`);
        return res.send("project created successfully");
    } catch (error) {
        console.error('[API] Error processing request:', error);
        return res.status(500).json({error: error instanceof Error ? error.message : "Internal server error"});
    }
  }
);

const PORT = parseInt(process.env.PORT || '3000');

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
