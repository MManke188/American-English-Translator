const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  // #1
  test("Translation with text and locale fields" ,  (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({text: 'Translate this text for me bloke!', locale: 'british-to-american'})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.translation, "Translate this text for me <span class=\"highlight\">guy</span>!")
        done();
      })
  });
  // #2
  test("Translation with text and invalid locale field" ,  (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({text: 'Translate this text for me bloke!', locale: 'english-to-german'})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.deepEqual(res.body, { error: 'Invalid value for locale field' })
        done();
      })
  });
  // #3
  test("Translation with missing text field" ,  (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({locale: 'american-to-british'})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.deepEqual(res.body, { error: 'Required field(s) missing' })
        done();
      })
  });
  // #4
  test("Translation with missing locale field" ,  (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({text: 'Translate this for me bloke!'})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.deepEqual(res.body, { error: 'Required field(s) missing' })
        done();
      })
  });
  // #5
  test("Translation with empty text" ,  (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({text: '', locale: 'american-to-british'})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.deepEqual(res.body, { error: 'No text to translate' })
        done();
      })
  });
  // #6
  test("Translation with text that needs no translation" ,  (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({text: 'This needs no translation.', locale: 'american-to-british'})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.translation, "Everything looks good to me!" )
        done();
      })
  });
  
});