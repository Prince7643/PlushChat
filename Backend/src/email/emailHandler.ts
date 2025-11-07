import nodemailer from 'nodemailer'


const emailService = async ( 
    email:string, 
    subject:string, 
    content:{username:string,verifyLink:string}, 
    tamplate:<T>(data:T)=>string
):Promise<void> => {
 console.log("EMAIL:", process.env.EMAIL);
console.log("PASSWORD:", process.env.PASSWORD ? "Loaded" : "Missing");

    try {
        const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const html=tamplate(content)

    const mailOption:nodemailer.SendMailOptions={
        from:process.env.EMAIL,
        to:email,
        subject:subject,
        html:html
    }

    await transport.sendMail(mailOption)
    } catch (error) {
        throw error
    }


}

export default emailService

//