import Tile, { EmptyTile } from './Tile';
import type Coordinates from './Coordinates';
import { OccupiedTile } from './Tile';
import { Enemy, GeneratedObstacle, MeleeEnemy } from './Piece';
import { createNoise2D } from 'simplex-noise';
import alea from 'alea';
import { Allegiance } from './Allegiance';
import { Stages } from './Stage';
import Troop from './Troop';
import { decide } from './General';
import Piece from './Piece';

export default class Game {
	static readonly SIZE_X = 32;
	static readonly SIZE_Y = 16;

	static grid: Array<Tile> = [];
	stage: Stages;
	static blueArmy: Array<Troop> = [];
	static redArmy: Array<Troop> = [];

	public currentTurn = 0;

	constructor(seed = 'seed') {
		this.stage = Stages.PLANNING;
		const prng = alea(seed);
		const noise = createNoise2D(prng);
		const enemyNumber = 5;
		const spawnTilesX = 5;
		const spawnTilesY = Game.SIZE_Y / 4;
		const likelyhoodBalance = 10;
		let redEnemyNumber = enemyNumber;
		let blueEnemyNumber = enemyNumber;
		for (let y = 0; y < Game.SIZE_Y; y++) {
			for (let x = 0; x < Game.SIZE_X; x++) {
				const coordinates: Coordinates = {
					x: x,
					y: y,
					index: y * Game.SIZE_X + x
				};
				let tile: Tile;
				if (noise(x, y + 20) > 0.9) {
					tile = new OccupiedTile(coordinates, new GeneratedObstacle());
				} else {
					if (
						x <= spawnTilesX &&
						y >= spawnTilesY &&
						y <= Game.SIZE_Y - spawnTilesY &&
						redEnemyNumber > 0 &&
						prng() > redEnemyNumber / likelyhoodBalance
					) {
						redEnemyNumber -= 1;
						const troop = new Troop(coordinates, new MeleeEnemy(Allegiance.RED));
						Game.redArmy.push(troop);
						tile = new OccupiedTile(coordinates, troop.piece);
					} else if (
						x >= Game.SIZE_X - spawnTilesX &&
						y >= spawnTilesY &&
						y <= Game.SIZE_Y - spawnTilesY &&
						blueEnemyNumber > 0 &&
						prng() > blueEnemyNumber / likelyhoodBalance
					) {
						blueEnemyNumber -= 1;
						const troop = new Troop(coordinates, new MeleeEnemy(Allegiance.BLUE));
						Game.blueArmy.push(troop);
						tile = new OccupiedTile(coordinates, troop.piece);
					} else {
						tile = new EmptyTile(coordinates);
					}
				}
				Game.grid.push(tile);
			}
		}
	}

	static updateTile(newTile: Tile) {
		Game.grid[newTile.coordinates.index ?? -1] = newTile;
	}

	static handleDead(piece: Enemy) {
		if (piece.pieceStats.health <= 0) {
			if (piece.allegiance == 0) {
				const index = this.blueArmy.findIndex((v) => v.piece == piece);
				Game.updateTile(new EmptyTile(this.blueArmy[index].coordinate));
				this.blueArmy.splice(index, 1);
			}
		}
	}

	cycleGameLoop() {
		console.log('turn', Object.values(Allegiance)[this.currentTurn]);
		const troop = Game.redArmy[decide(Game.grid, Game.redArmy, Game.blueArmy) ?? 0];
		Game.grid = troop?.makeMove(Game.grid);
		console.log('done');
		this.nextTurn();
		return Game.grid;
	}

	nextTurn() {
		if (this.isGameOver()) {
			console.log('game over');
		}
		this.currentTurn = (this.currentTurn + 1) % 2;
	}

	isGameOver() {
		return Game.redArmy.length == 0 || Game.blueArmy.length == 0;
	}
}
