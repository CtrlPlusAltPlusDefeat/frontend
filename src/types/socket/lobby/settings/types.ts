export const GameIds = {
	WordGuess: 0
} as const;

export type GameId = (typeof GameIds)[keyof typeof GameIds];

export interface BaseSettings {
	gameId: GameId;
	maxPlayers: number;
}

export interface WordGuessSettings extends BaseSettings {}
