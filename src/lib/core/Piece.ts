import { Allegiance } from './Allegiance';
import type PieceStats from './PieceStats';
import { DEFAULT_STATS, RANGED_STATS } from './PieceStats';

export default abstract class Piece {
	abstract isObstacle(): boolean;
}

export abstract class Enemy extends Piece {
	isObstacle(): boolean {
		return false;
	}
	allegiance: Allegiance;
	asset: string;
	size: number;
	abstract pieceStats: PieceStats;
	constructor(allegiance: Allegiance) {
		super();
		this.allegiance = allegiance;
		this.asset = '';
		this.size = 2;
	}
}

export class EmptyEnemy extends Enemy {
	pieceStats: PieceStats;
	constructor() {
		super(Allegiance.BLUE);
		this.pieceStats = structuredClone(DEFAULT_STATS);
	}
}

export class MeleeEnemy extends Enemy {
	pieceStats: PieceStats;
	constructor(allegiance: Allegiance) {
		super(allegiance);
		this.pieceStats = structuredClone(DEFAULT_STATS);
		this.asset = (this.allegiance == 1 ? 'r' : 'b') + 'melee';
		this.size = 3;
	}
}

export class RangedEnemy extends Enemy {
	pieceStats: PieceStats;
	constructor(allegiance: Allegiance) {
		super(allegiance);
		this.pieceStats = structuredClone(RANGED_STATS);
		this.asset = (this.allegiance == 1 ? 'r' : 'b') + 'ranged';
		this.size = 2;
	}
}

export abstract class Obstacle extends Piece {
	isObstacle(): boolean {
		return true;
	}
	abstract isGenerated(): boolean;
}

export class GeneratedObstacle extends Obstacle {
	isGenerated(): boolean {
		return true;
	}
}

export class PlacedObstacle extends Obstacle {
	isGenerated(): boolean {
		return false;
	}
}
