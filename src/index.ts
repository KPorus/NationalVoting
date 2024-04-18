import { Server } from "http";
import app from "./app";
const port = process.env.port || 5000;

let server: Server;
process.on("uncaughtException", err =>
{
    process.exit(1);
})
async function main()
{
    try
    { 
        app.listen(port, () =>
        {
            console.log(`Server is runing at ${port}`);
        })
    } catch (error)
    {
        console.error("Error starting server:", error);
    } process.on("unhandledRejection", error =>
    {
        if (server)
        {
            server.close(() =>
            {
                console.log(error);
                process.exit(1)
            })
        }
        else
        {
            process.exit(1)
        }
    })
}

main();
process.on("SIGTERM", () =>
{
    console.log("SIGTERM is received!");
    if (server)
    {
        server.close();
    }
})