
let txmlp =[]
for (let i = 0; i <= 4; ++i) txmlp.push(i)
for (let i = 97; i <= 100; ++i) txmlp.push(Buffer.of(i).toString())
for (let i = 65; i <= 68; ++i) txmlp.push(Buffer.of(i).toString())
/**
 * encrypt data using SHA256 passcode
 * @param {string} data data need to be encrypt
 * @param {string} passcode password code which was hashed
 */
function ex_encrypt(data, passcode = '') {
	let index = 0, tmp = '', dy =''
	let buffer = Buffer.from(data), code = Buffer.from(passcode)
	for (let i = 0; i < buffer.length; ++i) {
		if (index >= code.length) index = 0
		buffer[i] += code[index]
		tmp = ''
		for (let j = 0; j <= 3; ++j) {
			tmp += txmlp[buffer[i] % 13]
			buffer[i] /= 13 
		}
		dy += tmp
		++i
	}
	return dy
}

module.exports = {
	
}