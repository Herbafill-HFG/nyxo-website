import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer"
import { GatsbyNode } from "gatsby"

export const onCreateNode: GatsbyNode["onCreateNode"] = async ({
  node,
  loadNodeContent,
  actions,
}) => {
  const { internal } = node
  const { owner, mediaType } = internal
  if (mediaType !== "text/richtext" || owner !== "gatsby-source-contentful") {
    return
  }
  const doc = JSON.parse(await loadNodeContent(node))
  const text = documentToPlainTextString(doc)
  const result = text.slice(0, 140)
  actions.createNodeField({ node, name: "excerpt", value: result })
}
