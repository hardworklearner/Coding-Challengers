const https = require('https');
const TOKEN = "kpzgli4108".split('');

function intersperseArrays(arr1, arr2) {
  let result = [];
  let maxLength = Math.max(arr1.length, arr2.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < arr1.length) result.push(arr1[i]);
    if (i < arr2.length) result.push(arr2[i]);
  }

  return result;
}
https.get('https://coderbyte.com/api/challenges/json/rest-get-simple', (resp) => {
  
  let data = '';
  let ret = [];
  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    try {
      const parsedData = JSON.parse(data);
      data = parsedData['hobbies'].join(', ').trim();
      ret = intersperseArrays(data.split(''), TOKEN);
      console.log(ret.join(''));
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });
}).on('error', (err) => {
  console.error("Error fetching data:", err.message);
});
