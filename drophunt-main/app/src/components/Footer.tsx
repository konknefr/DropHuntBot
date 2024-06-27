import { useUtils } from "@tma.js/sdk-react"
import { icons } from "../pages/joinCommunity"

export default function Footer() {
	const utils = useUtils()
	return (
		<>
			<div className="w-full h-full px-5 py-8 flex flex-col gap-[18px] bg-[#191919]">
				<div className="flex space-x-25 justify-between">
					<div className="flex flex-col space-y-3">
						<h1 className="text-[18px] text-white headerFont">About</h1>
						<div className="text-white/70 space-y-3 text-[12px] text-nowrap">
							<p>Learn more about us</p>
							<p>What is PEPE</p>
							<p>Terms and Conditions</p>
						</div>
					</div>
					<div className="flex flex-col space-y-3 text-nowrap">
						<h1 className="text-[18px] text-white headerFont">Docs</h1>
						<div className="text-white/70 space-y-3 text-[12px]">
							<p>Documentation and Guides</p>
							<p>FAQ</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col space-y-4">
					<h1 className="text-[18px] text-white headerFont">
						Join our community
					</h1>
					<div className="flex flex-row space-x-5 items-center">
						<button
							onClick={() => {
								utils.openTelegramLink("https://t.me/drophunt")
							}}
						>
							<icons.TelegramSvg />
						</button>
						<icons.BotSvg />
					</div>
				</div>
			</div>
		</>
	)
}
