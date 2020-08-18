import { graphql, PageProps } from "gatsby"
import React, { FC } from "react"
import styled from "styled-components"
import { GatsbyImage } from "../../@types/childImageSharp"
import { Meta } from "../../@types/content/meta"
import AuthorFeaturette from "../components/features/AuthorFeaturette"
import BlogPreview from "../components/BlogPreview"
import Featured from "../components/Featured/Featured"
import Image from "../components/image"
import Layout from "../components/layout"
import NewsLetterForm from "../components/newsletter"
import { Container, Demo, Row } from "../components/Primitives"
import SEO from "../components/SEO/SEO"
import { CoachingHighlight } from "../components/coaching/CoachingHighlight"
import { SyncFeatures } from "../components/features/SyncFeatures"
import { DataDrivenDemo } from "../components/features/DataDriven"
import {
  Link,
  Trans,
  useTranslation,
  useI18next,
} from "gatsby-plugin-react-i18next"
import { P } from "../components/Html/HtmlContent"

type Props = {
  wce: GatsbyImage
  indexMeta: GatsbyImage
  datasources: GatsbyImage
  lessons: GatsbyImage
  cover: GatsbyImage
  data: GatsbyImage
  dataJson: Meta
}

const IndexPage: FC<PageProps<Props>> = ({
  location: { pathname },
  data: { indexMeta, datasources, lessons, cover, data },
}) => {
  const { t } = useTranslation()

  return (
    <Layout>
      <SEO
        title={t("INDEX.TITLE")}
        pathName={pathname}
        description={t("INDEX.INTRODUCTION")}
        staticImage={true}
        image={indexMeta.childImageSharp.fixed.src}
        canonical={pathname}
      />

      <div className={"page-header home"}>
        <HeroMessage>{t("INDEX.TITLE")}</HeroMessage>
        <Container>
          <HeroContentWrap>
            <P>{t("INDEX.INTRODUCTION")}</P>
          </HeroContentWrap>
        </Container>
        <HeroImg>
          <NewImage
            alt={"Nyxo Dashboard and phone"}
            path={cover.childImageSharp.fluid}
          />
        </HeroImg>
      </div>

      <Featured />
      <CoachingHighlight />

      <IndexContainer>
        <div className={"features"}>
          <SyncFeatures />
          <DataDrivenDemo />
          <AuthorFeaturette />

          <div className={"feature__item"}>
            <div className={"row"}>
              <div className="col-6 first">
                <div className={"thumbnail"}>
                  <Image
                    alt="Nyxo data sources"
                    path={data.childImageSharp.fluid}
                  />
                </div>
              </div>
              <div className={"col-6"}>
                <div className={"feature__content"}>
                  <FeaturesHeroText>{t("INDEX.EASE_OF_USE")}</FeaturesHeroText>
                  <P>{t("INDEX.EASE_OF_USE_TEXT")}</P>
                </div>
              </div>
            </div>
          </div>
          <div className={"feature__item"}>
            <div className={"row"}>
              <div className={"col-6"}>
                <div className={"feature__content"}>
                  <FeaturesHeroText>{t("INDEX.DATA")}</FeaturesHeroText>
                  <P>{t("INDEX.DATA_TEXT")}</P>
                </div>
              </div>

              <div className="col-6 first">
                <div className={"thumbnail"}>
                  <Image
                    alt="Nyxo data sources"
                    path={lessons.childImageSharp.fluid}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={"feature__item"}>
            <div className={"row"}>
              <div className="col-6 first">
                <div className={"thumbnail"}>
                  <Image
                    alt="Nyxo data sources"
                    path={datasources.childImageSharp.fluid}
                  />
                </div>
              </div>

              <div className={"col-6"}>
                <div className={"feature__content"}>
                  <FeaturesHeroText>
                    {t("INDEX.ORGANIZATIONS")}
                  </FeaturesHeroText>
                  <P>{t("INDEX.ORGANIZATIONS_TEXT")}</P>

                  <Demo
                    rel="noopener"
                    href="https://calendly.com/nyxo"
                    target="_blank">
                    {t("FOR_ORGANIZATIONS.DEMO_BUTTON")}
                  </Demo>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IndexContainer>

      <BlogPreview />

      <NewsLetterForm />
    </Layout>
  )
}

export default IndexPage

const HeroMessage = styled.h1`
  @media screen and (max-width: 768px) {
    font-size: 42px;
    font-weight: 700;
    line-height: 54px;
  }
`

const HeroImg = styled.div`
  width: 80%;
  margin: auto;
  position: relative;
`

const NewImage = styled(Image)`
  position: relative;
  overflow: visible;
`

const FeaturesHeroText = styled.h2`
  font-size: 36px;
  font-weight: 600;
  line-height: 45px;

  @media screen and (max-width: 768px) {
    font-size: 32px;
    font-weight: 700;
    line-height: 45px;
  }
`

const IndexContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 0rem 2rem;
  margin: 0px auto;
  padding: 0rem 2rem;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 0rem 1rem;
    margin: auto;
  }
`

const HeroContentWrap = styled.div`
  width: 70%;
  margin: auto;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`

export const pageQuery = graphql`
  query IndexPageQuery {
    indexMeta: file(name: { regex: "/Index/" }) {
      childImageSharp {
        fixed(width: 800, quality: 75) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }

    cover: file(relativePath: { eq: "cover.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    datasources: file(relativePath: { eq: "datasources.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }

    lessons: file(relativePath: { eq: "lessons.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }

    data: file(relativePath: { eq: "data.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`
