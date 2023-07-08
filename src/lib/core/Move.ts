import type Coordinates from './Coordinates';
export enum MoveType {
	Movement,
	Attack
}

export default abstract class Move {
	fromCoordinate: Coordinates;
	toCoordinate: Coordinates;
	moveType: MoveType;
	constructor(fromCoordinate: Coordinates, toCoordinate: Coordinates, movetype: MoveType) {
		this.fromCoordinate = fromCoordinate;
		this.toCoordinate = toCoordinate;
		this.moveType = movetype;
	}
}
