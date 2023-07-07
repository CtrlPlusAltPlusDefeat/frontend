import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { WordGuessGame } from '../../common/wordguess';
import { GameSessionInfo, GameSessionState, Team } from '../../common/interfaces';

interface GameStateStore {
	game?: WordGuessGame;
	info?: GameSessionInfo;
	state?: GameSessionState;
	teams: Team[];
	setInfo: (i: GameSessionInfo) => void;
	setState: (s: GameSessionState) => void;
	setTeams: (t: Team[]) => void;
	setGame: (g: WordGuessGame) => void;
}

export const useGameStore = create(
	immer<GameStateStore>((set) => ({
		info: undefined,
		state: undefined,
		teams: [],
		setInfo: (i) =>
			set((state) => {
				state.info = i;
			}),
		setState: (s) =>
			set((state) => {
				state.state = s;
			}),
		setTeams: (t) =>
			set((state) => {
				state.teams = t;
			}),
		setGame: (g) =>
			set((state) => {
				state.game = g;
			})
	}))
);
