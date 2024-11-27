import json from "@/data/data.json"

export async function GET(request: Request) {
    return Response.json(json)
}
