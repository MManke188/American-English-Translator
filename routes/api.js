'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let text = req.body.text
      let locale = req.body.locale

      if(text === undefined || locale === undefined) {
        res.send({ error: 'Required field(s) missing' })
      } else if(text == ''){
        res.send({ error: 'No text to translate' })
      } else if(locale != 'american-to-british' && locale != 'british-to-american') {
        res.send({ error: 'Invalid value for locale field' })
      } else {
        res.send(translator.translate(locale, text))
      }
    });
};
