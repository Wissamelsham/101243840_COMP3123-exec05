const express = require("express")
const app = express()
const router = express.Router()
const user = require("./user.json")

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get("/", (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})
router.get("/home", (req, res) => {
	res.sendFile(`${__dirname}/home.html`)
})

/*
- Return all details from user.json file to client as JSON format
*/
router.get("/profile", (req, res) => {
	res.json(user)
})


/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get("/login", (req, res) => {
	const { username, password } = req.query
	let response = { status: true, message: "User is valid" }

	if (username !== user.username) {
		response.status = false
		response.message = "User Name is invalid"
	} else if (password !== user.password) {
		response.status = false
		response.message = "Password is invalid"
	}
	res.json(response)
})

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get("/logout/:username", (req, res) => {
	let { username } = req.params
	let response = ``
	if (username != user.username) {
		response = "<b>Failed to logout. Username does not match</b>"
	} else {
		response = `<b>${username} successfully logout</b>`
	}
	res.send(response)
})

app.use("/", router)

app.listen(process.env.port || 8081)

console.log("Web Server is listening at port " + (process.env.port || 8081))
