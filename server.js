import createHttpError from "http-errors";
import app from "./src/app.js";
import { config } from "./src/config/config.js"
import connectDB from "./src/config/db.js";
import globalErrorHandler from "./src/middlewares/globalErrorHandler.js";
import globalRoute from "./src/routes/globalRoutes.js";
import userRouter from "./src/routes/user.js";
import bookRouter from "./src/routes/book.js";

const startServer  = async ()=>{
    
    await connectDB();
    const port  = config.port ||  3000;
    // const error = createHttpError()
    app.listen(port,()=>{
        console.log(`Server running on ${port}`)
    })
}

app.use('/',globalRoute)
app.use('/api/users',userRouter)
app.use('/api/books',bookRouter)

app.use(globalErrorHandler);

startServer();