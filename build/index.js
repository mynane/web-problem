const schedule = require('node-schedule');
const process = require('child_process');
const path = require('path');
const { fileDisplay } = require('./run');

const filePath = path.resolve('../docs/');

function run() {
  const date = new Date();
  process.exec(`cd .. && git add . && git commit -m  'README自动生成:${date}' && git pull`, function (error, stdout, stderr) {
    if (error != null) {
      // fileDisplay(filePath);
      process.exec(`cd .. && git add . && git commit --amend && git push`, function (error, stdout, stderr) {
        console.log(stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
    }
  })
}

const  scheduleCronstyle = ()=>{
  // 每天凌晨执行
  schedule.scheduleJob('0 0 * * * *',()=>{
    run();
  });
}

// scheduleCronstyle();
run();