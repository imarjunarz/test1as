/* Copyright (C) 2021 Vai838.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsenaDuplicated
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
/*const got = require('got');
const fs = require('fs');*/
const axios = require('axios');

const Language = require('../language');
const Lang = Language.getString('weather');
const { errorMessage, infoMessage } = require('../helpers');

/*Asena.addCommand({pattern: 'song ?(.*)', fromMe: false}, async (message, match) => {
	if (match[1] === '') return await message.reply(Lang.NEED_SONG);
	const url = `https://tobz-api.herokuapp.com/api/joox?q=${match[1]}&apikey=BotWeA`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*🎼 ' + Lang.SONG +':* ```' + match[1] + '```\n\n' +
		'*🎧 ' + Lang.ALBUM +':* ```' + json.result.album + '```\n' + 
		'*🔊 ' + Lang.TITLE +':* ```' + json.result.judul + '```\n' +
		'*🎚️ ' + Lang.PUBLICATION +':* ```' + json.result.dipublikasi + '```\n' + 
		'*🎙️ ' + Lang.SONGL +':* ```' + json.result.mp3 + '```\n' , MessageType.text);
		
		return await message.sendMessage(from,await getBuffer(`json.result.mp3`, {method: 'get'})  , MessageType.audio, {quoted: mek, mimetype: Mimetype.mp4audio, ptt: true});
    
	} catch {
		return await message.client.sendMessage(message.jid, Lang.NOT_FOUNDS, MessageType.text);
	}
});


Asena.addCommand({pattern: 'psong ?(.*)', fromMe: true }, async (message, match) => {
	if (match[1] === '') return await message.reply(Lang.NEED_SONG);
	const url = `https://tobz-api.herokuapp.com/api/joox?q=${match[1]}&apikey=BotWeA`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*🎼 ' + Lang.SONG +':* ```' + match[1] + '```\n\n' +
		'*🎧 ' + Lang.ALBUM +':* ```' + json.result.album + '```\n' + 
		'*🔊 ' + Lang.TITLE +':* ```' + json.result.judul + '```\n' +
		'*🎚️ ' + Lang.PUBLICATION +':* ```' + json.result.dipublikasi + '```\n' + 
		'*🎙️ ' + Lang.SONGL +':* ```' + json.result.mp3 + '```\n' , MessageType.text);
		
		return await message.sendMessage(json.result.mp3 , MessageType.audio, {mimetype: Mimetype.mp4audio, ptt: true});
    
	} catch {
		return await message.client.sendMessage(message.jid, Lang.NOT_FOUNDS, MessageType.text);
	}
});*/

Asena.addCommand({ pattern: 'pinsta ?(.*)', fromMe: false, desc: Lang.IGTVDESC }, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORDIGTV))

    await message.sendMessage(infoMessage(Lang.LOADINGTV))

    await axios
      .get(`https://api-anoncybfakeplayer.herokuapp.com/igdown?url=${userName}`)
      .then(async (response) => {
        const {
          url,
          type,
        } = response.data.result[0]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `
        *${Lang.VID}*: ${type}`

        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUNDIG)),
      )
  },
)


Asena.addCommand({ pattern: 'vinsta ?(.*)', fromMe: false, desc: Lang.IGDESC }, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORDIG))

    await message.sendMessage(infoMessage(Lang.LOADINGTV))

    await axios
      .get(`https://api-anoncybfakeplayer.herokuapp.com/igdown?url=${userName}`)
      .then(async (response) => {
        const {
          url,
	type,	
        } = response.data.result[0]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `*${Lang.VID}*: ${type}`

        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUNDIG )),
      )
  },
)

Asena.addCommand({ pattern: 'vfb ?(.*)', fromMe: false, desc: Lang.FBDESC }, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORDFB))

    await message.sendMessage(infoMessage(Lang.LOADINGTV))

    await axios
      .get(`https://scrap.terhambar.com/fb?link=${userName}`)
      .then(async (response) => {
        const {
          title,
          linkVideo.sdQuality,
        } = response.data.result

        const profileBuffer = await axios.get(linkVideo.sdQuality, {responseType: 'arraybuffer'})

        const msg = `*${Lang.CAPTION}*: ${title}`

        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUNDFB )),
      )
  },
)

Asena.addCommand({ pattern: 'mp3yt ?(.*)', fromMe: false, desc: "Try this if .song is not giving results.\n Works for youtube links only"}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("Need a yt link"))

    await message.sendMessage(infoMessage("Loading..."))

    await axios
      .get(`https://api-anoncybfakeplayer.herokuapp.com/ytmp3?url=${userName}`)
      .then(async (response) => {
        const {
          url,
          filesize,
	  quality,	
        } = response.data.result[0]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `*${"quality"}*: ${quality}\n*${"file size"}*: ${filesize}`
	    
        await message.sendMessage(msg)
        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.audio, {
         quoted : message.data
        })
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("Song Not Found!" )),
      )
  },
)

Asena.addCommand({ pattern: 'mp4yt ?(.*)', fromMe: false , desc: "Use this if .videos is not working. Provide the youtube link "}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("Provide the video"))

    await message.sendMessage(infoMessage("Loading..."))

  await axios
      .get(`https://api-anoncybfakeplayer.herokuapp.com/ytmp4?url=${userName}`)
      .then(async (response) => {
        const {
          quality,
          url,	
        } = response.data.result[2]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `*${"Quality"}*: ${quality}`
	    

        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("Not Found" )),
      )
  },
)
