export default abstract class Piece {
	abstract isObstacle(): boolean;
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
