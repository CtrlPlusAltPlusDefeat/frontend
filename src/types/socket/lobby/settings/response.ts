import { BaseSettings, GameIds, WordGuessSettings } from './types';

export const isWordGuessSettings = (json: BaseSettings): json is WordGuessSettings => json.gameId === GameIds.WordGuess;
