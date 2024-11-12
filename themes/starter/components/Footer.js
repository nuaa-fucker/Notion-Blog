import { siteConfig } from '@/lib/config'
import SocialButton from '@/themes/fukasawa/components/SocialButton'
import { Logo } from './Logo'
import { SVGFooterCircleBG } from './svg/SVGFooterCircleBG'

/* eslint-disable @next/next/no-img-element */
export const Footer = props => {
  const footerPostCount = siteConfig('STARTER_FOOTER_POST_COUNT', 2)
  const latestPosts = props?.latestPosts
    ? props?.latestPosts.slice(0, footerPostCount)
    : []
  const STARTER_FOOTER_LINK_GROUP = siteConfig('STARTER_FOOTER_LINK_GROUP', [])
  return (
    <>
      {/* <!-- ====== Footer Section Start --> */}
      <footer
        className='wow fadeInUp relative z-10 bg-[#090E34] pt-20 lg:pt-[100px]'
        data-wow-delay='.15s'>
      </footer>
      {/* <!-- ====== Footer Section End --> */}
    </>
  )
}
