import { WordGuessGame, WordGuessPlayerData } from './wordguess';

export type TeamName = 'red' | 'blue';
export type Role = 'operative' | 'spymaster';
export type State = 'prematch' | 'inprogress' | 'postmatch';

export interface GameSession {
	game: WordGuessGame;
	info: GameSessionInfo;
	state: GameSessionState;
	teams: Team[];
}

export interface Settings<Game = unknown> {
	gameId: number;
	maxPlayers: number;
	teams: number;
	game: Game;
}

export interface GameSessionInfo {
	lobbyId: string;
	gameSessionId: string;
	gameTypeId: string;
}

export interface GameSessionState {
	currentTurn: TeamName | '';
	state: State;
}

export interface TeamPlayer {
	id: string;
	data?: WordGuessPlayerData;
}

export interface Team {
	name: TeamName;
	players: TeamPlayer[];
}

export type LobbyPlayer = {
	id: string;
	name: string;
	isAdmin: boolean;
	points: number;
	isOnline: boolean;
};

export type LobbyDetails = {
	players: LobbyPlayer[];
	lobbyId: string;
	gameSessionId: string;
	inGame: boolean;
	settings?: Settings<string>;
};

export interface Message {
	text: string;
	timestamp: number;
	playerId: string;
}
