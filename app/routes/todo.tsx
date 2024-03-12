import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { eq } from "drizzle-orm";
// import tursoClient from "~/.server/turso";
import { v4 as uuidv4 } from "uuid";
import db from "~/.server/drizzle";
import { todoSchema } from "~/.server/schema/schema";

export default function Todo() {
    const greetings = useLoaderData<typeof loader>();
    const submit = useSubmit();

    return (
        <div className="p-6">

            <ul>
                {greetings.todos.map((todo) => {
                    return <li key={todo.id} className="flex p-4">

                        <div>
                            {todo.message}
                        </div>

                        <button className="button bg-red-400 border-red-700 text-white px-4 py-2 rounded-md m-2" onClick={() => {
                            submit(
                                { id: todo.id },
                                {
                                    method: "delete",
                                    encType: "application/json"
                                },
                            )
                        }}>
                            x
                        </button>
                    </li>
                })}

            </ul>

            <div className="flex">
                <form method="post" className="flex">
                    <input name="message" type="text" className="border border-gray-400 p-2 rounded-md" />
                    <div className="px-1"></div>
                    <input type="submit" className="button bg-blue-400 border-blue-700 text-white px-4 py-2 rounded-md" title="l"/>
                </form>
            </div>
        </div>




    );
}

type Todo = {
    id: string;
    message: string;
}

export async function action({ request }: LoaderFunctionArgs) {
    if (request.method === "POST") {
        var message = "";
        // console.log(request.headers.get("content-type"));
        // return json({
        //     message: "Hello World"
        // }); 
        if(request.headers.get("content-type")?.includes("x-www-form-urlencoded")){
            const formData = await request.formData();
            console.log(formData);
            message = String(formData.get("message"));
        } else {
            const body = await request.json();
            message = body.message;

        }

        if (message.length === 0) {
            return json({
                message: "Message is required"
            }, {
                status: 400
            });
        }

        const todo: Todo = {
            id: uuidv4(),
            message: message
        }

        await db.insert(todoSchema).values(todo);
        
    }

    if (request.method === "DELETE") {
        const body = await request.json();

        if (!body.id) {
            return json({
                message: "id is required"
            }, {
                status: 400
            });
        }

        await db.delete(todoSchema).where(eq(todoSchema.id, body.id));
    }

    return json({
        status: "ok",
    }, {
        status: 201
    });


}


export async function loader() {
    // const alltodos = await tursoClient.execute("SELECT * FROM todo");
    const alltodos = await db.select().from(todoSchema);

    const todos: Todo[] = alltodos.map((todo: any) => {
        return {
            id: todo.id,
            message: todo.message
        }
    });

    return json({
        message: "Hello Worldssss",
        todos: todos
    });
}
