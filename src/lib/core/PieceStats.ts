export default interface PieceStats {
	health: number;
	damage: number;
	movement: number;
	attackRange: number;
}

export const DEFAULT_STATS: PieceStats = {
	health: 100,
	damage: 20,
	movement: 3,
	attackRange: 1
};

export const RANGED_STATS: PieceStats = {
	health: 50,
	damage: 20,
	movement: 5,
	attackRange: 3
};
