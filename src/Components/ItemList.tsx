import React from 'react';
import WalletActions from '../Actions/WalletActions';
import WalletStore from '../Store/WalletStore';

/**
 * Component for ItemsList
 */
class ItemsList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            items: WalletStore.getAllItems(),
        };
        this._onChange = this._onChange.bind(this);
        this._onDelete = this._onDelete.bind(this);
    }
    /**
     * _onChange
     */
    public _onChange() {
        this.setState({ items: WalletStore.getAllItems() });
    }
    /**
     * componentWillMount
     */
    public componentWillMount() {
        WalletStore.addChangeListener(this._onChange);
    }
    /**
     * componentWillUnmount
     */
    public componentWillUnmount() {
        WalletStore.removeChangeListener(this._onChange);
    }
    /**
     * Delete item function
     */
    public _onDelete(e: any, rowId: number){
        e.preventDefault();
        WalletActions.deleteNewItem(rowId);
    }
    /**
     * Render method
     */
    public render() {
        let noItemsMessage;
         // Show a friendly message instead if there are no items.
        if (!this.state.items.length) {
            noItemsMessage = (<li className='no-items'>Your wallet is new!</li>);
        }
        return (
            <React.Fragment>
                <ul className='items-list'>
                    {noItemsMessage}
                    {this.state.items.map((itemDetails: any) => {
                        const amountType = parseFloat(itemDetails.amount) > 0 ? 'positive' : 'negative';
                        return (<li key={itemDetails.id}>{itemDetails.description}
                        <span onClick={(e) => this._onDelete(e, itemDetails.id)} className={amountType}>{itemDetails.amount}</span></li>);
                    })}
                </ul>
            </React.Fragment>
        );
    }
}

export default ItemsList;