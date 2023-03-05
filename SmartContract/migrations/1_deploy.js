
const Lottery = artifacts.require('Lottery'); 

module.exports = function (deploy) {
  deploy.deploy(Lottery)
}