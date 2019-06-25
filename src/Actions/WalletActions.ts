const axios = require('axios');
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
    /**
     * Delete one row
     * @param rowId 
     */
    public deleteNewItem(rowId: number){
        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_ONE_ROW,
            payload: rowId,
        });
    }
    /**
     * Action for getting data from API
     */
    public getDataFromRestAPI(){
        const url: string = 'http://localhost:3000/posts';
        axios.get(url).then((res: any) => {
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_DATA_FROM_API_CALL,
                payload: res.data,
            });
        });
    }
}
export default new WalletActions();