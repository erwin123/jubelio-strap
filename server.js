'use strict';

const Hapi = require('hapi');
const axios = require('axios');
const server = new Hapi.Server();
const xml2js = require('xml2js');
const endpoint = "http://api.elevenia.co.id/rest/prodservices/product/listing";
const endpointdetail = "http://api.elevenia.co.id/rest/prodservices/product/details/";
const apikey = "721407f393e84a28593374cc2b347a98";
server.connection(
    {
        port: 3001,
        host: 'localhost',
        routes: {
            "cors": {
                origin: ["*"],
                headers: ["Accept", "Content-Type"],
                additionalHeaders: ["X-Requested-With"]
            }
        }
    });
server.register({
    register: require('hapi-plugin-pg'),
    options: {
        user: 'postgres',
        password: 'Sunter123',
        port: 5432,
        host: 'localhost',
        database: 'jubelio_test'
    }
}, (err) => {
    if (err) {
        throw err;
    }
});

//other function
const fetchProductDetail = async (request, prdNo, cb) => {
    let parser = new xml2js.Parser();
    await axios.get(endpointdetail + prdNo,
        {
            params: {},
            headers: { 'Content-Type': "application/json", "openapikey": apikey }
        }).then(res => {
            parser.parseString(res.data, function (err, result) {
                let dataColl = result.Product;
                insertProductDetail(request, [dataColl.prdNm[0], dataColl.prdNo[0], +dataColl.prdSelQty[0], dataColl.htmlDetail[0], dataColl.prdImage01[0]], (err, result) => {
                    cb(err, result);
                });
            });
        })
}

const insertProductDetail = (request, data, cb) => {
    request.pg.client.query('INSERT INTO product_detail("ProductName","ProductNo", "Stock","Description", "ProductImg") VALUES($1, $2, $3, $4, $5)', data, (err, result) => {
        if (err) {
            cb(500, err);
        }
        if (!result || !result.rows || result.rows.length === 0) {
            cb(null, result);
        }
    });
}

const insertProduct = (request, data, cb) => {
    request.pg.client.query('INSERT INTO product("ProductName", "ProductNo") VALUES($1, $2)', data, (err, result) => {
        if (err) {
            cb(500, err);
        }
        if (!result || !result.rows || result.rows.length === 0) {
            cb(null, result);
        }
    });
}

const objectProp = (object, isString = false) => {
    let result = [];

    for (var propertyName in object) {
        result.push('"' + propertyName + '"');
    }
    return isString ? result.join() : result;
}

const objectValue = (object) => {
    let result = []
    for (var propertyName in object) {
        result.push(object[propertyName]);
    }
    return result;
}

const objectLength = (object) => {
    let result = []
    let count = 0;
    for (var propertyName in object) {
        count++;
        result.push("$" + count.toString());
    }
    return result.join();
}

//routes
server.route({
    method: 'POST',
    path: '/products',
    handler: (request, reply) => {
        let data = request.payload;
        request.pg.client.query('INSERT INTO product(' + objectProp(data, true) + ') VALUES (' + objectLength(data, true) + ')', objectValue(data), (err, result) => {
            if (err) {
                return reply(new Error("Error Qry"));
            }
            return reply(result);
        });
    }
});

server.route({
    method: 'POST',
    path: '/products/edit',
    handler: (request, reply) => {
        let data = request.payload;
        request.pg.client.query('UPDATE product set "ProductName"=$1 WHERE "ProductNo"=$2', [data.ProductName, data.ProductNo], (err, result) => {
            if (err) {
                return reply(new Error("Error Qry"));
            }
            request.pg.client.query('UPDATE product_detail set "ProductName"=$1, "Description"=$2, "Stock"=$3 WHERE "ProductNo"=$4', [data.ProductName, data.Description, data.Stock, data.ProductNo], (errDet, resultDet) => {
                if (errDet) {
                    return reply(new Error("Error QryDet"));
                }
                return reply(resultDet);
            });

        });
    }
});

server.route({
    method: 'POST',
    path: '/products/delete/{code}',
    handler: (request, reply) => {
        request.pg.client.query('DELETE from product WHERE "ProductNo"=$1', [request.params.code], (err, result) => {
            if (err) {
                return reply(new Error("Error Qry"));
            }
            request.pg.client.query('DELETE from product_detail WHERE "ProductNo"=$1', [request.params.code], (errDet, resultDet) => {
                if (errDet) {
                    return reply(new Error("Error Qry"));
                }
                return reply(resultDet);
            });
        });
    }
});

server.route({
    method: 'GET',
    path: '/products',
    handler: (request, reply) => {
        request.pg.client.query("SELECT * FROM product_detail", (err, result) => {
            if (err) {
                return reply(err).code(500);
            }
            if (!result || !result.rows || result.rows.length === 0) {
                return reply({
                    body: "Not Found"
                }).code(404);
            }
            return reply(result.rows);
        });
    }
});

server.route({
    method: 'GET',
    path: '/synch_elevenia',
    handler: (request, reply) => {
        let parser = new xml2js.Parser();
        axios.get(endpoint,
            {
                params: {},
                headers: { 'Content-Type': "application/json", "openapikey": apikey }
            }).then(res => {
                parser.parseString(res.data, async (err, result) => {
                    let dataColl = result.Products.product;
                    for (let i = 0; i < dataColl.length; i++) {
                        insertProduct(request, [dataColl[i].prdNm[0], dataColl[i].prdNo[0]], (err, result) => {
                            if (err) {
                                console.log(result);
                            }
                        });
                        await fetchProductDetail(request, dataColl[i].prdNo[0], (err, result) => {
                            if (err) {
                                console.log(result);
                            }
                        });
                    }
                    return reply({
                        "Message": "OK - Transported " + dataColl.length + " data."
                    }).code(200);
                });

            })
    }
});


//start up server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});