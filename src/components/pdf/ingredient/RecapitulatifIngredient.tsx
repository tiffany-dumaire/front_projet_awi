import React, { useEffect, useState } from "react";
import { PDFViewer } from '@react-pdf/renderer';
import { IngredientDocument } from "./IngredientDocument";
import { generateDate } from "../../../utils/date.util";
import { Ingredient_Interface } from "../../../interfaces/Ingredient.interface";

export type RecapitulatifIngredientProps = {
    ingredient: Ingredient_Interface;
};

export const RecapitulatifIngredient: React.FunctionComponent<RecapitulatifIngredientProps> = (props: RecapitulatifIngredientProps) => {

    const [date, setDate] = useState<string>('');

    useEffect(() => {
        setDate(generateDate());
    },[]);

    return (
        //null
        <PDFViewer>
            <IngredientDocument date={date} ingredient={props.ingredient}/>
        </PDFViewer> 
    );
};