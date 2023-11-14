const {dialog} = require('electron');
const fs = require('fs');

const ObsModule = (function() {

  const save = function(filename, data) {
    let result = null;
    try {
      const { id, name } = data;
      const str = JSON.stringify(data);
      fs.writeFileSync(filename, str);
      result = { id, name };
    } catch (e) {
      console.log(e);
    } 
    return result;
  };

  return {
    save
  };
})();

module.exports = ObsModule;