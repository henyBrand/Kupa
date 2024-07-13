// const express = require("express")
// const multer = require("multer")

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         //אם אנחנו רוצות שכל אחד יוכל לעלות כמה קבצים אולי נפתח לכל אחד תיקייה לפי השם שלו וכך אם יש לו כבר תיקייה זה יכנס לשם ואם לא הוא יצור לו תיקיה
//         //השאלה היא אם יש אפשרות כבר בדף הזה לדעת את שם המשפחה 
//         cb(null, './public')
//     },
//     filename: function (req, file, cb) {
//         //צריך להחליט על שם לקובץ אולי תעודות זהות 

//         //const unique = Date.now() + "-" + Family.username
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
//         cb(null, uniqueSuffix + "-" + file.originalname)
//     }

// })

// const upload = multer({ storage: storage })
const express = require("express")
const multer = require("multer")

const path = require("path")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "public", "uploads") );
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "-" + file.originalname); // Corrected line
    }
});

const upload = multer({ storage: storage });
const FamilyController = require("../controllers/FamilyController")
const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")
const router = express.Router()


const Family = require("../models/Family")


router.use(verifyJWT)
//router.use(verifyAdmin)

router.get("/", FamilyController.getAllFamilies)
router.get("/:id", FamilyController.getFamilyById)
router.post("/", verifyAdmin, FamilyController.addFamily)
router.put("/:id", upload.single("tzFile"), FamilyController.updateTzFile)

// router.post("/",verifyAdmin, upload.fields([
//     { name: 'tzFile', maxCount: 1 },

// ]), FamilyController.addFamily);
router.put("/", upload.single('tzFile'), FamilyController.updateFamily)
router.delete("/", verifyAdmin, FamilyController.deleteFamily)

module.exports = router