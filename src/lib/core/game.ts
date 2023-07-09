import Tile, { EmptyTile } from './Tile';
import type Coordinates from './Coordinates';
import { OccupiedTile, ExplosionTile } from './Tile';
import { Enemy, GeneratedObstacle, MeleeEnemy, RangedEnemy, ScoutEnemy, TankEnemy } from './Piece';
import { createNoise2D } from 'simplex-noise';
import { Allegiance } from './Allegiance';
import { Stages } from './Stage';
import Troop from './Troop';
import MovequeueException from './MovequeueException';
import { alea, type PRNG } from 'seedrandom';
import General from './General';

export default class Game {
	static readonly SIZE_X = 17;
	static readonly SIZE_Y = 8;

	static grid: Array<Tile> = [];
	stage: Stages = Stages.SETUP;
	general: General;
	static blueArmy: Array<Troop> = [];
	static redArmy: Array<Troop> = [];

	static prng: PRNG;

	public currentTurn = 0;
	static explosionTiles: Array<[Coordinates, number]> = [];

	constructor(seed = 'seed') {
		this.general = new General(seed);
		Game.prng = alea(seed);
		const noise = createNoise2D(Game.prng);
		const enemyNumber = 5;
		const spawnTilesX = 5;
		const spawnTilesY = Game.SIZE_Y / 4;
		const likelyhoodBalance = 10;
		const meleeLikelyhoodBalance = 0.5;
		const rangedLikelyhoodBalance = 0.5;
		const scoutLikelyhoodBalance = 0.4;
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
						Game.prng() > redEnemyNumber / likelyhoodBalance
					) {
						redEnemyNumber -= 1;
						let enemy: Enemy;
						if (Game.prng() > meleeLikelyhoodBalance) {
							enemy = new MeleeEnemy(Allegiance.RED);
						} else {
							const rng = Game.prng();
							if (rng > rangedLikelyhoodBalance) {
								enemy = new RangedEnemy(Allegiance.RED);
							} else if (rng > scoutLikelyhoodBalance) {
								enemy = new ScoutEnemy(Allegiance.RED);
							} else {
								enemy = new TankEnemy(Allegiance.RED);
							}
						}
						const troop = new Troop(coordinates, enemy);
						Game.redArmy.push(troop);
						tile = new OccupiedTile(coordinates, troop.piece);
					} else if (
						x >= Game.SIZE_X - spawnTilesX &&
						y >= spawnTilesY &&
						y <= Game.SIZE_Y - spawnTilesY &&
						blueEnemyNumber > 0 &&
						Game.prng() > blueEnemyNumber / likelyhoodBalance
					) {
						blueEnemyNumber -= 1;
						let enemy: Enemy;
						if (Game.prng() > meleeLikelyhoodBalance) {
							enemy = new MeleeEnemy(Allegiance.BLUE);
						} else {
							const rng = Game.prng();
							if (rng > rangedLikelyhoodBalance) {
								enemy = new RangedEnemy(Allegiance.BLUE);
							} else if (rng > scoutLikelyhoodBalance) {
								enemy = new ScoutEnemy(Allegiance.BLUE);
							} else {
								enemy = new TankEnemy(Allegiance.BLUE);
							}
						}
						const troop = new Troop(coordinates, enemy);
						Game.blueArmy.push(troop);
						tile = new OccupiedTile(coordinates, troop.piece);
					} else {
						tile = new EmptyTile(coordinates);
					}
				}
				Game.grid.push(tile);
			}
		}
		this.stage = Stages.READY;
	}

	static updateTile(newTile: Tile) {
		Game.grid[newTile.coordinates.index ?? -1] = newTile;
	}

	static isDead(piece: Enemy) {
		return piece.pieceStats.health <= 0;
	}

	static handleDead(piece: Enemy) {
		if (piece.allegiance == 0) {
			const index = this.blueArmy.findIndex((v) => v.piece == piece);
			const coordinate = this.blueArmy[index].coordinate;
			Game.updateTile(new ExplosionTile(coordinate, piece.size));
			Game.explosionTiles.push([coordinate, 0]);
			this.blueArmy.splice(index, 1);
		} else {
			const index = this.redArmy.findIndex((v) => v.piece == piece);
			const coordinate = this.redArmy[index].coordinate;
			Game.updateTile(new ExplosionTile(coordinate, piece.size));
			Game.explosionTiles.push([coordinate, 0]);
			this.redArmy.splice(index, 1);
		}
	}

	getCurrentTroop(seededTroop?: Troop) {
		if (seededTroop) {
			const allegiance = seededTroop.piece.allegiance;
			const troopIndex =
				allegiance == 1
					? Game.redArmy.findIndex((v) => v.piece == seededTroop.piece)
					: Game.blueArmy.findIndex((v) => v.piece == seededTroop.piece);
			return allegiance == 1
				? Game.redArmy[this.general.decideMove(Game.grid, Game.redArmy, Game.blueArmy, troopIndex)]
				: Game.blueArmy[
						this.general.decideMove(Game.grid, Game.blueArmy, Game.redArmy, troopIndex)
				  ];
		}
		if (this.currentTurn == 1) {
			return Game.redArmy[this.general.decideMove(Game.grid, Game.redArmy, Game.blueArmy)];
		}
		return Game.blueArmy[this.general.decideMove(Game.grid, Game.blueArmy, Game.redArmy)];
	}

	getMove(seededTroop?: Troop, recursion?: number) {
		const troop = this.getCurrentTroop(seededTroop);
		let repeat = recursion ?? 1;
		repeat += 1;
		if (repeat == 3) {
			console.error('RECURSION MAX REACHED YOU IDIOT DONT EVEN KNOW WHY THIS HAPPENS');
			return;
		}
		try {
			Game.grid = troop?.makeMove(Game.grid);
		} catch (error: unknown) {
			if (error instanceof MovequeueException) {
				console.debug('requesting new Movequeue', troop);
				this.getMove(troop, repeat);
			}
		}
	}

	cycleGameLoop() {
		console.log('turn', Object.values(Allegiance)[this.currentTurn]);
		this.getMove();
		console.log('done');
		this.nextTurn();
		return Game.grid;
	}

	nextTurn() {
		if (this.isGameOver()) {
			console.log('game over');
		}
		this.currentTurn = (this.currentTurn + 1) % 2;
		this.cleanupExplosionTiles();
	}

	isGameOver() {
		return Game.redArmy.length == 0 || Game.blueArmy.length == 0;
	}

	cleanupExplosionTiles() {
		const TURNS_AFTER_DEATH_SHOWN = 1;
		for (const explosionTileData of Game.explosionTiles) {
			explosionTileData[1] += 1;
			if (explosionTileData[1] == TURNS_AFTER_DEATH_SHOWN + 1) {
				Game.updateTile(new EmptyTile(explosionTileData[0]));
			}
		}
	}
}
