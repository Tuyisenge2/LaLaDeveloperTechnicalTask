import express from "express"; 
import * as http from "http";
import app from "./app"
import { PORT } from "./utils/key";
import { connectionToDatabase } from "./database/config/db.config";

const startApp=()=>{
   const server=http.createServer(app);
   connectionToDatabase();
   server.listen(PORT || 5000,()=>{
      console.log("server started on 5000")
   })
}
startApp();