import { get, set } from 'idb-keyval';

import defaultSettings from './defaultSettings.json';

export type SettingsState_t = {
	compactView: boolean;
};

export const settingsState = $state({} as SettingsState_t);

export const loadSettingsState = async () => {
	const loadedSettingsState = JSON.parse(
		(await get('settings')) || JSON.stringify(defaultSettings)
	) as SettingsState_t;

	for (const key of Object.keys(loadedSettingsState)) {
		// @ts-expect-error I promise this is type-safe
		settingsState[key] = loadedSettingsState[key];
	}
};

export const save = async () => {
	await set('settings', JSON.stringify(settingsState));
};

export const migrateSettingsState = () => {
	if (
		JSON.stringify(Object.keys(settingsState).sort()) !==
		JSON.stringify(Object.keys(defaultSettings).sort())
	) {
		for (const existingKey of Object.keys(settingsState)) {
			if (!(existingKey in defaultSettings)) {
				// @ts-expect-error I promise this is type-safe
				delete settingsState[existingKey];
			}
		}

		for (const defaultKey of Object.keys(defaultSettings)) {
			if (!(defaultKey in settingsState)) {
				// @ts-expect-error I promise this is type-safe
				settingsState[defaultKey] = defaultSettings[defaultKey];
			}
		}
	}

	save();
};
