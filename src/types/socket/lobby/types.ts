export type LobbyPlayer = {
	id: string;
	name: string;
	isAdmin: boolean;
	points: number;
};

export type LobbyDetails = {
	players: LobbyPlayer[];
	lobbyId: string;
};
