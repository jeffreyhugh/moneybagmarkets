export const randBetween = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min)) + min;
