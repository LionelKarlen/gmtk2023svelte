import type { Allegiance } from './Allegiance';

export default abstract class Piece {
	abstract isObstacle(): boolean;
}

export abstract class Enemy extends Piece {
	isObstacle(): boolean {
		return false;
	}
	allegiance: Allegiance;
	constructor(allegiance: Allegiance) {
		super();
		this.allegiance = allegiance;
	}
}

export class MeleeEnemy extends Enemy {
	constructor(allegiance: Allegiance) {
		super(allegiance);
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
