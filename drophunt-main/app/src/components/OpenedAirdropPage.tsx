import { useProxy } from "valtio/utils"
import { HomeRouteState } from "../routes/HomeRoute"
import Icons from "./Icons"
import { useUtils } from "@tma.js/sdk-react"
import { useTonAddress } from "@tonconnect/ui-react"

export default function OpenedAirdropPage() {
	const local = useProxy(HomeRouteState)
	const utils = useUtils()
	const userFriendlyAddress = useTonAddress()

	return (
		<>
			{local.openedAirdrop !== null && (
				<>
					{/* opened airdrop content */}
					<div className="flex flex-col justify-between items-center w-full gap-[22px]">
						<div className="h-full overflow-hidden bg-[#2E2E2E] w-full rounded-[20px]">
							<div className="flex gap-3 items-center px-4 p-3">
								{local.openedAirdrop?.image?.src && (
									<img
										src={local.openedAirdrop.image.src}
										className="w-[50px] h-[50px] bg-[#3a3a3a] rounded-full"
									/>
								)}
								<div className="flex flex-col">
									<div className="text-[22px] font-bold">
										{local.openedAirdrop.name}
									</div>
									<div className="flex gap-2 items-center">
										<div className="bg-[#189A4C] px-3 p-1 rounded-full">
											{local.openedAirdrop.active && "Active"}
										</div>
										<div className="border rounded-full border-[#3A3A3A] px-3 p-1">
											{local.openedAirdrop.blockchain}
										</div>
									</div>
								</div>
							</div>
							<div className="bg-[#232323] w-full p-4">
								<div className="text-sm text-white/70 font-light">
									{local.openedAirdrop.description}
								</div>
							</div>
							<div className="bg-[#191919] w-full p-4">
								<div className="font-bold text-[20px]">Conditions</div>
								{local.openedAirdrop.conditions
									.split("\n")
									.map((condition, index) => {
										return (
											<div
												key={index}
												className="flex items-center w-full gap-2 text-white/60 text-[12px]"
											>
												<div className="w-[8px] h-[8px] bg-[#189A4C] rounded-full"></div>
												{condition}
											</div>
										)
									})}
							</div>
						</div>
						<div className="text-[20px] tracking-tighter relative font-bold overflow-hidden bg-[#191919] rounded-[20px] flex flex-col items-center justify-center w-full p-4">
							{Array.from({ length: 15 }).map((_, index) => (
								<div
									key={index}
									className="absolute w-[18px] h-[18px]"
									style={{
										top: `${Math.floor(index / 5) * 31 + 9}%`,
										left: `${(index % 5) * 20 + 7}%`,
										transform: `translateX(${
											(index + 1) *
											(Math.random() * 2.5) *
											(Math.random() * 2.5)
										}px) `,
									}}
								>
									<Icons name="Pepe" />
								</div>
							))}
							<div className="z-20 flex flex-col items-center">
								<p>Remaining Time</p>
								<p>
									96 hours
									{/* TODO: make it work */}
									{/* {Math.ceil(
																	(openedAirdrop.activeUntil.getTime() -
																		new Date().getTime()) /
																		(1000 * 60 * 60)
																)}{" "}
																hours */}
								</p>
							</div>
						</div>
						{local.openedAirdrop.actionUrl && (
							<button
								className={
									local.walletConnected
										? `rounded-full w-full p-4 text-[18px] mt-[20px] bg-[#23C463]`
										: `rounded-full w-full p-4 text-[18px] mt-[20px] bg-gray cursor-not-allowed`
								}
								onClick={() => {
									if (!local.walletConnected) return
									if (local.openedAirdrop) {
										utils.openTelegramLink(local.openedAirdrop.actionUrl)
									}
								}}
							>
								Action
							</button>
						)}
						{!local.walletConnected && (
							<div>Connect wallet to participate in Airdrop</div>
						)}
					</div>
				</>
			)}
		</>
	)
}
