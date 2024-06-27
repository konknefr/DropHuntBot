import { useMutation } from "@tanstack/react-query"
import { TonConnectButton } from "@tonconnect/ui-react"
import { useProxy } from "valtio/utils"
import { HomeRouteState } from "../routes/HomeRoute"
import Icons from "./Icons"

export default function Nav() {
	const local = useProxy(HomeRouteState)

	// useEffect(() => {}, [local])
	const mutation = useMutation({
		mutationFn: (walletAddres: string) => {
			return fetch("https://drophunt.nikiv.workers.dev/wallet-connected", {
				method: "POST",
				body: JSON.stringify({ walletAddress: walletAddres }),
			})
		},
	})

	return (
		<div className="flex items-center justify-between">
			{/* if no airdrop is open, then show nav bar */}
			{local.openedAirdrop === null ? (
				<div className="flex mr-4 bg-[#191919] text-[12px] rounded-full h-[33px] items-center font-light">
					<div
						onClick={() => {
							local.activePage = "Airdrops"
						}}
						style={local.activePage === "Airdrops" ? { fontWeight: 600 } : {}}
						className={`p-2 h-full flex cursor-pointer items-center justify-center rounded-full ${
							local.activePage === "Airdrops" ? "bg-[#2E2E2E]" : ""
						}`}
					>
						Airdrops
					</div>
					<div
						onClick={() => {
							local.activePage = "Claim"
						}}
						style={local.activePage === "Claim" ? { fontWeight: 600 } : {}}
						className={`p-2 px-4 h-full flex cursor-pointer items-center justify-center rounded-full ${
							local.activePage === "Claim" ? "bg-[#2E2E2E]" : ""
						}`}
					>
						Claim
					</div>
					<div
						onClick={() => {
							local.activePage = "Earn"
						}}
						style={local.activePage === "Earn" ? { fontWeight: 600 } : {}}
						className={`p-2 px-4 h-full cursor-pointer flex items-center justify-center rounded-full ${
							local.activePage === "Earn" ? "bg-[#2E2E2E]" : ""
						}`}
					>
						Earn
					</div>
				</div>
			) : (
				<div
					onClick={() => {
						local.openedAirdrop = null
						local.activePage = "Airdrops"
					}}
					className="cursor-pointer hover:scale-[1.1] transition-all"
				>
					<Icons name="Back" />
				</div>
			)}
			{/* TODO: make it green and move it properly */}

			{/* TODO: cannot make it not blue.. */}
			<TonConnectButton
				style={{}}
				// className="bg-[#189A4C] rounded-full p-2"
				// className="ton-connect-page__button"
				// style={{
				// 	backgroundColor: "#189A4C",
				// 	borderRadius: "9999px",
				// 	padding: "0.5rem",
				// }}
			/>
			{/* <button className="bg-[#189A4C] rounded-full p-2">Connect Wallet</button> */}
		</div>
	)
}
