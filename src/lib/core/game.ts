import Tile, { EmptyTile } from './Tile';
import type Coordinates from './Coordinates';
import { OccupiedTile } from './Tile';
import { GeneratedObstacle } from './Piece';
import { createNoise2D } from 'simplex-noise';
import alea from 'alea';

export default class Game {
	readonly SIZE_X = 32;
	readonly SIZE_Y = 16;

	grid: Array<Tile> = [];

	constructor(seed = 'seed') {
		const prng = alea(seed);
		const noise = createNoise2D(prng);
		for (let y = 0; y < this.SIZE_Y; y++) {
			for (let x = 0; x < this.SIZE_X; x++) {
				const coordinates: Coordinates = {
					x: x,
					y: y
				};
				let tile: Tile;
				if (noise(x, y + 20) > 0.9) {
					tile = new OccupiedTile(coordinates, new GeneratedObstacle());
				} else {
					tile = new EmptyTile(coordinates);
				}
				this.grid.push(tile);
			}
		}
	}
}
