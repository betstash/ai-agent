import { generateTweetActions } from "@elizaos/core";
import { CricketMatch } from "./types";

export const createCricketService = (apiEndpoints: string[]) => {
    // Fetch data from all sources
    const getCricketMatches = async (): Promise<CricketMatch[]> => {
        try {
            const responses = await Promise.all(
                apiEndpoints.map((url) => fetch(url).then((res) => res.json()))
            );
            return responses.flat(); // Merge results from multiple APIs
        } catch (error: any) {
            console.error("Cricket API Error:", error.message);
            throw error;
        }
    };

    // Verify if all sources return the same data
    const verifyMatchConsistency = (matches: CricketMatch[][]): boolean => {
        if (matches.length < 2) return true; // No need to compare if only one source

        const [firstSource, ...otherSources] = matches;
        return otherSources.every(
            (source) =>
                source.length === firstSource.length &&
                source.every(
                    (match, index) =>
                        JSON.stringify(match) ===
                        JSON.stringify(firstSource[index])
                )
        );
    };

    // Trigger settlement action for a completed match
    const triggerSettlement = async (matchId: string): Promise<boolean> => {
        try {
            const response = await fetch("http://localhost:4000/settle-bet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ matchId }),
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to settle match ${matchId}: ${response.statusText}`
                );
            }

            console.log(`Match ${matchId} settled successfully.`);
            return true;
        } catch (error: any) {
            console.error("Settlement Error:", error.message);
            return false;
        }
    };

    return { getCricketMatches, verifyMatchConsistency, triggerSettlement };
};
