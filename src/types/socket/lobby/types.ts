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
};
