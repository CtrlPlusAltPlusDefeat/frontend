export type TeamName = 'red' | 'blue';
export type State = 'prematch' | 'inprogress' | 'postmatch';

export interface GameSession {
	info: GameSessionInfo;
	state: GameSessionState;
	teams: Team[];
}

export interface GameSessionInfo {
	lobbyId: string;
	gameSessionId: string;
	gameTypeId: string;
}

export interface GameSessionState {
	currentTurn: TeamName;
	state: State;
}

export interface Team {
	name: TeamName;
	players: string[];
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
