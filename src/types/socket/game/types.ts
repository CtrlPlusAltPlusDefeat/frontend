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
