import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'TellATale',
  description: 'TellATale is your go-to entertainment & lifestyle news website.We provide you with the latest breaking news, gossip and videos straight from the industry.',
  keywords: 'circulator, gossip, gossiper, newsmonger, quidnunc, tale-teller, talebearer, telltale, yenta,betrayer, blabbermouth, informant, informer, snitcher, squealer, stool pigeon, tattler, tattletale,libeler, scandalmonger'
}

export default Meta
