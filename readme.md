# BACKEND
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken
npm install -D nodemon    

## run server MongoDB
&"C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath="c:\data\db"

## run seed
node seed.js  

## run backend
npx nodemon bin/www

## ckeck if there is already a process mongod.exe
tasklist | findstr mongod

## finnish the process
taskkill /F /PID 8860

## start mongo
& "C:\Program Files\MongoDB\Server\8.2\bin\mongosh.exe"