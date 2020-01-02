import axios from 'axios';

// options may be a string(the url for get request) or an object(for post and other requests)
function fetchData(options) {
  return axios(options);
}

export default fetchData;
