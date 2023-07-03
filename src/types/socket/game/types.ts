export type TeamName = 'red' | 'blue';
export type State = 'prematch' | 'inprogress' | 'postmatch';

export interface GameSession {
	game: WordGuessGame;
	info: GameSessionInfo;
	state: GameSessionState;
	teams: Team[];
}

export type CardColour = 'red' | 'blue' | 'white' | 'black' | '';

export interface Card {
	colour: CardColour;
	revealed: boolean;
	word: string;
}

export interface WordGuessGame {
	cards: Card[][];
	xLength: number;
	yLength: number;
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
	data?: string;
}

export interface Team {
	name: TeamName;
	players: TeamPlayer[];
}

export const getTeamCardColour = (name: TeamName) => {
	switch (name) {
		case 'red':
			return 'bg-red-300 border-red-700';
		case 'blue':
			return 'bg-blue-300 border-blue-700';
	}
	return '';
};

export const getTeamTextColour = (name: TeamName) => {
	switch (name) {
		case 'red':
			return 'text-red-700';
		case 'blue':
			return 'text-blue-700';
	}
	return '';
};
