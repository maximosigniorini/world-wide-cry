// module.exports = {
//   consumer_key:         process.env.key,
//   consumer_secret:      process.env.secret,
//   access_token:         process.env.token,
//   access_token_secret:  process.env.token_secret,
//   timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
//   strictSSL:            true,     // optional - requires SSL certificates to be valid.
// }

module.exports = {
  API_KEY:         process.env.key,
  API_SECRET_KEY:      process.env.secret,
  ACCESS_TOKEN:         process.env.token,
  ACCESS_TOKEN_SECRET:  process.env.token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
}
