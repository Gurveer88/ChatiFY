import jwt from 'jsonwebtoken';
// SO when the new user is created they will get a token which will login them right after the sign up.
export const generateToken = (userId, res) => {
    const {JWT_SECRET, NODE_ENV} = process.env;
    if(!JWT_SECRET){
        throw new Error("Jwt secret is not configured");
    }
    const token = jwt.sign({userId}, JWT_SECRET, {expiresIn : '7d'});
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // in ms
        httpOnly: true, // prevent XSS attacks: cross-site scripting
        sameSite: "strict", // Prevents CRSF attacks
        secure: NODE_ENV !== "development",
        path: '/',
    });
    return token;
};