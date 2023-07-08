import type Move from './Move';
import type Tile from './Tile';
import type Troop from './Troop';
import pathfind from './Pathfinding';
import { MovementMove } from './Move';
import type Coordinates from './Coordinates';

export default class General {
	army: Array<Troop>;

	constructor(army: Array<Troop>) {
		this.army = army;
	}
}

export function decide(grid: Array<Tile>, attackArmy: Array<Troop>, defendArmy: Array<Troop>) {
	const attackTroop = attackArmy[0];
	const defendTroop = defendArmy[0];
	if (!attackTroop.isProcessing()) {
		const path = pathfind(grid, attackTroop.coordinate, defendTroop.coordinate);

		const moves: Array<Move> = [];
		let lastStep: Coordinates = attackTroop.coordinate;
		for (const step of path) {
			const move = new MovementMove(lastStep, step);
			lastStep = step;
			moves.push(move);
		}
		attackArmy[0].moveQueue.push(...moves);
		return 0;
	}

	// const move = new AttackMove(attackTroop.coordinate, defendTroop.coordinate);
}
