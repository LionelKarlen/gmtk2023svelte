export default interface PieceStats {
	health: number;
	maxHealth: number;
	damage: number;
	dexterity: number;
	movement: number;
	attackRange: number;
}

export const DEFAULT_STATS: PieceStats = {
	health: 100,
	maxHealth: 100,
	damage: 30,
	dexterity: 0.2,
	attackRange: 1,
	movement: 2
};

export const RANGED_STATS: PieceStats = {
	health: 50,
	maxHealth: 50,
	damage: 30,
	dexterity: 0.2,
	attackRange: 3,
	movement: 2
};

export const SCOUT_STATS: PieceStats = {
	health: 25,
	maxHealth: 25,
	damage: 10,
	dexterity: 0.5,
	attackRange: 1,
	movement: 4
};

export const TANK_STATS: PieceStats = {
	health: 150,
	maxHealth: 150,
	damage: 20,
	dexterity: 0,
	attackRange: 1,
	movement: 1
};
