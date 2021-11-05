import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Loading } from '../../../components/loading/Loading';
import { InitNewIngredient } from '../../../components/mercurial/ingredient/create/InitNewIngredient';
import styles from './CreateIngredient.module.css';

export function CreateIngredient(): JSX.Element {
    //const [date, setDate] = useState<string>('');
    const [loader, setLoader] = useState<boolean>(false);


    useEffect(() => {
        setLoader(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return (
        <>
            <Helmet>
                <title>{'Ajouter un ingrédient au mercurial'}</title>
            </Helmet>
            {
                loader ? (
                    <div className={styles.container}>
                        <Link className={styles.link} to={`/mercurial`}>
                            <IoIosArrowBack /> Retour au mercurial
                        </Link>
                        <div className={styles.container2}>
                            <InitNewIngredient />
                        </div>  
                    </div>
                ) : (
                    <div className={styles.container}>
                        <Loading />
                    </div>
                )
            }
                     
        </>
    );
}