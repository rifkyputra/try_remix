import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { eq } from "drizzle-orm/sql";
import db from "~/.server/drizzle";
import { decryptText, hashPassword, verifyPassword } from "~/.server/hash";
import { userSchema } from "~/.server/schema/schema";

export default function Login() {
    return <div>
        <form method="post">
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
}


export async function action({ request }: ActionFunctionArgs) {
    if (request.method === 'POST' && request.headers.get('content-type')?.includes('x-www-form-urlencoded')) {
        const formData = await request.formData();

        const email = String(formData.get('email'));

        const user = (await db.select().from(userSchema).where(eq(userSchema.username, email )))[0];
        console.log(user);
        console.log(email);
        if(!user){
            return redirect('/register')
        }

        
        
        const  password = String(formData.get('password'));
        const decryptedPass = decryptText(user.password);

        const hashed = await hashPassword(decryptedPass);


        console.log(decryptedPass);
        const isSame= await verifyPassword(password,decryptedPass);
        console.log('---> '+isSame);

        if(await verifyPassword(password, decryptedPass)){

            console.log('passwords match');
            console.log('LOGIN SUCCESS...')
            
            return redirect('/todo')
            
            
        }
        



        return redirect('/login')
    }

    return redirect('/login')
}