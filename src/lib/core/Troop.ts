import type Coordinates from './Coordinates';
import type Move from './Move';
import { MoveType } from './Move';
import type { Enemy } from './Piece';
import type Tile from './Tile';
import { EmptyTile, OccupiedTile } from './Tile';
export default class Troop {
	coordinate: Coordinates;
	piece: Enemy;
	moveQueue: Array<Move>;

	constructor(coordinate: Coordinates, piece: Enemy) {
		this.coordinate = coordinate;
		this.piece = piece;
		this.moveQueue = [];
	}

	isProcessing() {
		return this.moveQueue.length > 0;
	}

	makeMove(grid: Array<Tile>) {
		const move = this.moveQueue[0];
		console.log(move);
		if (move.moveType == MoveType.Movement) {
			if (move.fromCoordinate.index) {
				if (move.toCoordinate.index) {
					if (grid[move.toCoordinate.index].isEmpty()) {
						console.log('from');
						grid[move.fromCoordinate.index] = new EmptyTile(move.fromCoordinate);

						console.log('to', move.toCoordinate.index);
						grid[move.toCoordinate.index] = new OccupiedTile(move.toCoordinate, this.piece);
						this.coordinate = move.toCoordinate;
					}
				}
			}
		}
		this.moveQueue.splice(0, 1);
		return grid;
	}
}
