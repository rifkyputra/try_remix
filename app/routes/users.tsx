import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import db from '~/.server/drizzle';
import { userSchema } from '~/.server/schema/schema';
export default function Users() {
    const users = useLoaderData<typeof loader>();
    <>
        <div>
            List All Users
        </div>
      <div> {
            users.users.map((user) => {
                return <div key={user.id}>
                    {user.username}
                </div>
            })
        }
        </div>




        {users.users.length === 0 ? <div>

            No users found
        </div>
        : <></>}
        <ul>
            {users.users.map((user) => {
                return <li key={user.id}>
                    {user.username}
                </li>
            })}
        </ul>

    </>
}


type UserView = {
    id: string,
    username: string
}

export async function loader(loader: LoaderFunctionArgs) {
    const users: UserView[] = (await db.select().from(userSchema)).map((user) => {
        return {
            id: user.id,
            username: user.username
        }
    });

    console.log(users)


    return json({
        users: users,
    });


}