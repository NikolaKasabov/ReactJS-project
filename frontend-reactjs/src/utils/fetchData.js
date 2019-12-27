import axios from 'axios';

// options may be a string(the url for get request) or an object(for post and other requests)
async function fetchData(options) {
  let result;

  // try {
    result =  axios(options)
  // }
  // catch (err) {
  //   console.log(err);
  // }
  
  
  return result;
}

export default fetchData;
