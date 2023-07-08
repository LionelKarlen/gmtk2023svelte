import Tile, { EmptyTile } from './Tile';
import type Coordinates from './Coordinates';
import { OccupiedTile } from './Tile';
import { GeneratedObstacle, MeleeEnemy } from './Piece';
import { createNoise2D } from 'simplex-noise';
import alea from 'alea';
import { Allegiance } from './Allegiance';
import { Stages } from './Stage';
import Troop from './Troop';
import { decide } from './General';

export default class Game {
	static readonly SIZE_X = 32;
	static readonly SIZE_Y = 16;

	static grid: Array<Tile> = [];
	stage: Stages;
	blueArmy: Array<Troop> = [];
	redArmy: Array<Troop> = [];

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
						this.redArmy.push(troop);
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
						this.blueArmy.push(troop);
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

	cycleGameLoop() {
		console.log('turn', Object.values(Allegiance)[this.currentTurn]);
		const troop = this.redArmy[decide(Game.grid, this.redArmy, this.blueArmy) ?? 0];
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
		return this.redArmy.length == 0 || this.blueArmy.length == 0;
	}
}
