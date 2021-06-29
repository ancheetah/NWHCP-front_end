import React from 'react';
import ResultCard from './ResultCard';

// component that contains all results from search
// takes in a programs prop (array of health career pathway programs represented as JSONs)
export default function ResultGroup(props) {
    let r = [];
    for (let i = 0; i < props.programs.length; i++) {
        r.push(<ResultCard program={props.programs[i]}/>);
    }
    return (
        <div>
            {r}
        </div>
    )
}