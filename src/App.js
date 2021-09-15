import React, { useEffect, useState } from 'react';
import { getCountries, getReportByCountry } from './apis';
import { Container, Typography } from '@material-ui/core';
import { sortBy } from 'lodash';

import CountrySelector from './components/CountrySelector';
import Highlight from './components/Highlight';
import Summary from './components/Summary';
import moment from 'moment';
import 'moment/locale/vi';
import '@fontsource/roboto';

moment.locale('vi');
function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');  
  const [report, setReport] = useState([]);

  const handleOnChange = (e)=>{
    setSelectedCountryId(e.target.value); // Save selected country client change    
  }
  useEffect(()=>{
    getCountries().then(res=>{
                const countries = sortBy(res.data, 'Country');
                setCountries(countries);
                setSelectedCountryId('vn');
              }).catch();    
  },[]);

  useEffect(()=>{  
    if(selectedCountryId){    
      const {Slug} = countries.find((country) => country.ISO2.toLowerCase() === selectedCountryId);    // object detructering
      getReportByCountry(Slug).then(res=>{
                                res.data.pop();                                       
                                setReport(res.data);
                              })
                              .catch();
    }
  }, [countries, selectedCountryId]);


  return (
    <Container style={{marginTop: 20}}>
      <Typography variant="h2" component="h2">
          So Lieu COVID-19
      </Typography>
      
      <Typography>{moment().format('LLL')}</Typography>
      <CountrySelector value={selectedCountryId} countries={countries} handleOnChange={handleOnChange} />
      <Highlight report={report} />
      <Summary selectedCountryId={selectedCountryId} report={report} />
    </Container>
  );
}

export default App;
