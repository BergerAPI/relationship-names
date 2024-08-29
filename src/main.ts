import 'dotenv/config'

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const FIRST = ALPHABET.indexOf("n")
const SECOND = ALPHABET.indexOf("l")

const fetchCollection = async (id: string, page: number = 0) => {
	const req = await fetch(`https://api.unsplash.com/collections/${id}/photos?client_id=${process.env.UNSPLASH_ACCESS}&per_page=30&page=${page}`)
	const json = await req.json()

	return json as any[]
}

(async () => {
	const collection = await fetchCollection("4760062", Math.floor((FIRST * SECOND) / 30))

	const image = collection[Math.abs((FIRST * SECOND) % 30)]

	console.log(image.urls.raw)
})().then(_ => {
	/* */
})