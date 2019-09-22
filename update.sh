#!/usr/bin/env bash
set -e
clear

#variaveis
OS=`uname`
project=$PWD
repository="$project/.base"
messages=''

#cores
WAR='\033[1;33m'
DAN='\033[1;31m'
SUC='\033[0;32m'
COD='\033[0;36m'
NC='\033[0m'

#deleta versoes antigas da base se houver
[ ! -d ${repository} ] || rm -rf ${repository}

#clona repositorio base
echo '\nClonando repositório...\n'
git clone https://github.com/institutoprominas/microservices_base_api ${repository} --quiet

#preciso me atualizar primeiro :D
if ! cmp --silent ${repository}/update.sh ${project}/update.sh; then
  cp ${repository}/update.sh ${project}
  sh update.sh
  exit
fi

#copia arquivos do core
echo '\nCopiando arquivos...'

[ -d ${project}/src/routines ] || mkdir ${project}/src/routines

cp -r ${repository}/.gitignore ${project}/.gitignore
cp -r ${repository}/.babelrc ${project}/.babelrc
cp -r ${repository}/.dockerignore ${project}/.dockerignore
cp -r ${repository}/.eslintignore ${project}/.eslintignore
cp -r ${repository}/.eslintrc.js ${project}/.eslintrc.js

