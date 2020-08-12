import { graphql, useStaticQuery } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import React, { FC } from "react"
import styled from "styled-components"
import { ContentfulHabit } from "../../../graphql-types"
import { getLocalizedPath } from "../../Helpers/i18n-helpers"
import { H3 } from "../Html/HtmlContent"
import { P } from "../Primitives"
import HabitCard from "./HabitCard"

type Props = {
  locale: string
}

const HabitHighlights: FC<Props> = ({ locale }) => {
  const { habits } = useStaticQuery(graphql`
    {
      habits: allContentfulHabit(
        filter: { node_locale: { eq: "en-US" } }
        limit: 8
      ) {
        edges {
          node {
            title
            slug
            period
            description {
              fields {
                excerpt
              }
            }
          }
        }
      }
    }
  `)
  const { t } = useTranslation()

  return (
    <Container>
      <H3>{t("COACHING.AUTHORS")}</H3>
      <P>{t("COACHING.HABITS_TEXT")}</P>

      <Habits>
        {habits.edges.map(({ node }: { node: ContentfulHabit }) => (
          <HabitCard
            link
            key={node.slug as string}
            period={node.period}
            title={node.title}
            slug={getLocalizedPath(`/habit/${node.slug}`, locale)}
            excerpt={node.description?.fields?.excerpt}
          />
        ))}
      </Habits>
    </Container>
  )
}

export default HabitHighlights

const Container = styled.div`
  margin: 10rem 0rem;
`

const Habits = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -0.5rem;
`
