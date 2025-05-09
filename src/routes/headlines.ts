export enum Demographics_t {
	AGE_YOUNG,
	AGE_MID,
	AGE_OLD,
	MONEY_LOWER,
	MONEY_MID,
	MONEY_RICH,
	TYPE_GOOD,
	TYPE_SERVICE,
	TYPE_ESTABLISHMENT
}

export type Event_t = {
	targets: {
		demographic: Demographics_t;
		effect: {
			type: '%';
			value: number;
		};
	}[];
	headline: string;
};

export const events: Event_t[] = [];
