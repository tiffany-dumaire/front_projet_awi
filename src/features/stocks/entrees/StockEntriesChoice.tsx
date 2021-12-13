import React from 'react';
//import styles from './StockMenu.module.css';
import { Helmet } from 'react-helmet';
import { StockEntriesDashboard } from '../../../components/stocks/dashboard/StockEntriesDashboard';

export function StockEntriesChoice(): JSX.Element {

    return(
        <>
            <Helmet>
                <title>{'Gestion des entrées de stocks'}</title>
            </Helmet>
            <StockEntriesDashboard />
        </>
    );
}