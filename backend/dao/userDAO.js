var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;
var URL = "mongodb://localhost:27017/";

const DB_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const DB_NAME = "usermngdb";
const TABLE_NAME = "user";

class ContactsDAO {
  async create(dto) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(URL, DB_CONFIG, function (err, db) {
        if (err) {
          reject(err);
        }
        var dbo = db.db(DB_NAME);
        dbo.collection(TABLE_NAME).insertOne(dto, function (err, res) {
          if (err) {
            reject(err);
          }
          db.close();
          resolve();
        });
      });
    });
  }

  async update(id, dto) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(URL, DB_CONFIG, function (err, db) {
        if (err) {
          reject(err);
        }
        var dbo = db.db(DB_NAME);
        var o_id = new mongo.ObjectID(id);
        dbo
          .collection(TABLE_NAME)
          .updateOne(
            { _id: o_id },
            { $set: dto },
            { upsert: true },
            function (err, res) {
              if (err) {
                reject(err);
              }
              db.close();
              resolve();
            }
          );
      });
    });
  }

  async del(id) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(URL, DB_CONFIG, function (err, db) {
        if (err) {
          reject(err);
        }
        var dbo = db.db(DB_NAME);
        var o_id = new mongo.ObjectID(id);
        dbo
          .collection(TABLE_NAME)
          .deleteOne({ _id: o_id }, function (err, res) {
            if (err) {
              reject(err);
            }
            db.close();
            resolve();
          });
      });
    });
  }

  async get(id) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(URL, DB_CONFIG, function (err, db) {
        if (err) {
          reject(err);
        }
        var dbo = db.db(DB_NAME);
        var o_id = new mongo.ObjectID(id);
        dbo
          .collection(TABLE_NAME)
          .find({ _id: o_id })
          .toArray(function (err, result) {
            if (err) {
              reject(err);
            }
            db.close();
            resolve(result);
          });
      });
    });
  }

  async authenticate(dto) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(URL, DB_CONFIG, function (err, db) {
        if (err) {
          reject(err);
        }
        var dbo = db.db(DB_NAME);
        dbo
          .collection(TABLE_NAME)
          .find({ email: dto.email, password: dto.password })
          .toArray(function (err, result) {
            if (err) {
              reject(err);
            }
            db.close();
            resolve(result);
          });
      });
    });
  }

  async list() {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(URL, DB_CONFIG, function (err, db) {
        if (err) {
          reject(err);
        }
        var dbo = db.db(DB_NAME);
        dbo
          .collection(TABLE_NAME)
          .find()
          .toArray(function (err, result) {
            if (err) {
              reject(err);
            }
            db.close();
            resolve(result);
          });
      });
    });
  }
}

module.exports = new ContactsDAO();
