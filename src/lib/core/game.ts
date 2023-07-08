import Tile, { EmptyTile } from './Tile';
import type Coordinates from './Coordinates';
import { OccupiedTile } from './Tile';
import { GeneratedObstacle, MeleeEnemy } from './Piece';
import { createNoise2D } from 'simplex-noise';
import alea from 'alea';
import { Allegiance } from './Allegiance';
import { Stages } from './Stage';
import pathfind from './Pathfinding';

export default class Game {
	static readonly SIZE_X = 32;
	static readonly SIZE_Y = 16;

	grid: Array<Tile> = [];
	stage: Stages;

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
						tile = new OccupiedTile(coordinates, new MeleeEnemy(Allegiance.RED));
					} else if (
						x >= Game.SIZE_X - spawnTilesX &&
						y >= spawnTilesY &&
						y <= Game.SIZE_Y - spawnTilesY &&
						blueEnemyNumber > 0 &&
						prng() > blueEnemyNumber / likelyhoodBalance
					) {
						blueEnemyNumber -= 1;
						tile = new OccupiedTile(coordinates, new MeleeEnemy(Allegiance.BLUE));
					} else {
						tile = new EmptyTile(coordinates);
					}
				}
				this.grid.push(tile);
			}
		}
		pathfind(this.grid, { x: 0, y: 0 }, { x: 31, y: 15 });
	}
}
