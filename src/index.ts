import toobusy_js from "toobusy-js";
import app from "./app";
const port = process.env.port || 5000;
async function main()
{
    try
    {
        
        app.listen(port, () =>
        {
            console.log(`Server is runing at ${port}`);
        })
        // process.on('SIGINT', function ()
        // {
        //     // calling .shutdown allows your process to exit normally
        //     toobusy_js.shutdown();
        //     process.exit();
        // });
    } catch (error)
    {
        console.error("Error starting server:", error);
    }
}

main();