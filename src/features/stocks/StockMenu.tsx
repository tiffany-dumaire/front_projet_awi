import React from 'react';
//import styles from './StockMenu.module.css';
import { Helmet } from 'react-helmet';
import { StocksDashboard } from '../../components/stocks/dashboard/StockDashboard';

export function StockMenu(): JSX.Element {

    return(
        <>
            <Helmet>
                <title>{'Gestion des stocks'}</title>
            </Helmet>
            <StocksDashboard />
        </>
    );
}