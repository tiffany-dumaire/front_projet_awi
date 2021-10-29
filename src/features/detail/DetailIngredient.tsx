//import { PDFDownloadLink } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Loading } from '../../components/loading/Loading';
//import { IngredientDocument } from '../../components/pdf/ingredient/IngredientDocument';
//import { RecapitulatifIngredient } from '../../components/pdf/ingredient/RecapitulatifIngredient';
import { generateDate } from '../../utils/date.util';
//import styles from './DetailIngredient.module.css';

export function DetailIngredient(): JSX.Element {
    const [date, setDate] = useState<string>('');
    const [loader, setLoader] = useState<boolean>(false);

    useEffect(() => {
        setDate(generateDate());
        setLoader(true);
    },[]);
    
    return (
        <>
            <Helmet>
                <title>{'Détails Ingrédient | '}</title>
            </Helmet>
            {
                loader ? (
                    null
                   /* <PDFDownloadLink document={<IngredientDocument date={date} />} fileName="somename.pdf">
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download now!'
                        }
                    </PDFDownloadLink> */
                ) : (
                    <Loading />
                )
            }
                     
        </>
    );
}