import fetch from 'node-fetch'

export default async (req, res) => {
	fetch('https://fetch-hiring.s3.amazonaws.com/hiring.json').then(response => response.json()).then(data => {
		res.status(200).json(data)
	})
}