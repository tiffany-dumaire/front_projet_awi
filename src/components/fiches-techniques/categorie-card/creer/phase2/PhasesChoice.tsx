import React from 'react';
import { Phase_Simple_Interface } from '../../../../../interfaces/Phase.interface';
//import styles from './PhasesChoice.module.css';

export type PhasesChoiceProps = {
    idFT: number;
    phases: Phase_Simple_Interface[];
    addPhase: (phase: Phase_Simple_Interface) => void;
    removePhase: (id_phase: number) => void;
};

export const PhasesChoice: React.FunctionComponent<PhasesChoiceProps> = (props: PhasesChoiceProps) => {

    return (<></>);
}