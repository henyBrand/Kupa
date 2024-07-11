const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Family = require("../models/Family")
const Employee = require("../models/Employee")

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(401).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }
    let foundUser = await Family.findOne({ username: username }).populate("employee", { name: 1 }).lean()
    if (!foundUser) {
        foundUser = await Employee.findOne({ username: username })
    }
    if (!foundUser) {
        return res.status(401).json({
            error: true,
            message: "משתמש לא רשום",
            data: null
        })
    }

    //password
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) {
        return res.status(401).json({
            error: true,
            message: "משתמש לא רשום",
            data: null
        })
    }

    // token
    const userInfo = {
        _id: foundUser._id,
        username: foundUser.username,
        name: foundUser.name,
        role: foundUser.role
    }


    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })

    const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

    console.log(accessToken);
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })




    res.json({ accessToken })

}

const refresh = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(401).json({
            error: true,
            message: "משתמש לא רשום",
            data: null
        })
    }
    const refreshToken = cookies.jwt
    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decode) => {
            if (err) {
                return res.status(403).json({
                    error: true,
                    message: "Forbidden",
                    data: null
                })
            }
            let foundUser = await Family.findOne({ username: decode.username }).populate("employee", { name: 1/*,phone:1*/ })
            if (!foundUser) {
                foundUser = await Employee.findOne({ username: decode.username })
            }
            if (!foundUser) {
                return res.status(401).json({
                    error: true,
                    message: "משתמש לא רשום",
                    data: null
                })
            }
            const userInfo = {
                _id: foundUser._id,
                username: foundUser.username,
                name: foundUser.name,
                role: foundUser.role
            }

            const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m'/* אומר לכמה זמן הטוקן הטוקן מאושר*/ })

            res.json({ accessToken })
        })
}



//איך אפשר לשמור בעוגיות ללא refreshToken?
const logout = async (req, res) => {
    const cookies = req.cookies
    //jwt או שהוא ריק או שאין לו את
    if (!cookies?.jwt) {
        //סטטוס של - אין נתונים
        return res.status(204).json({
            error: true,
            message: "אין נתונים",
            data: null
        })
    }
    res.clearCookie("jwt", {
        httpOnly: true
    })
    res.json({
        error: false,
        message: "Cookie נמחק",
        data: null
    })
}
module.exports = { login, refresh, logout } 