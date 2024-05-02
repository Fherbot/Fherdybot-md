import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
let name = await conn.getName(who)
const nomorown = "573012482597"

  await sendContactArray(conn, m.chat, [
    [`${nomorown}`, `${await conn.getName(nomorown+'@s.whatsapp.net')}`, `© Devolper Owner`, `Creador oficial`, `argumedod44@gmail.com`, `🇨🇴 Colombia`, `📍 https://github.com/Diego-YL-177`, `👤  Owner Bot`],
    [`${conn.user.jid.split('@')[0]}`, `${await conn.getName(conn.user.jid)}`, `🌩 Yotsuba-Nakano-MD`, `📵 No hagas Spam`, `Nothing`, `🇨🇴 Colombia`, `📍 https://github.com/Diego-YL-177/Yotsuba-Nakano-MD`, `Esta Cuenta Es Bot 🌳`]
  ], m)
  //m.reply(`Hola @${m.sender.split(`@`)[0]} este es el contacto de mi creadora, no hagas spam!!`)
  } 

handler.help = ["creador","owner"]
handler.tags = ["owner"]
handler.command = /^(owner|creador)$/i
export default handler

async function sendContactArray(conn, jid, data, quoted, options) {
        if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
                let contacts = []
        for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
            number = number.replace(/[^0-9]/g, '')
            let njid = number + '@s.whatsapp.net'
            let biz = await conn.getBusinessProfile(njid).catch(_ => null) || {}
            // N:;${name.replace(/\n/g, '\\n').split(' ').reverse().join(';')};;;
            let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${isi}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${isi1}
item2.EMAIL;type=INTERNET:${isi2}
item2.X-ABLabel:📧 Email
item3.ADR:;;${isi3};;;;
item3.X-ABADR:ac
item3.X-ABLabel:📍 Region
item4.URL:${isi4}
item4.X-ABLabel:Website
item5.X-ABLabel:${isi5}
END:VCARD`.trim()
            contacts.push({ vcard, displayName: name })
        }
        return await conn.sendMessage(jid, {
            contacts: {
                displayName: (contacts.length > 1 ? `2013 kontak` : contacts[0].displayName) || null,
                contacts,
            }
        },
        {
            quoted,
            ...options
        })
        }