import type Coordinates from './Coordinates';
import type { Enemy } from './Piece';
export default class Troop {
	coordinate: Coordinates;
	piece: Enemy;

	constructor(coordinate: Coordinates, piece: Enemy) {
		this.coordinate = coordinate;
		this.piece = piece;
	}

	isProcessing = false;
}