rm -rf ${project}/src/core/*
cp -r ${repository}/src/core/* ${project}/src/core

rm ${project}/src/app.js
cp ${repository}/src/app.js ${project}/src/app.js

rm ${project}/src/config/api.conf.js
cp ${repository}/src/config/api.conf.js ${project}/src/config/api.conf.js

[ -d ${project}/src/config/env ] || mkdir ${project}/src/config/env

cp ${repository}/src/config/env/homologation.env.js ${project}/src/config/env/sample-homologation.env.js
cp ${repository}/src/config/env/production.env.js ${project}/src/config/env/sample-production.env.js

[ -d ${project}/logs ] || mkdir ${project}/logs

cp ${repository}/logs/.gitignore ${project}/logs/.gitignore

rm -rf ${project}/logs/.gitignore
cp -r ${repository}/logs/.gitignore ${project}/logs/.gitignore

rm -rf ${project}/src/config/joi/*
cp -r ${repository}/src/config/joi/* ${project}/src/config/joi

rm -rf ${project}/src/config/mongoose/*
cp -r ${repository}/src/config/mongoose/* ${project}/src/config/mongoose

rm -rf ${project}/src/config/sequelize/*
cp -r ${repository}/src/config/sequelize/* ${project}/src/config/sequelize

if [ -f ${project}/src/services/Service.js ]; then
  rm ${project}/src/services/Service.js
fi

if [ -f ${project}/src/services/ACLVerify.service.js ]; then
  rm ${project}/src/services/ACLVerify.service.js
fi

if [ -f ${project}/src/services/Example.service.js ]; then
  rm ${project}/src/services/Example.service.js
fi

cp -r ${repository}/src/services/* ${project}/src/services

rm -rf ${project}/src/storage/locales/*
cp -r ${repository}/src/storage/locales/* ${project}/src/storage/locales

if [ ! -f ${project}/pm2-deploy-homo.yml ]; then
  cp ${repository}/pm2-deploy-homo.yml ${project}/pm2-deploy-homo.yml
fi

#pacotes

if ! grep -q -i 'nodemailer' ${project}/package.json; then
  npm install --save nodemailer
fi

if ! grep -q -i 'node-cron' ${project}/package.json; then
  npm install --save node-cron
fi

#atualizações especiais

if [ ! -f ${project}/src/config/env/production.env.js ]; then
  cp ${repository}/src/config/env/production.env.js ${project}/src/config/env/production.env.js
    messages="${messages}${WAR}"
    messages="${messages}  Seu arquivo environment de produção foi criado, porém precisa ser configurado, por favor confira '/src/config/env/production.env.js':\n"
    messages="${messages}${NC}"
else
  if ! grep -q -i 'sendEmailErrors' ${project}/src/config/env/production.env.js; then #ultima alteracao feita
    messages="${messages}${DAN}"
    messages="${messages}  Seu arquivo environment de produção está desatualizado, confira "/src/config/env/sample-production.env.js":\n"
    messages="${messages}${NC}"
  fi
fi

if [ ! -f ${project}/src/config/env/homologation.env.js ]; then
  cp ${repository}/src/config/env/homologation.env.js ${project}/src/config/env/homologation.env.js
    messages="${messages}${WAR}"
    messages="${messages}  Seu arquivo environment de homologação foi criado, porém precisa ser configurado, por favor confira '/src/config/env/homologation.env.js':\n"
    messages="${messages}${NC}"
else
  if ! grep -q -i 'sendEmailErrors' ${project}/src/config/env/homologation.env.js; then #ultima alteracao feita
    messages="${messages}${DAN}"
    messages="${messages}  Seu arquivo environment de homologação está desatualizado, confira "/src/config/env/sample-homologation.env.js":\n"
    messages="${messages}${NC}"
  fi
fi

if ! grep -q -i '"update"' ${project}/package.json; then
 if [ "$OS" == 'Darwin' ]; then
  sed -i '' 's/"scripts": {/"scripts": {"update": "sh update.sh",/' ${project}/package.json
 else
  sed -i'' -e 's/"scripts": {/"scripts": {"update": "sh update.sh",/' ${project}/package.json
 fi
fi

if ! grep -q -i '"build-homo"' ${project}/package.json; then
 if [ "$OS" == 'Darwin' ]; then
  sed -i '' 's/"scripts": {/"scripts": {"build-homo": "export NODE_ENV=homologation \&\& npm run clean-homo \&\& babel src --ignore test.js --out-dir .\/dist-homo --copy-files",/' ${project}/package.json
 else
  sed -i'' -e 's/"scripts": {/"scripts": {"build-homo": "export NODE_ENV=homologation \&\& npm run clean-homo \&\& babel src --ignore test.js --out-dir .\/dist-homo --copy-files",/' ${project}/package.json
 fi
fi

if ! grep -q -i '"clean-homo"' ${project}/package.json; then
 if [ "$OS" == 'Darwin' ]; then
  sed -i '' 's/"scripts": {/"scripts": {"clean-homo": "rm -rf dist-homo \&\& mkdir dist-homo",/' ${project}/package.json
 else
  sed -i'' -e 's/"scripts": {/"scripts": {"clean-homo": "rm -rf dist-homo \&\& mkdir dist-homo",/' ${project}/package.json
 fi
fi

if ! grep -q -i '"start-homo"' ${project}/package.json; then
 if [ "$OS" == 'Darwin' ]; then
  sed -i '' 's/"scripts": {/"scripts": {"start-homo": "pm2 start pm2-deploy-homo.yml",/' ${project}/package.json
 else
  sed -i'' -e 's/"scripts": {/"scripts": {"start-homo": "pm2 start pm2-deploy-homo.yml",/' ${project}/package.json
 fi
fi

if ! grep -q -i '"stop-homo"' ${project}/package.json; then
 if [ "$OS" == 'Darwin' ]; then
  sed -i '' 's/"scripts": {/"scripts": {"stop-homo": "pm2 stop pm2-deploy-homo.yml",/' ${project}/package.json
 else
  sed -i'' -e 's/"scripts": {/"scripts": {"stop-homo": "pm2 stop pm2-deploy-homo.yml",/' ${project}/package.json
 fi
fi

if ! grep -q -i '"restart-homo"' ${project}/package.json; then
 if [ "$OS" == 'Darwin' ]; then
  sed -i '' 's/"scripts": {/"scripts": {"restart-homo": "pm2 restart pm2-deploy-homo.yml",/' ${project}/package.json
 else
  sed -i'' -e 's/"scripts": {/"scripts": {"restart-homo": "pm2 restart pm2-deploy-homo.yml",/' ${project}/package.json
 fi
fi

if ! grep -q -i '"mongoose": "^5.3.13"' ${project}/package.json; then
  npm remove mongoose && npm install --save mongoose
fi

if [ "$OS" == 'Darwin' ]; then
  sed -i '' 's/"reatrt"/"restart"/g' ${project}/package.json
  sed -i '' 's/"watch       : true"/"watch       : false"/g' ${project}/pm2-deploy.yml
  sed -i '' 's/"watch       : true"/"watch       : false"/g' ${project}/pm2-deploy-homo.yml
 else
  sed -i'' -e 's/"reatrt"/"restart"/g' ${project}/package.json
  sed -i'' -e 's/"watch       : true"/"watch       : false"/g' ${project}/pm2-deploy.yml
  sed -i'' -e 's/"watch       : true"/"watch       : false"/g' ${project}/pm2-deploy-homo.yml
fi

#atualiza pacotes

if [ -f ${project}/package-lock.json ]; then
  rm ${project}/package-lock.json
fi

echo 'Atualizando pacotes...\n'
npm update -s && npm install -s

#deleta a pasta do repositorio
rm -rf ${repository}

#finaliza atualizacao

if [ -z "$messages" ]; then
  echo "\n${SUC}Atualizado com sucesso!${NC}\n"
else
  echo ${messages}
fi
