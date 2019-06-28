const schedule = require('node-schedule');
const process = require('child_process');
const path = require('path');
// const { fileDisplay } = require('./run');

const filePath = path.resolve('../docs/');

function run() {
  // fileDisplay(filePath);
  const date = new Date();

  process.exec(`git pull && node ./run.js && cd .. && git add . && git commit -m  'README自动生成:${date}'`, function (error, stdout, stderr) {
    console.log(stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}

const  scheduleCronstyle = ()=>{
  // 每天凌晨执行
  schedule.scheduleJob('0 0 * * * *',()=>{
    run();
  });
}

// scheduleCronstyle();
run();