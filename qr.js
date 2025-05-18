const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Toxic_Tech,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("baileys-elite");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function Toxic_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Toxic_Tech = Toxic_Tech({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Toxic_Tech.ev.on('creds.update', saveCreds)
			Qr_Code_By_Toxic_Tech.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Toxic_Tech.sendMessage(Qr_Code_By_Toxic_Tech.user.id, { text: '' + b64data });
	
				   let Toxic_MD_TEXT = `
𝙎𝙀𝙎𝙎𝙄𝙊𝙉 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘿*
 *𝗧𝗜𝗠𝗡𝗔𝗦𝗔 𝗠𝗗 𝗟𝗢𝗚𝗚𝗘𝗗* 
______________________________
╔════◇
『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••』
║❍ 𝐎𝐰𝐧𝐞𝐫: _https://wa.me/255784766591_
║❍ 𝐑𝐞𝐩𝐨: _https://github.com/Next5x/TIMNASA_TMD1
║❍ 𝐖𝐚𝐆𝐫𝐨𝐮𝐩: _https://chat.whatsapp.com/JazGLNBxW5XDVEst3PN4kj
║❍ 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥: _https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31
║❍ 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦: _https://youtube.com/shorts/wWR5a5lmeT0?si=vzbo0itkKcJsrlYF

Msisahau  ku *like✓* *comment✓* na *subsclible✓*
Asanten🙏

How to send and receive money any country Through your SIM CARD
> timnasa-tech
______________________________
Don't Forget To Give Star⭐ To My Repo`
	 await Qr_Code_By_Toxic_Tech.sendMessage(Qr_Code_By_Toxic_Tech.user.id,{text:Toxic_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Toxic_Tech.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					Toxic_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await Toxic_MD_QR_CODE()
});
module.exports = router
