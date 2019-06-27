#!/bin/bash
node run.js
cd ..
git add .
git commit -m 'README自动生成'
git push
