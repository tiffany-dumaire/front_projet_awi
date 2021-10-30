import React, { useEffect, useState } from "react";
import { PDFViewer } from '@react-pdf/renderer';
import { IngredientDocument } from "./IngredientDocument";
import { generateDate } from "../../../utils/date.util";

export const RecapitulatifIngredient: React.FunctionComponent = () => {

    const [date, setDate] = useState<string>('');

    useEffect(() => {
        setDate(generateDate());
    },[]);

    return (
        //null
        <PDFViewer>
            <IngredientDocument date={date} />
        </PDFViewer>   
    );
};