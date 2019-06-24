import ActionTypes from '../Constants/Constants';
import Dispatcher from '../Dispatcher/Index';

/**
 * Wallet Actions
 */
class WalletActions {
    /**
     * addNewItem
     * @param item 
     */
    public addNewItem(item: any){
        // Note: This is usually a good place to do API calls.
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_NEW_ITEM,
            payload: item,
        });
    }
}
export default new WalletActions();