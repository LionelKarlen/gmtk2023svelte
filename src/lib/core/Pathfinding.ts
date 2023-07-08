import type Coordinates from './Coordinates';
import type Tile from './Tile';
import { AStarFinder } from 'astar-typescript';
import Game from './game';

export default function pathfind(grid: Array<Tile>, from: Coordinates, to: Coordinates) {
	const matrix: Array<Array<number>> = gridToMatrix(grid);
	const aStarInstance = new AStarFinder({
		grid: {
			matrix: matrix
		}
	});
	const tmpPath = aStarInstance.findPath(from, to);
	const path: Array<Coordinates> = tmpPath.map((v) => {
		return {
			x: v[0],
			y: v[1],
			index: v[1] * Game.SIZE_X + v[0]
		};
	});
	console.log(path);
}

export function gridToMatrix(grid: Array<Tile>) {
	const matrix: Array<Array<number>> = [];
	for (let y = 0; y < Game.SIZE_Y; y++) {
		const xRow: Array<number> = [];
		for (let x = 0; x < Game.SIZE_X; x++) {
			const index = y * Game.SIZE_X + x;
			if (!grid[index].isEmpty()) {
				xRow.push(1);
			} else {
				xRow.push(0);
			}
		}
		matrix.push(xRow);
	}
	console.log(matrix);
	return matrix;
}
