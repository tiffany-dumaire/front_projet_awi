import React from 'react';
//import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
//import { Ingredient_Interface } from '../../../interfaces/Ingredient.interface';

export type IngredientDocumentProps = {
    date: string;
    //ingredient: Ingredient_Interface;
}

export const IngredientDocument: React.FunctionComponent<IngredientDocumentProps> = (props: IngredientDocumentProps) => {  
    return ( <> </>);
    /* const styles = StyleSheet.create({
        date: {
            fontSize: '10px',
            fontWeight: 'light',
            marginBottom: '10px'
        },
        title: {
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '10px'
        },
        values: {
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '10px'
        },
        page: {
            flexDirection: 'row',
            backgroundColor: 'aliceblue',
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });
    
    return (
        <Document>
            <Page orientation='landscape' size="A7" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.date}>Date : {props.date}</Text>
                    <Text style={styles.title}>Code : <Text style={styles.values}></Text></Text>
                    <Text style={styles.title}>Libellé : <Text style={styles.values}></Text></Text>
                    <Text style={styles.title}>Unité : <Text style={styles.values}></Text></Text>
                    <Text style={styles.title}>Prix unitaire : <Text style={styles.values}></Text></Text>
                    <Text style={styles.title}>Stock : <Text style={styles.values}></Text></Text>
                </View>
            </Page>
        </Document>
    ); */
};