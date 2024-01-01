import { users, deliverer, client } from "../models/authenticationModels";

export const register = async (req: any, res: any) => {
    const {body} = req
    await users.create(body)
    .then( (user) => { 
        if (user.role === 'client'){
             client.create({userId: user._id})
        }
        if (user.role === 'deliverer'){
             deliverer.create({userId: user._id})
        }
    })
}
export const login = (req: any, res: any) => {

}