import { ActionExample } from "@elizaos/core";

export const getCricketMatchExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "What are the live cricket matches right now?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Fetching live cricket matches for you...",
                action: "FETCH_CRICKET_MATCHES",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you get the latest cricket match updates?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sure! Let me check for ongoing and upcoming matches.",
                action: "FETCH_CRICKET_MATCHES",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Are there any ongoing cricket matches?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me check the live cricket matches for you.",
                action: "FETCH_CRICKET_MATCHES",
            },
        },
    ],
];

export const getCricketSettlementExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Has the match between India and Australia ended?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me check if the match has been completed.",
                action: "FETCH_CRICKET_MATCHES",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Yes, the match is completed. Would you like to process bet settlements?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "Yes, please settle the bets.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Processing settlements for the completed match...",
                action: "TRIGGER_BET_SETTLEMENT",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you verify the winner of today's cricket match?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me check the latest results.",
                action: "FETCH_CRICKET_MATCHES",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The latest match has ended. The winner is {{winner_team}}.",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "Please settle the bets based on this result.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Initiating bet settlements...",
                action: "TRIGGER_BET_SETTLEMENT",
            },
        },
    ],
];
