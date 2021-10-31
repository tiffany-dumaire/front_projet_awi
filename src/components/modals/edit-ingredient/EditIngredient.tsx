import React, { useState } from 'react';
import styles from './MediaStep.module.css';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Ingredient_Interface } from '../../../interfaces/Ingredient.interface';

export type EditIngredientProps = {
    ingredient: Ingredient_Interface;
};

export const EditIngredient: React.FunctionComponent<EditIngredientProps> = function (props: EditIngredientProps) {
    return (<></>);
};
