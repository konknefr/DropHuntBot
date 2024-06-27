import { Elysia } from "elysia"
import { get } from "ronin"
import { cors } from "@elysiajs/cors"

const app = new Elysia()
	.use(cors({ origin: "*" }))
	// .use(cors, {
	// 	origin: ({ request, headers }) => true,
	// })
	.get("/", async () => {
		const [airdrops, ads, global] = await Promise.all([
			get.airdrops(),
			get.ads(),
			get.global(),
		])
		return {
			airdrops,
			ads,
			global,
		}
	})
	.listen(8787)

export type App = typeof app

console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`)
