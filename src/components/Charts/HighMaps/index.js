import React, { useEffect, useRef, useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import cloneDeep from 'lodash/cloneDeep';
highchartsMap(Highcharts);

const initOptions = {
    chart: {
        height: '500',
    },
    title: {
        text: null
    },
    mapNavigation: {
        enabled: true, // 
    },
    colorAxis: {
        min: 0,
        stops:[
            [0.2, '#FFC4AA'],
            [0.4, '#FF8A66'],
            [0.6, '#FF392B'],
            [0.8, '#B71525'],
            [1, '#7A0826'],
        ]
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'bottom'
    },
    series: [
        {
            mapData: {},
            name: 'Dan So',
            joinBy: ['hc-key', 'key']
        }
    ]

}

const HighMaps = ({mapData}) => {
    const [options, setOptions] = useState({});
    const [configLoaded, setConfigLoaded] = useState(false);
    const chartRef = useRef(null);
    useEffect(()=>{
        if(chartRef && chartRef.current){
            chartRef.current.chart.series[0].update({
                mapData: mapData
            });
        }
    });

    useEffect(()=>{
        if(mapData && Object.keys(mapData).length){
            const fakeData = mapData.features.map((f, i)=>({
                key: f.properties['hc-key'],
                value: i
            }));
            setOptions({
                ...initOptions,
                series:[
                    {
                        ...initOptions.series[0],
                        mapData: mapData,
                        data: fakeData,
                    }
                ]
            });
            if(!configLoaded) setConfigLoaded(true);
        }
    },[mapData, configLoaded]);

    if(!configLoaded) return null;

    return (
        <HighchartsReact
            highcharts = {Highcharts}
            options ={cloneDeep(options)}
            constructorType='mapChart'
            ref={chartRef}
        />
    )
}

export default React.memo(HighMaps)
