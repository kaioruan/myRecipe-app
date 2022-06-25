import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NationalitiesDropDown from '../components/NationalitiesDropDown';
import { fetchAllNationalities } from '../services/MealsAPI';

function ExploreNationalities() {
  const [selectedNationality, setSelectedNationality] = useState('American');
  const [nationalities, setNationalities] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetchAllNationalities();

      console.log(data);
      setNationalities(data.meals.map((area) => area.strArea));
    };

    fetchAPI();
  }, []);

  const onOptionChanged = ({ target }) => {
    setSelectedNationality(target.name);
  };

  console.log(selectedNationality);

  return (
    <div>
      <Header />
      <main>Recipes by country</main>
      <NationalitiesDropDown
        nationalities={ nationalities }
        onOptionChanged={ onOptionChanged }
      />
      <Footer />
    </div>
  );
}

export default ExploreNationalities;
