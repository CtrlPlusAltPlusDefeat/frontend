import { Role, Settings, TeamName } from './interfaces';
import { GameIds } from './enum';

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

export interface WordGuessPlayerData {
	role: Role;
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

export const getTeamTextColour = (name: TeamName | '') => {
	switch (name) {
		case 'red':
			return 'text-red-700';
		case 'blue':
			return 'text-blue-700';
	}
	return '';
};

export const getTeamBackgroundColour = (name: CardColour) => {
	switch (name) {
		case 'red':
			return 'bg-red-700/[.6]';
		case 'blue':
			return 'bg-blue-700/[.6]';
		case 'black':
			return 'bg-black/[.6]';
	}
	return '';
};

export interface WordGuessSettings extends Settings {
	game: {
		blackCards: number;
		whiteCards: number;
		colouredCards: number;
		dynamic: boolean;
	};
}

export const isWordGuessSettings = (json: Settings): json is WordGuessSettings => json.gameId === GameIds.WordGuess;
