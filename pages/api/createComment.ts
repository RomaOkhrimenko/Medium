// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'
const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: "8ztycusq",
    useCdn: process.env.NODE_ENV === "production",
    token: 'sku39DYNzYIqNWTaYk4W1o0eRhz6IXMZhnxMtDsIv8j1VOKINgZFDgncaequ5TSxjJ7qkLcuRvUnR9ND2WEe1TNriyEtap91XBr6JakBl6iM6xAEYRlC5cv21l2JBGafqGmO3dP5Rx69f3EjiHNsIjJpf1VeSHkjBzI9XWS5AaH0Hx7yrDNq'
}

const client = sanityClient(config)

export default async function createComment(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {_id, name, email, comment} = JSON.parse(req.body)

    try {
        await client.create({
            _type: 'comment',
            post: {
                _type: 'reference',
                _ref: _id
            },
            name,
            email,
            comment,
        })
    }catch (error) {
        return res.status(500).json({ message: `Couldn't submit comment`, error})
    }

    res.status(200).json({ message: "Comment submitted" })
}
