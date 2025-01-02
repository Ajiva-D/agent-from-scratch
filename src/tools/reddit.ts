import type { ToolFn } from '../../types'
import { z } from 'zod'
import fetch from 'node-fetch'

export const redditToolDefinition = {
  name: 'reddit',
  parameters: z.object({}),
  description: 'get latest posts from Reddit',
}

type Args = z.infer<typeof redditToolDefinition.parameters>

export const reddit: ToolFn<Args, string> = async ({ toolArgs }) => {
  const res = await fetch('https://www.reddit.com/r/nba/.json')
  const { data } = await res.json()
  const relevantInfo = data.children.map((post: any) => ({
    title: post.data.title,
    link: post.data.link,
    subreddit: post.data.subreddit_name_prefixed,
    author: post.data.author,
    upvotes: post.data.ups,
  }))
  return JSON.stringify(relevantInfo, null, 2)
}
