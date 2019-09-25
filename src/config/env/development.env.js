/* eslint-disable camelcase */
module.exports = {

    app: {
        name           : 'MICROSERVICE NAME - PROD MODE',
        version        : '1.0.0',
        locale         : 'pt_BR',
        timezone       : 'America/Sao_Paulo',
        adminEmail     : 'desenvolvimento@ucamprominas.com.br',
        sendEmailErrors: true
    },

    mail: {
        host  : 'smtplw.com.br',
        port  : 465,
        secure: true,
        auth  : {
            user: 'Prominassigesp',
            pass: 'zJfFMHdg8398'
        },
        sender: 'no-reply@ucamprominas.com.br'
    },

    server: {
        secure: false,
        host  : '0.0.0.0',
        port  : 3087,
        cors  : {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        },
        ssl   : {
            privateKey : '',
            certificate: '',
            hpkpKeys   : []
        }
    },

    databases: {
        mongodb_cloud  : {
            servers       : [
                {
                    host: 'teste-trainees-shard-00-00-tqyug.gcp.mongodb.net',
                    port: 27017
                },
                {
                    host: 'teste-trainees-shard-00-01-tqyug.gcp.mongodb.net',
                    port: 27017
                },
                {
                    host: 'teste-trainees-shard-00-02-tqyug.gcp.mongodb.net',
                    port: 27017
                }
            ],
            replicaSet    : 'Teste-Trainees-shard-0',
            authSource    : 'admin',
            auto_reconnect: true,
            ssl           : true,
            user          : 'seu nome',
            pass          : 'seu nome',
            name          : 'seu nome',
            dialect       : 'mongodb',
            charset       : 'utf8',
            logging       : false,
            enabled       : true,
            configWith    : 'mongoose'
        }
    },

    gateway: 'http://api-gateway.institutoprominas.com.br/',

    apis: {
        storage      : {
            mode   : 'direct',
            baseUrl: 'http://10.138.0.3:3011/'
        },
        notifications: {
            mode   : 'direct',
            baseUrl: 'http://10.138.0.8:3010/'
        }
    }
};