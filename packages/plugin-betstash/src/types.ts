import { z } from "zod";
export interface CricketMatch {
    id: string;
    sport: "cricket";
    teams: {
        home: { name: string; logo: string; odds: number };
        away: { name: string; logo: string; odds: number };
    };
    startTime: string;
    status: "live" | "completed" | "upcoming";
    score: { home: number; away: number };
    maxBettingAmount: number;
    currentBettors: number;
    winner: string | null;
}

export interface TweetContent {
    text: string;
}

export const TweetSchema = z.object({
    text: z.string().describe("The text of the tweet"),
});

export const isTweetContent = (obj: any): obj is TweetContent => {
    return TweetSchema.safeParse(obj).success;
};
