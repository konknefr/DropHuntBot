import { useProxy } from "valtio/utils"
import { HomeRouteState } from "../routes/HomeRoute"
import Icons from "./Icons"
import AirdropComponent from "./AirdropComponent"
import { BlockchainLogoKey } from "@/types"
import { onClickWithoutBubblingToTheParentOnClicks } from "@/utils"

export default function AirdropsPage() {
	const local = useProxy(HomeRouteState)
	return (
		<>
			<div className="flex flex-col gap-[12px]">
				<div
					className="font-bold text-[18px]"
					style={{
						fontFamily: "Dela Gothic One",
					}}
				>
					Airdrops
				</div>
				<div className="flex items-center justify-between">
					<>
						{local.openFilterMenu ? (
							<div
								onClick={() => {
									local.openFilterMenu = false
								}}
								className="fixed top-0 left-0 w-screen h-screen bg-black/80"
							></div>
						) : null}
						<div
							onClick={() => {
								local.openFilterMenu = !local.openFilterMenu
							}}
							className="flex gap-2 items-center justify-center border rounded-full border-[#3A3A3A] py-[10px] px-[14px] relative"
						>
							{local.activeFilters.length === 0 && (
								<div className="bg-[#189A4C] rounded-full h-[16px] w-[16px]"></div>
							)}
							{local.activeFilters.length > 0 &&
								local.activeFilters.map((filter, index) => {
									return (
										<img
											key={index}
											style={{
												width: "15px",
												height: "15px",
											}}
											src={
												local.blockchainLogos[
													filter as keyof typeof local.blockchainLogos
												]
											}
										/>
									)
								})}

							{local.activeFilters.length === 0
								? "All"
								: local.activeFilters[0]}
							{local.activeFilters.length > 1 && ", ..."}
							<Icons name="ArrowDown" size={[20, 20]} />
							{local.openFilterMenu ? (
								<div
									onClick={(e) => {
										onClickWithoutBubblingToTheParentOnClicks(e)
									}}
									className="absolute top-[120%] left-0 flex flex-col gap-4 bg-[#191919] rounded-[12px] min-w-[240px] pb-[10px] px-[10px] pt-[10px]"
								>
									<div className="flex flex-col gap-1">
										<div
											onClick={() => {
												local.activeFilters = []
											}}
											className="w-full flex items-center justify-between hover:bg-neutral-800 rounded-md px-4 p-2"
										>
											All
											<div
												className={`w-[16px] h-[16px] flex items-center justify-center rounded-[1px] ${
													local.activeFilters.length === 0
														? "bg-green-500"
														: "bg-white"
												}`}
											></div>
										</div>
										{local.availableFilterOptions.map((filterOption, index) => {
											return (
												<div key={index} className="flex items-center">
													<img
														src={
															local.blockchainLogos[
																filterOption as BlockchainLogoKey
															]
														}
														style={{
															width: "15px",
															height: "15px",
														}}
													/>
													<div
														key={index}
														onClick={() => {
															if (local.activeFilters.includes(filterOption)) {
																local.activeFilters =
																	local.activeFilters.filter((f) => {
																		return f !== filterOption
																	})
															} else {
																local.activeFilters = [
																	...local.activeFilters,
																	filterOption,
																]
															}
														}}
														className="w-full flex items-center justify-between hover:bg-neutral-800 rounded-md px-4 p-2"
													>
														{filterOption}
														<div
															className={`w-[16px] h-[16px] flex items-center justify-center rounded-[1px] ${
																local.activeFilters.includes(filterOption)
																	? "bg-green-500"
																	: "bg-white"
															}`}
														></div>
													</div>
												</div>
											)
										})}
									</div>
									<div className="flex items-center justify-between">
										<button
											onClick={() => {
												local.activeFilters = ["All"]
											}}
											className="border border-[#3A3A3A] rounded-full px-5 p-[6px]"
										>
											Reset
										</button>
										<button
											className="bg-[#189a4c] rounded-full px-6 p-[6px]"
											onClick={() => {
												local.openFilterMenu = false
											}}
										>
											Confirm
										</button>
									</div>
								</div>
							) : null}
						</div>
					</>

					<div className="">
						{/* Pepe Users: <span className="font-light text-white/60"></span> */}
					</div>
				</div>
				<div className=" flex flex-col gap-[10px]">
					{local.airdrops.map((airdrop, index) => {
						if (airdrop.active === false) return
						if (
							local.activeFilters.length > 0 &&
							!local.activeFilters.includes(airdrop.blockchain)
						) {
							return <></>
						}
						return (
							<div key={index}>
								<AirdropComponent airdrop={airdrop} />
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}
