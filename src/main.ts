import express from "express"
import 'dotenv/config'

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const PER_PAGE = 30

/**
 * Requesting a set of images from a collection at unsplash
 * @param id The id of the collection
 * @param page for pagination
 * @returns images in the collection
 */
const fetchCollection = async (id: string, page: number = 0) => {
	const req = await fetch(`https://api.unsplash.com/collections/${id}/photos?client_id=${process.env.UNSPLASH_ACCESS}&per_page=${PER_PAGE}&page=${page}`)
	const json = await req.json()

	return json as any[]
}

(async () => {
	const app = express()

	app.get("/api/v1/image", async (request, response) => {
		const firstInitial = request.query.first as string | undefined
		const secondInitial = request.query.second as string | undefined

		if (!firstInitial || !secondInitial)
			return response.status(403).send("Bad Request: Please provide first and second initial by query")

		if (firstInitial.length !== 1 || secondInitial.length !== 1)
			return response.status(403).send("Bad Request: Initials can only be 1 character long.")

		const validatedFirstInital = firstInitial.trim().toLowerCase()
		const validatedSecondInital = secondInitial.trim().toLowerCase()

		if (!ALPHABET.includes(validatedFirstInital) || !ALPHABET.includes(validatedSecondInital))
			return response.status(403).send("Bad Request: Initials may only use characters from the latin alphabet (a-z)")

		const imageIndex = ALPHABET.indexOf(validatedFirstInital) * ALPHABET.indexOf(validatedSecondInital)

		// Requesting the image from unsplash
		const collection = await fetchCollection("4760062", Math.floor((imageIndex) / PER_PAGE))
		const image = collection[Math.abs((imageIndex) % PER_PAGE)]

		return response.json({ raw: image.urls.raw, alt: image.alt_description, width: image.width, height: image.height })
	})

	app.listen(3000)
})().then(_ => {
	/* */
})