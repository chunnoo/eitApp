import config from "./config";

console.log(config);

const PostRequest = (url, requestBody = {}) => fetch(
  "http://" + config.address + "/" + url,
  {
    method: 'POST',
    mode: 'same-origin',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  }
);

export default PostRequest;
