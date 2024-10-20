// let url = "https://apis.mapmyindia.com/advancedmaps/v1/{26221312b816b6cb32950306c74a207e}/geocode?address=pune"

// const loc = async()=>{
//      fetch(url)
//      .then(res =>  res.json())
//      .then(data => console.log(data))
//      .catch(error => console.log(error))
// }
// loc(url)

// let loc2 = async ()=>{
//     let res = await fetch(url)
//     let data = await res.json()
//     console.log(data)
// }

// loc2(url)

// const apiKey = '26221312b816b6cb32950306c74a207e';
// const address = 'pune';

// const getGeocodingData = async () => {
//   try {
//     const url = `https://apis.mapmyindia.com/advancedmaps/v1/${apiKey}/geocode?address=${encodeURIComponent(address)}`;
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`HTTP error ${response.status}`);
//     }

//     const data = await response.json();
//     if (data.status === 'success' && data.results.length > 0) {
//       const { lat, lng } = data.results[0].geometry.location;
//       console.log(`Latitude: ${lat}, Longitude: ${lng}`);
//     } else {
//       console.error('No geocoding data found');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// getGeocodingData();

const axios = require('axios');

async function generateAccessToken() {
  let address = "lonavala";
  const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1&addressdetails=0`;

  try {
    const response = await axios.get(url);
    let {lat , lon} = response.data[0];
    console.log(lat, lon)
    console.log(response.data)
  } catch (error) {
    console.error('Error:', );
  }
} 

generateAccessToken();