var UserService = require('../services/user.service');
var UserImgService = require('../services/userImg.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getUsers = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    try {
        var Users = await UserService.getUsers({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Users, message: "Succesfully Users Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getUsersByMail = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    let filtro = { email: req.body.email }
    try {
        var Users = await UserService.getUsers(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Users, message: "Succesfully Users Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createUser = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller de Usuarios", req.body)
    var User = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        lastname: req.body.lastname,
        dni: req.body.dni,
        root: req.body.root

    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdUser = await UserService.createUser(User)
        return res.status(201).json({ createdUser, message: "Succesfully Created User" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: "User Creation was Unsuccesfull" })
    }
}

exports.updateUser = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.dni) {
        return res.status(400).json({ status: 400., message: "DNI be present" })
    }
    var User = {

        name: req.body.name ? req.body.name : null,
        lastname: req.body.lastname ? req.body.lastname : null,
        email: req.body.email ? req.body.email : null,
        dni: req.body.dni ? req.body.dni : null,
        password: req.body.password ? req.body.password : null,
        root: req.body.root ? req.body.root : "N"
    }
    try {

        var updatedUser = await UserService.updateUser(User)
        return res.status(200).json({ status: 200, data: updatedUser, message: "Succesfully Updated User" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.removeUser = async function (req, res, next) {
    console.log('estamos aca')
    console.log(req.body)
    var id = req.body.id;
    console.log(id);
    try {
        var deleted = await UserService.deleteUser(id);
        return res.status(200).send("Succesfully Deleted... ");


    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: e.message })
    }
}

exports.loginUser = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("body", req.body)
    var User = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await UserService.loginUser(User);
        return res.status(201).json({ loginUser, message: "Succesfully login" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: "Invalid username or password" })
    }
}

exports.guardarImagenUser = async function (req, res, next) {

    console.log("ImgUser", req.body)
    // Id is necessary for the update
    if (!req.body.email) {
        return res.status(400).json({ status: 400., message: "Mail must be present" })
    }

    let userImg = {
        email: req.body.email,
        nombreImagen: req.body.nombreImagen
    }

    try {
        if (userImg.nombreImagen !== '') {
            var newUserImg = await UserImgService.createUserImg(userImg);
        }

        return res.status(201).json({ status: 201, message: "Imagen cargada" });

    } catch (e) {
        console.log("error guardar imagen", e)
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.getImagenUserByMail = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    //obtener filtro
    var filtro = {
        mail: req.body.email
    }
    try {
        var UsersImg = await UserImgService.getImagenesByUser(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        console.log("userByDni", UsersImg)
        if (UsersImg.total === 0)
            return res.status(201).json({ status: 201, data: UsersImg, message: "No existe Mail" });
        else
            return res.status(200).json({ status: 200, data: UsersImg, message: "Succesfully Users Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}    
