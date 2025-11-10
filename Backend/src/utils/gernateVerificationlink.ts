import crypto from 'crypto'

const getverificationLink=()=>{
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verificationExpiresAt = new Date(Date.now() + 1000 * 60 * 60 )
    const verificationLink=`${process.env.FRONTENDURL}/verify-email?token=${verificationToken}`;
    return {
        verificationLink,
        verificationExpiresAt,
        verificationToken,
}
}
export default getverificationLink;