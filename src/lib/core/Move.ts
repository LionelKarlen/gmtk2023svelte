import type Coordinates from './Coordinates';
import type Troop from './Troop';
export enum MoveType {
	Movement,
	Attack
}

export default abstract class Move {
	fromCoordinate: Coordinates;
	toCoordinate: Coordinates;
	moveType: MoveType;
	path: Array<Coordinates>;
	constructor(fromCoordinate: Coordinates, toCoordinate: Coordinates, movetype: MoveType) {
		this.fromCoordinate = fromCoordinate;
		this.toCoordinate = toCoordinate;
		this.moveType = movetype;
		this.path = [];
	}
}

export class AttackMove extends Move {
	attacker: Troop;
	defender: Troop;
	constructor(
		fromCoordinate: Coordinates,
		toCoordinate: Coordinates,
		attacker: Troop,
		defender: Troop
	) {
		super(fromCoordinate, toCoordinate, MoveType.Attack);
		this.attacker = attacker;
		this.defender = defender;
	}
}

export class MovementMove extends Move {
	constructor(fromCoordinate: Coordinates, toCoordinate: Coordinates) {
		super(fromCoordinate, toCoordinate, MoveType.Movement);
	}
}
