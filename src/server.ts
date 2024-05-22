import { Server } from "http";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

let server: Server;

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("Database connection established successfully.");

        server = app.listen(config.port, () => {
            console.log(
                `Computer Garage running at http://127.0.0.0:${config.port}`,
            );
        });
    } catch (error) {
        console.log(error, "Error from server.ts file");
    }
}

main();

process.on("unhandledRejection", () => {
    console.log("unhandledRejection is detected, shut down the server");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on("uncaughtException", () => {
    console.log("uncaughtException is detected, shut down the server");
    process.exit(1);
});
