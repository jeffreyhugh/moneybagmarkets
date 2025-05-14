import { loadedEvents } from './gamestate.svelte';
import type { Moneybag_t } from './moneybags';

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

type BaseTarget_t = {
	effect: {
		type: '%';
		isNegative?: boolean;
	};
};

export type DemographicTarget_t = {
	demographic: Demographics_t;
} & BaseTarget_t;

export type MoneybagTarget_t = {
	moneybag: Moneybag_t['name'];
} & BaseTarget_t;

export type Event_t = {
	moneybagTargets: MoneybagTarget_t[];
	demographicTargets: DemographicTarget_t[];
	headline: string;
};

export type ActiveEvent_t = {
	headline: string;
	moneybagTargets: {
		moneybag: Moneybag_t['name'];
		effect: {
			type: '%';
			value: number;
		};
	}[];
	demographicTargets: {
		demographic: Demographics_t;
		effect: {
			type: '%';
			value: number;
		};
	}[];
};

export const downloadEvents = async () => {
	fetch('/events.json')
		.then((res) => res.json())
		.then((j) => (loadedEvents.events = j));
};
