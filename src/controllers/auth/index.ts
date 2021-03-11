import * as express from "express";
import * as auth from "./auth";
import passport from "passport";

let router = express.Router();
/**
 * @swagger
 *
 * components:
 *  schemas:
 *      regritration:
 *          type: object
 *          required:
 *              - email
 *              - firstname
 *              - lastname
 *              - birthdate
 *              - icNumber
 *              - password
 *          properties:
 *                email:
 *                    example: "muhammadsepta1009@gmail.com"
 *                    type: string
 *                icNumber:
 *                    example: "120398123"
 *                    type: string
 *                password:
 *                    example: "POJA087JK"
 *                    type: string
 *                firstname:
 *                    example: "syaiful"
 *                    type: string
 *                lastname:
 *                    example: "ulum"
 *                    type: string
 *                birthdate:
 *                    example: "2020-09-09"
 *                    type: timestamp
 * 
 *      login:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *                email:
 *                    example: "muhammadsepta1009@gmail.com"
 *                    type: string
 *                password:
 *                    example: "POJA087JK"
 *                    type: string
 *
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *      post:
 *          tags:
 *              - Auth
 *          summary: to regristration
 * 
 *          requestBody:
 *              content:
 *                 'application/json':
 *                      schema:
 *                          $ref: '#/components/schemas/regritration'
 *
 *          responses:
 *             200:
 *                  description: success regritration
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: ""
 *                                  status:
 *                                      example: ""
 *                                      type: string
 *             400:
 *                  description: Invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: ""
 *                                  status:
 *                                      example: error
 */
router.route("/register").post(auth.register)

/**
 * @swagger
 * /api/v1/auth/login:
 *      post:
 *          tags:
 *              - Auth
 *          summary: to login
 * 
 *          requestBody:
 *              content:
 *                 'application/json':
 *                      schema:
 *                          $ref: '#/components/schemas/login'
 *
 *          responses:
 *             200:
 *                  description: success login
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: ""
 *                                  status:
 *                                      example: ""
 *                                      type: string
 *             400:
 *                  description: Invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: ""
 *                                  status:
 *                                      example: error
 */
router.route("/login").post(auth.login)

/**
 * @swagger
 * /api/v1/auth/facebook:
 *      get:
 *          tags:
 *              - Auth
 *          summary: to login with facebook
 *
 *          responses:
 *             200:
 *                  description: success login
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: ""
 *                                  status:
 *                                      example: ""
 *                                      type: string
 *             400:
 *                  description: Invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: ""
 *                                  status:
 *                                      example: error
 */
router.route("/facebook").get(passport.authenticate("facebook"))

/**
 * @swagger
 * /api/v1/auth/facebook/callback:
 *      get:
 *          tags:
 *              - Auth
 *          summary: callback after login
 *
 *          responses:
 *             200:
 *                  description: success login
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: ""
 *                                  status:
 *                                      example: ""
 *                                      type: string
 *             400:
 *                  description: Invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: ""
 *                                  status:
 *                                      example: error
 */
router.route("/facebook/callback").get(passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect:"/api/v1/auth/facebook/fail"
}))

router.route("/facebook/fail").get(auth.facebookFail)

export = router;
