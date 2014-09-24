/**
 * Hype Commerce
 *
 * @package    Hype
 * @version    0.0.1
 * @author     Hype Commerce Team <team@hypejs.com>
 * @copyright  Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license    http://www.hypejs.com/license
 */

module.exports={  
   "version":"0.0.1",
   "install":"2014-08-13T00:55:16.720Z",
   "secret":"eb1b58cc4d60e8c37f94bda1e438d780",
   "environment":"hype",
   "debug":true,
   "log":true,
   "hype":{  
      "db":{
         /* Need a running mongo instance */
         "type":"mongo",
         "mongo":{  
            "host":"127.0.0.1",
            "port":27017,
            "username":"",
            "password":"",
            "dbname":"hype_development"
         },
         /* In development */
         "mysql": {
            "host": "localhost",
            "port": "3306",
            "username": "root",
            "password": "root",
            "dbname": "hype_development"
         }
      },
      /* Server will be initiated on boot */
      "server":{  
         "type":"express",
         "admin":"/admin",
         "api": "/api",
         "express":{  
            "url":"http://localhost",
            "port":4973,
            "nodes":2,
            "theme":"homepage"
         },
         "https":{  
            "admin":"admin.{url}",
            "port":4443
         },
         /* Need a running redis instance */
         "session":{  
            "storage":"redis",
            "redis":{  
               "host":"localhost",
               "port":6379,
               "db":"hype_development",
               "pass":"",
               "secret":"",
               "cookie":{  
                  "path":"/",
                  "maxAge":3600000
               }
            }
         }
      }
   }
}