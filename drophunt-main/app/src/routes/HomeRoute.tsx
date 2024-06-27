import AirdropsPage from "@/components/AirdropsPage"
import ClaimPage from "@/components/ClaimPage"
import EarnPage from "@/components/EarnPage"
import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import OpenedAirdropPage from "@/components/OpenedAirdropPage"
import { Ads, Airdrop, Airdrops, Global } from "@ronin/drophunt"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useInitData } from "@tma.js/sdk-react"
import { useTonAddress } from "@tonconnect/ui-react"
import { useEffect } from "react"
import { proxy } from "valtio"
import { useProxy } from "valtio/utils"
import { treaty } from "@elysiajs/eden"
import { App } from "api/src/api"

const app = treaty<App>(
	import.meta.env.PROD
		? "https://drophunt.nikiv.workers.dev"
		: "http://localhost:8787"
)

export const HomeRouteState = proxy({
	activePage: "Airdrops" as "Airdrops" | "Claim" | "Earn" | "OpenedAirdrop",
	activeFilters: [] as string[],
	openedAirdrop: null as Airdrop | null,
	walletConnected: false,
	openFilterMenu: false,
	savedAddressInDb: false,
	availableFilterOptions: ["The Open Network", "Solana", "Polygon", "Ethereum"],
	blockchainLogos: {
		Solana:
			"https://storage.ronin.co/spa_ytxzy7a722jx52um/7cc8408f-0eb4-4d78-9747-ffc2408a0230",
		"The Open Network":
			"https://storage.ronin.co/spa_ytxzy7a722jx52um/2afb1096-84f9-4e69-8376-d70f21dc5870",
		Polygon:
			"https://storage.ronin.co/spa_ytxzy7a722jx52um/e640d8e8-52ab-4a74-8f59-387e5c00724c",
		Ethereum:
			"https://storage.ronin.co/spa_ytxzy7a722jx52um/05911aa3-9777-49a2-8c76-0189d8ef91fc",
	},
	ads: [] as Ads,
	airdrops: [] as Airdrops,
	global: {} as Global,
})
export default function HomeRoute() {
	const local = useProxy(HomeRouteState)

	const { error, data, isFetching } = useQuery({
		queryKey: ["HomeRoute"],
		queryFn: async () => {
			// const { data } = await app.index.get()
			// console.log(data, "data")
			// return data
			return {}

			// const res = await fetch(`https://drophunt.nikiv.workers.dev/`, {
			// 	method: "GET",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// })
			// const resJson = await res.json()
			// // @ts-ignore
			// local.ads = resJson.ads
			// // @ts-ignore
			// local.airdrops = resJson.airdrops
			// // @ts-ignore
			// local.global = resJson.global
			// return resJson
		},
	})
	const walletConnected = useMutation({
		mutationFn: ({
			walletAddress,
			telegramId,
			telegramUsername,
		}: {
			walletAddress: string
			telegramId: number
			telegramUsername: string
		}) => {
			return fetch(`https://drophunt.nikiv.workers.dev/wallet-connected`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					walletAddress: walletAddress,
					telegramId: telegramId,
					telegramUsername: telegramUsername,
				}),
			})
		},
	})

	const initData = useInitData()
	const address = useTonAddress()
	useEffect(() => {
		const username = initData?.user?.username
		const telegramId = initData?.user?.id
		if (
			import.meta.env.PROD &&
			!local.savedAddressInDb &&
			username &&
			telegramId &&
			address
		) {
			local.walletConnected = true
			walletConnected.mutate({
				walletAddress: address,
				telegramId: telegramId,
				telegramUsername: username,
			})
			local.savedAddressInDb = true
		}
	}, [address, initData])

	if (isFetching) return <div className="text-white">Loading...</div>
	if (error) return <div>Error: {JSON.stringify(error)}</div>
	if (data && local.ads.length > 0 && local.airdrops.length > 0 && local.global)
		return (
			<div className="flex items-center justify-center">
				<div className="overflow-auto">
					<div className="py-[20px] px-[15px] text-white text-[14px] flex flex-col gap-[22px]">
						<Nav />
						<div className="w-full rounded-[20px] flex items-center justify-center bg-[#2e2e2e]">
							<img
								src={local.ads[0].image.src}
								className="w-full h-full object-cover"
							/>
						</div>
						{(() => {
							switch (local.activePage) {
								case "Airdrops":
									return <AirdropsPage />
								case "Claim":
									return <ClaimPage />
								case "Earn":
									return <EarnPage />
								case "OpenedAirdrop":
									return <OpenedAirdropPage />
								default:
									return <></>
							}
						})()}
					</div>
					<Footer />
				</div>
			</div>
		)
}
