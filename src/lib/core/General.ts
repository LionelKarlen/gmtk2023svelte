import type Move from './Move';
import type Tile from './Tile';
import type Troop from './Troop';
import pathfind from './Pathfinding';
import { MovementMove, AttackMove } from './Move';
import type Coordinates from './Coordinates';
import { alea, type PRNG } from 'seedrandom';

export default class General {
	prng: PRNG;
	constructor(seed: string) {
		this.prng = alea(seed);
	}

	findBestEnemy(grid: Array<Tile>, attackTroop: Troop, defendArmy: Array<Troop>) {
		let bestCost = 9999999;
		let bestTroop = defendArmy[0];

		for (const defendTroop of defendArmy) {
			const pathCost = pathfind(grid, attackTroop.coordinate, defendTroop.coordinate).length;
			const healthCost = defendTroop.piece.pieceStats.health / attackTroop.piece.pieceStats.damage;

			const cost = pathCost + healthCost;
			if (cost < bestCost) {
				bestCost = cost;
				bestTroop = defendTroop;
			}
		}
		return bestTroop;
	}

	decideMove(
		grid: Array<Tile>,
		attackArmy: Array<Troop>,
		defendArmy: Array<Troop>,
		seededAttackTroopIndex?: number
	) {
		const attackTroopIndex = seededAttackTroopIndex ?? Math.floor((attackArmy.length-1) * this.prng());
		console.log('attackTroopIndex', attackTroopIndex);
		const attackTroop = attackArmy[attackTroopIndex];
		// const defendTroop = defendArmy[defendTroopIndex];
		const defendTroop = this.findBestEnemy(grid, attackTroop, defendArmy);
		if (!attackTroop.isProcessing()) {
			const path = pathfind(grid, attackTroop.coordinate, defendTroop.coordinate);

			const moves: Array<Move> = [];
			let lastStep: Coordinates = attackTroop.coordinate;
			for (const step of path) {
				const move = new MovementMove(lastStep, step);
				lastStep = step;
				moves.push(move);
			}
			if (lastStep.index == defendTroop.coordinate.index) {
				moves.pop();
				const move = new AttackMove(lastStep, lastStep, attackTroop, defendTroop);
				moves.push(move);
			}
			attackArmy[attackTroopIndex].moveQueue.push(...moves);
			console.log('pushing new move Queue');
		}
		return attackTroopIndex;
	}
}
