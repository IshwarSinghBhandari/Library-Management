import Router from 'express';
import { addbook, getallbooks, updatebook, updatestatus ,deletebook, mybook} from '../Controllers/bookController.js';
import { verifyToken } from '../Middlewares/token.js';
export const bookRouter = Router();
bookRouter.post("/addbook",verifyToken,addbook)
.get("/allbooks",verifyToken,getallbooks)
.put("/update/:id",verifyToken,updatebook)
.patch("/updatestatus/:id",verifyToken,updatestatus)
.delete("/deletebook/:id",verifyToken,deletebook)
.get("/mybook",verifyToken,mybook)
