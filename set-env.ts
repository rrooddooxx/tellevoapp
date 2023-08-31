const { writeFile } = require('fs');
const { argv } = require('yargs');
require('dotenv').config();

const environment = argv.env;
const isProduction = environment === 'prod';
const isClear = environment === 'clear';

const targetPath = isProduction
  ? './src/environments/environment.prod.ts'
  : './src/environments/environment.ts';

const supabaseJwt = process.env['SUPABASE_API_JWT'];

let environmentFileContent;

if (isClear) {
  environmentFileContent = `
export const environment = {
   ENV: ''
};`;
} else {
  environmentFileContent = `
export const environment = {
   production: ${isProduction},
   SUPABASE_API_JWT: ${supabaseJwt},
};`;
}

writeFile(targetPath, environmentFileContent, function (err: any) {
  if (err) {
    console.log(err);
  }

  console.log(
    `VARIABLES ACTUALIZADAS -> ${targetPath} | AMBIENTE: ${
      isProduction ? 'prod' : isClear ? 'clear' : 'dev'
    }`
  );
});
