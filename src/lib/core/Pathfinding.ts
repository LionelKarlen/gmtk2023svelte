import type Coordinates from './Coordinates';
import type Tile from './Tile';
import { AStarFinder } from 'astar-typescript';
import Game from './game';

export default function pathfind(
	grid: Array<Tile>,
	from: Coordinates,
	to: Coordinates
): Array<Coordinates> {
	const matrix: Array<Array<number>> = gridToMatrix(grid, from, to);
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
	path.splice(0, 1);
	return path;
}

export function gridToMatrix(grid: Array<Tile>, from: Coordinates, to: Coordinates) {
	const matrix: Array<Array<number>> = [];
	for (let y = 0; y < Game.SIZE_Y; y++) {
		const xRow: Array<number> = [];
		for (let x = 0; x < Game.SIZE_X; x++) {
			if ((x == from.x && y == from.y) || (x == to.x && y == to.y)) {
				xRow.push(0);
				continue;
			}
			const index = y * Game.SIZE_X + x;
			if (!grid[index].isEmpty()) {
				xRow.push(1);
			} else {
				xRow.push(0);
			}
		}
		matrix.push(xRow);
	}
	return matrix;
}
