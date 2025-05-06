import sha256 from "crypto-js/sha256";

const getAvatar = (email) => {
  return `https://www.gravatar.com/avatar/${sha256(email)}?s=2000`;
};

module.exports = { getAvatar };