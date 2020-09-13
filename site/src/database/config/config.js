module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "workplace_station",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define" : {
        "underscored" : true,
        "timestamps" : false
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
