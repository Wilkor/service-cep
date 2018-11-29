var request = require('request');
var http = require('http');
module.exports = function (callback, cep) {

  let p = new Promise((resolve, reject) => {
    
    const config = {
      url: `https://viacep.com.br/ws/${removeCaracteresEspeciaisDoCep(cep)}/json`,
      //'https://santander.custhelp.com/cc/MontaView/searchTalk?id=6527964&key=Y2hhdHNhcmFzYW50YW5kZXI=',
      method: 'GET'
    };
    request(config, (error, response, body) => {

      if (error === null && response.statusCode === 400) {

        callback({ status: '400', message: 'Bad request', err: body.error });

      }

      if (!error && response.statusCode == 200) {

        resolve(JSON.parse(response.body))

        p.then((resultado) => {

          callback(resultado);

        }).catch((error) => {
          reject({ status: '500', message: 'Error no request AP', err: body.error })
          callback({ status: '400', message: 'Error no request AP', err: body.error });
        })

      }


    })

  })


  function removeCaracteresEspeciaisDoCep(cep) {

    return cep.replace(/-|_/gi, '')
  }

}