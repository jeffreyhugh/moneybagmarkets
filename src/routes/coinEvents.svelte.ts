import { v4 } from 'uuid';

export type CoinEvent_t = {
	id: string;
	sign: '+' | '-';
	value: number;
	suffix?: string;
};

export const coinEvents = $state<{ events: CoinEvent_t[] }>({ events: [] });

export const coin = (
	sign: CoinEvent_t['sign'],
	value: CoinEvent_t['value'],
	suffix?: CoinEvent_t['suffix']
) => {
	const id = v4();
	coinEvents.events.push({ sign, value, suffix, id });
	setTimeout(() => {
		coinEvents.events = coinEvents.events.filter((e) => e.id !== id);
	}, 5000);
};
