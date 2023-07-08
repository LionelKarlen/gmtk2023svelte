import type Coordinates from './Coordinates';
import type Move from './Move';
import { MoveType, AttackMove } from './Move';
import type Tile from './Tile';
import { EmptyTile, OccupiedTile } from './Tile';
import Game from './game';
import { Enemy } from './Piece';
import MovequeueException from './MovequeueException';
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
		for (let index = 0; index < this.piece.pieceStats.movement; index++) {
			const move = this.moveQueue[0];
			console.log(move);
			if (move.fromCoordinate.index) {
				if (move.toCoordinate.index) {
					if (move.moveType == MoveType.Movement) {
						if (grid[move.toCoordinate.index].isEmpty()) {
							console.log('from');
							Game.updateTile(new EmptyTile(move.fromCoordinate));

							console.log('to', move.toCoordinate.index);
							Game.updateTile(new OccupiedTile(move.toCoordinate, this.piece));
							this.coordinate = move.toCoordinate;
							this.moveQueue.splice(0, 1);
						} else {
							console.log('stuck, clearing movequeue');
							this.moveQueue = [];
							throw new MovequeueException('No Movequeue');
						}
					}
					if (move.moveType == MoveType.Attack && move instanceof AttackMove) {
						if (grid[move.toCoordinate.index].isEmpty()) {
							console.log('no enemy, clearing movequeue');
							this.moveQueue = [];
							throw new MovequeueException('No Movequeue');
						} else {
							const defendingPiece = grid[move.toCoordinate.index].getPiece();
							if (
								defendingPiece instanceof Enemy &&
								defendingPiece.allegiance != move.attacker.piece.allegiance
							) {
								if (Game.prng() > defendingPiece.pieceStats.dexterity) {
									defendingPiece.pieceStats.health -= move.attacker.piece.pieceStats.damage;
								} else {
									console.info('DODGED');
								}
								if (Game.isDead(defendingPiece)) {
									Game.handleDead(defendingPiece);
								} else {
									this.moveQueue.push(
										new AttackMove(
											move.fromCoordinate,
											move.toCoordinate,
											move.attacker,
											move.defender
										)
									);
								}
								this.moveQueue.splice(0, 1);
							}
						}
					}
				}
			}
		}
		return grid;
	}
}
