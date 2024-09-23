import { QuickDB } from "quick.db";

export default eventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const db = new QuickDB();

    const links = await db.get(`links`);
    if (!links[name]) {
        return {
            status: 404,
            body: {
                message: "Link not found"
            }
        }
    }
    
    return new Response(JSON.stringify(links[name]), {
        status: 301,
        headers: {
            "Location": links[name]
        }
    });
});