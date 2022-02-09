FROM registry.seduc.ce.gov.br/dockerhub/library/node:alpine
#Setando LOGLEVEL=INFO-WARN
ENV NPM_CONFIG_LOGLEVEL warn
#Cria o diretorio da aplicação
WORKDIR /usr/src/app
##Instalacao e Dependencias
#Copia package* para o workdir
COPY package*.json ./
RUN npm install
COPY . .
# replace this with your application's default port
EXPOSE 80
CMD [ "node", "server.js" ]