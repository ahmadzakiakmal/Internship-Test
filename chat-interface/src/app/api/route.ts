import json from "@/data/data.json"

export async function GET() {
    return Response.json(json)
}
