#!/bin/bash
node index.js
cd ..
git add .
git commit -m 'README自动生成'
git push
