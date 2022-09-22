import connection from "../../../DB/connection.js";

export const addProduct = (req, res, next) => {
    const { productName, productDescription, productPrice, userID, productCategory, productImageURL } = req.body;
    connection.execute(`insert into products(productName, productDescription, productPrice, userID, productCategory,productImageURL  )
    values('${productName}','${productDescription}',${productPrice},${userID},'${productCategory}','${productImageURL}')`,(err, result) => {
        if (err) {
            res.json({message: "Query Error", err});
        } else {
            res.json({message: "Done"});
        }
    })
}

export const getProducts = (req, res, next) => {
    connection.execute(`select p.id, p.productCategory, p.productImageURL, p.createdAt, p.productDescription, p.productName, p.productDescription, p.productPrice, u.firstName, u.lastName, u.age  from products as p inner join users as u on p.userID = u.id`,(err, result) => {
        if (err) {
            res.json({message: "Query Error", err});
        } else {
            res.json({message: "Done", result});
        }
    })
}

export const changeProduct = (req, res, next) => {
    const { id } = req.params;
    const { productName, productDescription, productPrice, productCategory, productImageURL, email } = req.body;
    //console.log("email: ",email,password);
            req.method == "PUT"?
            connection.execute(`update products set productName = '${productName}', productDescription = '${productDescription}',
                            productPrice = ${productPrice}, productCategory = '${productCategory}', productImageURL = '${productImageURL}' where id = ${id}`, (err, result) => {
                                if (err) {
                                    res.json({message: "Query Error", err})
                                } else {
                                        if (result.affectedRows) {
                                            res.json({message: "Done"});
                                        } else {
                                            res.json({message: "Invalid product id"});
                                        }
                                }
            })
            :
            connection.execute(`delete from products where id = ${id}`, (err, result) => {
                                if (err) {
                                    res.json({message: "Query Error", err})
                                } else {
                                        if (result.affectedRows) {
                                            res.json({message: "Done"});
                                        } else {
                                            res.json({message: "Invalid product id"});
                                        }
                                }
            });
    
}

export const getProductByID = (req, res, next) => {
    const { id } = req.params;
    connection.execute(`select * from products where id = ${id}`,(err, result) => {
        if (err) {
            res.json({message: "Query Error", err});
        } else {
            if (result.length) {
                res.json({message: "Done" , result});
            } else {
                res.json({message: "Invalid id"});
            }
            
        }
    })
}

export const getProductsByPrice = (req, res, next) => {
    const { lowestPrice } = req.query;
    connection.execute(`select * from products where productPrice > ${lowestPrice}`,(err, result) => {
        if (err) {
            res.json({message: "Query Error", err});
        } else {
            if (result.length) {
                res.json({message:"Done", result});
            } else {
                res.json({message:`No products with productPrice greater than ${lowesty}`});
            }
            
        }
    })
}

export const getProductsByFilter = (req, res, next) => {
    let { category, pricelt, pricegt, priceAsc, priceDesc, productName, dateAsc, dateDesc } = req.query;
    let query = '', toFilter = '';
    (category != '' && category != "All") || pricelt != '' || pricegt != '' || productName != '' ? toFilter = ' where ': toFilter = ''; 
    if(category && category != "All")
    {
        if(query != '')
            query += 'and ';
        query += `productCategory = '${category}'`;
    }
    if(productName)
    {
        if(query != '')
            query += 'and ';
        query += `productName like '%${productName}%'`;
    }
    if(pricelt)
    {
        if(query != '')
            query += 'and ';
        query += `productPrice <= ${pricelt}`;    
    }
    if(pricegt)
    {
        if(query != '')
            query += ' and ';
        query += `productPrice >= ${pricegt}`;    
    }
    if(priceAsc)
    {
        query += ` order by productPrice ASC`;
    }
    if(priceDesc)
    {
        query += ` order by productPrice DESC`;
    }
    if(dateAsc)
    {
        query += ` order by createdAt ASC`;
    }
    if(dateDesc)
    {
        query += ` order by createdAt DESC`;
    }
    console.log(query);
    connection.execute(`select id, productName, createdAt, productCategory, productPrice, productDescription, productImageURL from products` + toFilter + query,(err, result) => {
        if (err) {
            res.json({message:"Query error", err});
        } else {
            res.json({message:"Done", result});
        }
    });
}
