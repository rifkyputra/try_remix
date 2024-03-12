import { ActionFunctionArgs, json } from "@remix-run/node";
import { v4 as uuidv4 } from "uuid";
import db from "~/.server/drizzle";
import { userSchema } from "~/.server/schema/schema";
import crypto from 'crypto';
import util from 'util'
import { encryptText, hashPassword } from "~/.server/hash";

export default function register() {
    return <>

    <form method="post">
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
        </div>
        <div>
            <label htmlFor="password">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" />
        </div>
        <button type="submit">Register</button> 
    </form>
    
    
    </>
}

export async function action({ request}: ActionFunctionArgs) {

    if(request.method === 'POST' && request.headers.get('content-type')?.includes('x-www-form-urlencoded')){
        const formData = await request.formData();

        if(!formData.get('password')) {
            return json({
                message: 'Invalid password'
            }, {
                status: 400
            })
        }

        const password = String(formData.get('password'));
        const hashedPassword = await hashPassword(password);
        const encryptedPass = encryptText(hashedPassword);

        await db.insert(userSchema).values({
            id: crypto.randomUUID(),
            username: String(formData.get('email')),
            password: encryptedPass,
        })

        return {
            redirect: '/register-success'
        }
    }

    console.log(request.headers);
    console.log(request.method);

    return json({
        message: 'Invalid request'
    }, {
        status: 400
    })

}


