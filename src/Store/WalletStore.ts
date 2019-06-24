import { EventEmitter } from 'events';
import ActionTypes from '../constants/Constants';
import Dispatcher from '../Dispatcher/Index';

const CHANGE = 'CHANGE';
const _walletState: any = [];

/**
 * WalletStore
 */
class WalletStore extends EventEmitter {

	constructor() {
		super();

		// Registers action handler with the Dispatcher.
		Dispatcher.register(this._registerToActions.bind(this));
	}
	/**
	 * Switches over the action's type when an action is dispatched.
	 * @param action 
	 */
	// 
	public _registerToActions(action: any) {
		switch (action.actionType) {
			case ActionTypes.ADD_NEW_ITEM:
				this._addNewItem(action.payload);
			 break;
		}
	}
	/**
	 * Adds a new item to the list and emits a CHANGED event. 
	 * @param item 
	 */
	public _addNewItem(item: any) {
		item.id = _walletState.length;
		_walletState.push(item);
		this.emit(CHANGE);
	}
	/**
	 * Returns the current store's state.
	 */
	public getAllItems() {
		return _walletState;
	}
	/**
	 * Calculate the total budget.
	 */
	public getTotalBudget() {
		let totalBudget = 0;

		_walletState.forEach((item: any) => {
			totalBudget += parseFloat(item.amount);
		});

		return totalBudget;
	}
	/**
	 *  Hooks a React component's callback to the CHANGE event.
	 * @param callback 
	 */
	public addChangeListener(callback: any) {
		this.on(CHANGE, callback);
	}
	/**
	 * Removes the listener from the CHANGED event.
	 * @param callback 
	 */
	public removeChangeListener(callback: any) {
		this.removeListener(CHANGE, callback);
	}
}

export default new WalletStore();