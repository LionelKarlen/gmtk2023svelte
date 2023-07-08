export default interface PieceStats {
	health: number,
	damage: number,
	movement: number,
}


export const DEFAULT_STATS: PieceStats = {
	health: 100,
	damage: 20,
	movement: 3
}