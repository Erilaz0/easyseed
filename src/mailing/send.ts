import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({

    service : "gmail" ,
    port : 465 , 
    auth : {
        user : "alonsoalonsl431432@gmail.com",
        pass : "mcelewoqiksjafvk"
    },
    tls : {
        rejectUnauthorized : false
    }
})

const likesAdviceEmail = ( email : string )=>{

    return transporter.sendMail({

        from : "alonsoalonsl431432@gmail.com",
        to : email,
        subject : "Email verification from greenlaz",
        html : `if it wasn't you, <a href=http://localhost:5173/home/plants> Enter here to talk with our team </a>`
    })
}
export default likesAdviceEmail
