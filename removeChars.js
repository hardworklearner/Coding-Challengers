const https = require('https');
const TOKEN = "kpzgli4108".split('');

function removeChars(str) {
  let ret = "";
  for (let i = 0; i < str.length; i ++) {
    if (!TOKEN.includes(str[i])) {
      ret += str[i];
    }
  }

  return ret;
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
      if (parsedData['hobbies'] != undefined) {
        for(let i = 0; i < parsedData['hobbies'].length; i ++) {       
          data = removeChars(parsedData['hobbies'][i]);
          if (data) {
            ret.push(data);
          }
        }
      }

      if (ret.length > 0) {
        console.log(ret.join(', ').trim());
      } else {
        console.log("EMPTY");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });
}).on('error', (err) => {
  console.error("Error fetching data:", err.message);
});
