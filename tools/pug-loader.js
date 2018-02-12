'use strict';

(async () => {

  const fs = require('fs');
  const findNodeModules = require('find-node-modules');
  const commonCliConfig = `${await findNodeModules()}/@angular/cli/models/webpack-configs/common.js`;
  const pug_rule = `\n{ test: /.(pug|jade)$/, loader: "apply-loader!pug-loader?self" },`;

  fs.readFile(commonCliConfig, (err, data) => {

    if (err) {

      throw err;

    }

    const configText = data.toString();

    if (configText.indexOf(pug_rule) > -1) {

      return;

    }

    const position = configText.indexOf('rules: [') + 8;
    const output = [configText.slice(0, position), pug_rule, configText.slice(position)].join('');
    const file = fs.openSync(commonCliConfig, 'r+');

    fs.writeFile(file, output);
    fs.close(file);

    console.log('Angular - Enabled Pug Compilation');

  });

})();