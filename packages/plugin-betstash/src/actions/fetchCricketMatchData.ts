import {
    elizaLogger,
    Action,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
import { validateCricketConfig } from "../environment";
import { createCricketService } from "../services";
import { getCricketMatchExamples } from "../examples";
import { ActionExample } from "@elizaos/core";
import { postAction } from "./twitterAction"; // Twitter posting action

export const fetchCricketMatchesAction: Action = {
    name: "FETCH_CRICKET_MATCHES",
    similes: ["CRICKET", "MATCHES", "LIVE SCORES", "BETTING"],
    description:
        "Fetch live cricket matches and verify consistency across multiple sources. If a match is completed, post a result tweet.",

    validate: async (runtime: IAgentRuntime) => {
        await validateCricketConfig(runtime);
        return true;
    },

    examples: getCricketMatchExamples as ActionExample[][],

    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        try {
            // Validate cricket API configuration
            const config = await validateCricketConfig(runtime);
            const cricketService = createCricketService([
                "http://localhost:3001/getdata",
            ]);

            // Fetch data from all sources
            const matchData = await cricketService.getCricketMatches();
            if (!matchData || matchData.length === 0) {
                callback({
                    text: "No live cricket matches available at the moment.",
                });
                return false;
            }

            // Validate data consistency
            const isValid = cricketService.verifyMatchConsistency([matchData]);
            if (!isValid) {
                callback({
                    text: "Inconsistent match data detected from different sources!",
                });
                return false;
            }

            // Check for completed matches and tweet results
            const completedMatches = matchData.filter(
                (match) => match.status === "completed"
            );

            for (const match of completedMatches) {
                // Trigger settlement for the match
                await cricketService.triggerSettlement(match.id);

                // Compose a tweet for the match result
                const tweetContent = `🏏 Match Completed: ${match.teams.home} vs ${match.teams.away}
📊 Winner: ${match.winner}
🎯 Final Score: ${match.score} - ${match.score}
#Cricket #MatchResults`;

                elizaLogger.log("Generated tweet content:", tweetContent);

                // Post the tweet using the correct invocation
                const result = await postAction.handler(
                    runtime,
                    message,
                    state
                );

                if (result) {
                    elizaLogger.log("Tweet successfully posted!");
                } else {
                    elizaLogger.error(
                        `Failed to post tweet for match: ${match.id}`
                    );
                }
            }

            callback({
                text: `Successfully fetched ${matchData.length} cricket matches.`,
            });

            return true;
        } catch (error: any) {
            elizaLogger.error("Error fetching cricket matches:", error);
            callback({ text: `Error: ${error.message}` });
            return false;
        }
    },
};
