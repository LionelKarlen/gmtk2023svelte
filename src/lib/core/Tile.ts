import type Coordinates from './Coordinates';
import type Piece from './Piece';

export default abstract class Tile {
	coordinates: Coordinates;

	constructor(coordinants: Coordinates) {
		this.coordinates = coordinants;
	}

	abstract isEmpty(): boolean;
	abstract getPiece(): Piece | null;
}

export class EmptyTile extends Tile {
	constructor(coordinates: Coordinates) {
		super(coordinates);
	}
	isEmpty(): boolean {
		return true;
	}
	getPiece(): null {
		return null;
	}
}

export class OccupiedTile extends Tile {
	piece: Piece;
	constructor(coordinates: Coordinates, piece: Piece) {
		super(coordinates);
		this.piece = piece;
	}
	isEmpty(): boolean {
		return false;
	}
	isObstacle(): boolean {
		return true;
	}
	getPiece(): Piece {
		return this.piece;
	}
}

export class ExplosionTile extends Tile {
	isEmpty(): boolean {
		return true;
	}
	getPiece(): null {
		return null;
	}
	size: number;
	constructor(coordinates: Coordinates, size: number) {
		super(coordinates);
		this.size = size;
	}
}
