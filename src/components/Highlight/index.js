import React from 'react';
import HighlightCard from './HighlightCard';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

const Highlight = ({report}) => {
    const data = report[report.length - 1];
    console.log('data highlight', data);
    const summary = [
        {
            title: 'So ca nhiem',
            count: data?.Confirmed,
            type: 'confirmed',
        },
        {
            title: 'Khoi',
            count: data?.Recovered,
            type: 'recovered',
        },
        {
            title: 'Tu vong',
            count: data?.Deaths,
            type: 'deaths',
        },
    ]
    return (
        <Grid container spacing={3}>
            {summary.map((s, i)=>{
                return (
                <Grid key={i} item sm={4} xs={12}>
                    <HighlightCard title={s.title} count={s.count} type={s.type}/>
                </Grid>
                );
            })}
            
        </Grid>
    )
}

export default Highlight
