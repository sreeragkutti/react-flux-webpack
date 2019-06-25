import * as React from 'react';
import AddNewItem from './Components/AddNewItem';
import ItemsList from './Components/ItemList';
require('es6-promise').polyfill();

const app = () => {
    return(
        <div className='container'>
                <h1 className='app-title'>Flux Wallet</h1>
                <AddNewItem />
                <ItemsList />
        </div>
        );
};

export default app;