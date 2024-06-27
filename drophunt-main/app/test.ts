import { hc } from "hono/client"
import { AppType } from "../api/src/index"

const client = hc<AppType>("/")
async function main() {
	const response = await client.index.$get("")
	return await response.json()
}

// @ts-ignore
await main()
