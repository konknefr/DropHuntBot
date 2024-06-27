import { Airdrop } from "@ronin/drophunt"
import { useProxy } from "valtio/utils"
import { HomeRouteState } from "../routes/HomeRoute"

export default function AirdropComponent(props: { airdrop: Airdrop }) {
	const local = useProxy(HomeRouteState)
	return (
		<div
			onClick={() => {
				local.activePage = "OpenedAirdrop"
				local.openedAirdrop = props.airdrop
			}}
			className="w-full cursor-pointer flex flex-col gap-3 bg-[#191919] p-5 rounded-[20px]"
		>
			<div className="flex gap-4 w-full">
				{props.airdrop.image.src && (
					<div className="min-w-[50px] w-[50px] h-[50px] rounded-full bg-[#2e2e2e] overflow-hidden flex items-center justify-center">
						<img className="h-full w-full" src={props.airdrop.image.src} />
					</div>
				)}
				<div className="w-full flex flex-col gap-1">
					<div className="font-bold text-[21px] headerFont">
						{props.airdrop.name}
					</div>
					<p className="text-white/60 font-light text-[12px] line-clamp-2">
						{props.airdrop.description}
					</p>
				</div>
			</div>
			<div className="flex space-x-2 items-center text-[12px]">
				<button className="bg-[#189A4C] rounded-full px-3 p-1">Active</button>
				<div className="border border-[#3A3A3A] rounded-full px-3 p-1">
					{props.airdrop.blockchain}
				</div>
			</div>
		</div>
	)
}
