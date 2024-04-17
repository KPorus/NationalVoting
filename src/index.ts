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
    } catch (error)
    {
        console.error("Error starting server:", error);
    }
}

main();