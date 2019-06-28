const schedule = require('node-schedule');
const process = require('child_process');
const path = require('path');
const { fileDisplay } = require('./run');

const filePath = path.resolve('../docs/');

function run() {
  process.exec(`cd .. && git pull && git add .`, function (error, stdout, stderr) {
    console.log(error);
    if (error === null) {
      fileDisplay(filePath);
      const date = new Date();

      process.exec(`cd .. && git add . && git commit -m  'README自动生成:${date}' && git push`, function (error, stdout, stderr) {
        console.log(stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
    }
  })

  // fileDisplay(filePath);
  // const date = new Date();

  // process.exec(`cd .. && git add . && git commit -m  'README自动生成:${date}' && git push`, function (error, stdout, stderr) {
  //   console.log(stderr);
  //   if (error !== null) {
  //     console.log('exec error: ' + error);
  //   }
  // });
}

const  scheduleCronstyle = ()=>{
  // 每天凌晨执行
  schedule.scheduleJob('0 0 * * * *',()=>{
    run();
  });
}

// scheduleCronstyle();
run();