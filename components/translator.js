const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  translate(language, text) {
    let lower = text.toLowerCase()
    let sol = text
    let index
    let length
    let regex
    let translated = false
    if(language == 'american-to-british') {
      for(let prop in americanOnly) {
        let check = new RegExp(prop + '[^a-zA-Z]')
        if(check.test(lower)) {
          index = lower.indexOf(prop)
          length = prop.length
          translated = true;
          regex = new RegExp(text.substring(index, index+length), 'g')
          sol = sol.replace(regex, '<span class="highlight">'+ americanOnly[prop]+'</span>')
        }
      }
      for(let prop in americanToBritishSpelling) {
        let check = new RegExp(prop + '[^a-zA-Z]')
        if(check.test(lower)) {
          index = lower.indexOf(prop)
          length = prop.length
          translated = true;
          regex = new RegExp(text.substring(index, index +length), 'g')
          sol = sol.replace(regex, '<span class="highlight">'+ americanToBritishSpelling[prop]+'</span>')
        }
      }
      for(let prop in americanToBritishTitles) {
        let check = new RegExp(prop + '[^a-zA-Z]')
        if(check.test(lower)) {
          index = lower.indexOf(prop)
          length = prop.length
          translated = true;
          regex = new RegExp(text.substring(index, index + length), 'g')
          let tr = americanToBritishTitles[prop].charAt(0).toUpperCase() + americanToBritishTitles[prop].slice(1);
          sol = sol.replace(regex, '<span class="highlight">'+tr+'</span>')
        }
      }

      let timeRegex = /\d{0,1}\d:\d\d/g
      
      if(timeRegex.test(text)) {
        translated = true
        let matches = text.match(timeRegex)
        let updated = []
        for(let i = 0; i < matches.length; i++) {
          updated[i] = matches[i].replace(':', '.')
          sol = sol.replace(matches[i], '<span class="highlight">'+updated[i]+'</span>')
        }
      }

      if(!translated) {
        sol = "Everything looks good to me!"
      }
      let responseObject = {'text': text, 'translation': sol}
      return responseObject   

    } else {
      for(let prop in britishOnly) {
        let check = new RegExp(prop + '[^a-zA-Z]')
        if(check.test(lower)) {
          index = lower.indexOf(prop)
          length = prop.length
          translated = true;
          regex = new RegExp(text.substring(index, index +length), 'g')
          sol = sol.replace(regex, '<span class="highlight">'+britishOnly[prop]+'</span>')
        }
      }
      for(let prop in americanToBritishSpelling) {
        let check = new RegExp(americanToBritishSpelling[prop] + '[^a-zA-Z]')
        if(check.test(lower)) {
          index = lower.indexOf(americanToBritishSpelling[prop])
          length = americanToBritishSpelling[prop].length
          translated = true;
          regex = new RegExp(text.substring(index, index +length), 'g')
          sol = sol.replace(regex, '<span class="highlight">'+prop+'</span>')
        }
      }
      for(let prop in americanToBritishTitles) {
        let check = new RegExp(americanToBritishTitles[prop] + '[^a-zA-Z]')
        if(check.test(lower)) {
          index = lower.indexOf(americanToBritishTitles[prop])
          length = americanToBritishTitles[prop].length
          translated = true;
          regex = new RegExp(text.substring(index, index + length), 'g')
          sol = sol.replace(regex, '<span class="highlight">'+prop.charAt(0).toUpperCase()+prop.slice(1)+'</span>')
        }
      }

      let timeRegex = /\d{0,1}\d\.\d\d/g
      
      if(timeRegex.test(text)) {
        translated = true
        let matches = text.match(timeRegex)
        let updated = []
        for(let i = 0; i < matches.length; i++) {
          updated[i] = matches[i].replace('.', ':')
          sol = sol.replace(matches[i], '<span class="highlight">'+updated[i]+'</span>')
        }
      }

      if(!translated) {
        sol = "Everything looks good to me!"
      }
      let responseObject = {'text': text, 'translation': sol}
      return responseObject 
    }
  }
}

module.exports = Translator;