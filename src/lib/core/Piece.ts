import type { Allegiance } from './Allegiance';
import type PieceStats from './PieceStats';
import { DEFAULT_STATS } from './PieceStats';

export default abstract class Piece {
	abstract isObstacle(): boolean;
}

export abstract class Enemy extends Piece {
	isObstacle(): boolean {
		return false;
	}
	allegiance: Allegiance;
	abstract pieceStats: PieceStats;
	constructor(allegiance: Allegiance) {
		super();
		this.allegiance = allegiance;
	}
}

export class MeleeEnemy extends Enemy {
	pieceStats: PieceStats;
	constructor(allegiance: Allegiance) {
		super(allegiance);
		this.pieceStats = DEFAULT_STATS;
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
