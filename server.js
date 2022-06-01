const
    express = require("express"),
    app = express(),
    jwt = require("jsonwebtoken"),
    secret = "1122"


const users = [{
    _id: "122344",
    name: "yosef",
    email: "a@a",
    pass: "1234"
}]

function createToken(id) {
    const token = jwt.sign({ _id: id }, secret, { expiresIn: "35s" })
    return token
}


function login(email, pass) {
    const user = users.find(val => val.email === email)
    if (!user || user.pass != pass) throw 'not auth'
    const token = createToken(user._id)
    return token
}
function log() {
    try {
        const token = login("a@a", "1234")
        console.log(token);
        const res=authToken(token)
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}
log()


function authToken(token) {
    const
        decode = jwt.verify(token, secret),
        id = decode._id,
        foundUser = users.find(user => user._id === id)
    return foundUser
}

app.listen(3210, () => console.log(`server is up`))
