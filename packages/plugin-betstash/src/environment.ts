// import { IAgentRuntime } from "@elizaos/core";
// import { z } from "zod";

// export const nasaEnvSchema = z.object({
//     NASA_API_KEY: z.string().min(1, "Nasa API key is required"),
// });

// export type nasaConfig = z.infer<typeof nasaEnvSchema>;

// export async function validateNasaConfig(
//     runtime: IAgentRuntime
// ): Promise<nasaConfig> {
//     try {
//         const config = {
//             NASA_API_KEY: runtime.getSetting("NASA_API_KEY"),
//         };
//         console.log('config: ', config)
//         return nasaEnvSchema.parse(config);
//     } catch (error) {
//         console.log("error::::", error)
//         if (error instanceof z.ZodError) {
//             const errorMessages = error.errors
//                 .map((err) => `${err.path.join(".")}: ${err.message}`)
//                 .join("\n");
//             throw new Error(
//                 `Nasa API configuration validation failed:\n${errorMessages}`
//             );
//         }
//         throw error;
//     }
// }

import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const cricketEnvSchema = z.object({
    CRICKET_API_KEY: z.string().min(1, "API key is required"),
});

export type CricketConfig = z.infer<typeof cricketEnvSchema>;

export async function validateCricketConfig(
    runtime: IAgentRuntime
): Promise<CricketConfig> {
    try {
        const config = {
            CRICKET_API_KEY: runtime.getSetting("CRICKET_API_KEY"),
        };
        return cricketEnvSchema.parse(config);
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(
                `Cricket API configuration validation failed: ${error.errors.map((err) => err.message).join(", ")}`
            );
        }
        throw error;
    }
}

// import { IAgentRuntime } from "@elizaos/core";
// import { z } from "zod";

// export const cricketAPIEnvSchema = z.object({
//     API_ENDPOINTS: z.array(z.string().url()).min(1, "At least one API endpoint is required."),
// });

// export type CricketAPIConfig = z.infer<typeof cricketAPIEnvSchema>;

// export async function validateCricketAPIConfig(runtime: IAgentRuntime): Promise<CricketAPIConfig> {
//     try {
//         const config = {
//             API_ENDPOINTS: runtime.getSetting("CRICKET_API_ENDPOINTS") as string[],
//         };
//         return cricketAPIEnvSchema.parse(config);
//     } catch (error) {
//         if (error instanceof z.ZodError) {
//             const errorMessages = error.errors
//                 .map(err => `${err.path.join(".")}: ${err.message}`)
//                 .join("\n");
//             throw new Error(`Cricket API configuration validation failed:\n${errorMessages}`);
//         }
//         throw error;
//     }
// }
