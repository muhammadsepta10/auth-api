import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt"
import { query } from '../../config/baseFunction';
import passport from "passport";
import dotenv from "dotenv";
import strategy from "passport-facebook";

const FacebookStrategy = strategy.Strategy;
dotenv.config();
passport.serializeUser(function(user:any, done) {
  done(null, user);
});

passport.deserializeUser(function(obj:any, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID||"",
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET||"",
      callbackURL: process.env.FACEBOOK_CALLBACK_URL||"",
      profileFields: ["email", "name"]
},
    async(accessToken, refreshToken, profile, done) => {
        let { email, firstname, lastname } = profile._json;
        email=!email?"":email
        await query("INSERT INTO users(email,firstname,lastname) VALUES($1,$2,$3)", [email, firstname, lastname])
        done(null,profile)
    }
))


export const register = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body?.email,
        firstname = req.body?.firstname,
        lastname = req.body?.lastname,
        birthdate = req.body?.birthdate,
        icNumber = req.body?.icNumber
        let password = req.body?.password
        if (!email||!password||!firstname||!lastname||!birthdate||!icNumber) {
            return res.status(400).send({message:"Parameter not valid",data:{}})
        } else {
            password = await bcrypt.hash(password, 10)
            await query("INSERT INTO users(email,firstname,lastname,password,birthdate,ic_number) VALUES($1,$2,$3,$4,$5,$6)", [email, firstname, lastname, password, birthdate, icNumber])
            const data = await query("SELECT * FROM users",[])
            return res.send({ message: "Success", data: data.rows })
        }
    } catch (error) {
        (error)
        next(error)
    }
}

export const login = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body?.email
        let password = req.body?.password
        if (!email||!password) {
            return res.status(400).send({message:"Parameter not valid",data:{}})
        } else {
            const checkEmail = await query("SELECT id,password FROM users WHERE email = ?", [email])
            if (checkEmail.rowCount<1) {
                return res.send({message:"Email not found",data:{}})
            } else {
                const passwordEncrypted = checkEmail.rows[0].password
                const userId = checkEmail.rows[0].id
                const passCompare = await bcrypt.compare(password, passwordEncrypted)
                if (passCompare) {
                    return res.send({message:"Success Login",data:{id:userId}})
                } else {
                    return res.send({message:"Wrong Pawword",data:{}})
                }
            }
        }
    } catch (error) {
        next(error)
    }
}

export const facebookFail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(400).send("failed")
    } catch (error) {
        next(error)
    }
}