import connection from "../../../DB/connection.js";

export const getUsers = (req, res, next) => {
    connection.execute(`select u.id, u.firstName, u.age, u.admin, u.lastName, u.email  from users as u`,(err, result) => {
        if (err) {
            res.json({message: "Query Error", err});
        } else {
            res.json({message: "Done", result});
        }
    })
}

export const addUser = (req, res, next) => {
    const { firstName, lastName, email, password, age } = req.body;
    connection.execute(`insert into users(firstName, lastName, email, password, age)
    values('${firstName}','${lastName}','${email}','${password}',${age})`,(err, result) => {
        if (err) {
            res.json({message: "Query Error", err});
        } else {
            res.json({message: "Done"});
        }
    })
}

export const signin = (req, res, next) => {
    const { email, password } = req.body;
    connection.execute(`select * from users where email = '${email}' and password = '${password}'`,(err, result) => {
        if (err) {
            res.json({message: "Query Error", err});
        } else {
            if (result.length) {
                res.json({message: "Done",result});
            } else {
                res.json({message: "Email password misMatch"});
            }
            
        }
    })
}

export const updateUser = (req, res, next) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    connection.execute(`update users set firstName = '${firstName}', lastName = '${lastName}',
    age = ${age} where id = ${id}`, (err, result) => {
        if (err) {
            res.json({message: "Query Error", err})
        } else {
                if (result.affectedRows) {
                    res.json({message: "Done"});
                } else {
                    res.json({message: "Invalid id"});
                }
        }
    })
}

export const deleteUser = (req, res, next) => {
    const { id } = req.params;
    connection.execute(`delete from users where id = ${id}`,(err, result) => {
        if (err) {
            res.json({message: "Query Error", err});
        } else {
            if (result.affectedRows) {
                res.json({message: "Done"});
            } else {
                res.json({message: "Invalid id"});
            }
            
        }
    })
}

export const getUserByID = (req, res, next) => {
    const { id } = req.params;
    connection.execute(`select * from users where id = ${id}`,(err, result) => {
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

export const getUsersByAge = (req, res, next) => {
    const {agelt, agegt} = req.query;
    connection.execute(`select * from users where age < ${agelt} and age > ${agegt}`,(err, result) => {
        if (err) {
            res.json({message: "Query Error", err});
        } else {
            if (result.length) {
                res.json({message:"Done", result});
            } else {
                res.json({message:`No users with age between ${agelt} and ${agegt}`});
            }
            
        }
    })
}

export const getUserByNameAndAge = (req, res, next) => {
    const {s_fname, agelt, agegt} = req.query;
    console.log("entered");
    connection.execute(`select * from users where age < ${agelt} and age > ${agegt} and firstName like '${s_fname}%'`,(err, result) => {
        if (err) {
            res.json({message: "Query Error", err});
        } else {
            if (result.length) {
                res.json({message:"Done", result});
            } else {
                res.json({message:`No users with age less than ${agelt} and firstName starts with: ${s_fname}`});
            }
            
        }
    })
}

export const getUsersByName = (req, res, next) => {
    const { s_fname, s_lname, e_fname, agelt } = req.query;
    if(!agelt)
    {
        connection.execute(
            s_fname && s_lname?
            `select * from users where firstName like '${s_fname}%' or lastName like '${s_lname}%'`
            :
            s_fname?`select * from users where firstName like '${s_fname}%'` : `select * from users where firstName like '%${e_fname}'`,(err, result) => {
            if (err) {
                res.json({message: "Query Error", err})
            } else {
                if (result.length) {
                    res.json({message: "Done", result})
                } else {
                    res.json({message: "Not Exist"})
                }
            }
        })
    }
}

export const getUsersByFilter = (req, res, next) => {
    const { s_fname, e_fname, s_lname, agelt, agegt } = req.query;
    let query = '', toFilter = '';
    s_fname || e_fname || s_lname || agelt || agegt? toFilter = ' where ': toFilter = ''; 
    if(s_fname)
    {
        if(query != '')
            query += 'and ';
        query += `firstName like '${s_fname}%'`;
    }
    if(e_fname)
    {
        if(query != '')
            query += 'and ';
        query += `firstName like '%${e_fname}'`;
    }
    if(s_lname)
    {
        if(query != '')
            query += 'or ';
        query += `lastName like '${s_lname}%'`;
    }
    if(agelt)
    {
        if(query != '')
            query += 'and ';
        query += `age <= ${agelt}`;    
    }
    if(agegt)
    {
        if(query != '')
            query += ' and ';
        query += `age >= ${agegt}`;    
    }

    connection.execute(`select * from users` + toFilter + query,(err, result) => {
        if (err) {
            res.json({message:"Query error", err});
        } else {
            res.json({message:"Done", result});
        }
    });
}

export const updateAdmin = (req, res, next) => {
    const { id } = req.params;
    const { adminValue } = req.body;
    connection.execute(`update users set admin = ${adminValue} where id = ${id}`,(err, result) => {
        if (err) {
            res.json({message: 'Query Error', err});
        } else {
            res.json({message: 'Done', result});
        }
    })
}
