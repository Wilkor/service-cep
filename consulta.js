var request = require('request');
var http = require('http');
module.exports = function (callback,cep) {

  let p = new Promise((resolve, reject) => {

    const config = {
      url: `https://viacep.com.br/ws/${removeCaracteresEspeciaisDoCep(cep)}/json`,
      //'https://santander.custhelp.com/cc/MontaView/searchTalk?id=6527964&key=Y2hhdHNhcmFzYW50YW5kZXI=',
      method: 'GET'
  };
    request(config,(error, response, body) => {

      if (!error && response.statusCode == 200) {

        resolve(JSON.parse(response.body))

        p.then((resultado) => {

          callback(resultado);

        }).catch((erro) => {

          reject({ status: '500', message: 'Erro no request API', err: body.error })
          console.log(erro)
        })
      }

    })
    
  })

  function removeCaracteresEspeciaisDoCep(cep) {

     console.log(cep)
     console.log(cep.replace(/-|_/gi, ''))
    return cep.replace(/-|_/gi, '')
}

}