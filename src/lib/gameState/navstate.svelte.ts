export type NavState_t = {
	modalDialog: HTMLDialogElement | null;
	_modalPage: Readonly<string>;
	modalPage: string;
};

export const navState: NavState_t = $state({
	modalDialog: null,
	_modalPage: '',
	get modalPage() {
		return navState._modalPage;
	},
	set modalPage(val: string) {
		navState._modalPage = val;
		if (val === '') {
			navState.modalDialog?.close();
		} else {
			navState.modalDialog?.showModal();
		}
	}
});
