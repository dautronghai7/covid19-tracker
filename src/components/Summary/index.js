import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import LineChart from '../Charts/LineChart';
import HighMaps from '../Charts/HighMaps';

const Summary = ({report, selectedCountryId}) => {
    const [mapData, setMapData] = useState({});
    useEffect(()=>{
        if(selectedCountryId){
            const mapData = import(`@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`);
            mapData.then(res=>setMapData(res)).catch();
        }
    }, [selectedCountryId]);
    return (
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                <LineChart data={report} />
            </Grid>
            <Grid item sm={4} xs={12}>
                <HighMaps mapData={mapData} />
            </Grid>
        </Grid>
    )
}

export default Summary
