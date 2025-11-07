import crypto from 'crypto'

const getverificationLink=()=>{
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 )
    const verificationLink=`http://localhost:5173/verify-email?token=${token}`;
    return {verificationLink,expiresAt,token}
}
export default getverificationLink;