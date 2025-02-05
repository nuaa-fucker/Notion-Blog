import { siteConfig } from '@/lib/config'
import { convertInnerUrl } from '@/lib/notion/convertInnerUrl'
import { isBrowser, loadExternalResource } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { GlobalStyle } from './GlobalStyle'
import { initGoogleAdsense } from './GoogleAdsense'

import Head from 'next/head'
import ExternalScript from './ExternalScript'
import WebWhiz from './Webwhiz'

/**
 * 各种插件脚本
 * @param {*} props
 * @returns
 */
const ExternalPlugin = props => {
  const DISABLE_PLUGIN = siteConfig('DISABLE_PLUGIN')
  const THEME_SWITCH = siteConfig('THEME_SWITCH')
  const DEBUG = siteConfig('DEBUG')
  const ANALYTICS_ACKEE_TRACKER = siteConfig('ANALYTICS_ACKEE_TRACKER')
  const ANALYTICS_VERCEL = siteConfig('ANALYTICS_VERCEL')
  const ANALYTICS_BUSUANZI_ENABLE = siteConfig('ANALYTICS_BUSUANZI_ENABLE')
  const ADSENSE_GOOGLE_ID = siteConfig('ADSENSE_GOOGLE_ID')
  const FACEBOOK_APP_ID = siteConfig('FACEBOOK_APP_ID')
  const FACEBOOK_PAGE_ID = siteConfig('FACEBOOK_PAGE_ID')
  const FIREWORKS = siteConfig('FIREWORKS')
  const SAKURA = siteConfig('SAKURA')
  const STARRY_SKY = siteConfig('STARRY_SKY')
  const MUSIC_PLAYER = siteConfig('MUSIC_PLAYER')
  const NEST = siteConfig('NEST')
  const FLUTTERINGRIBBON = siteConfig('FLUTTERINGRIBBON')
  const COMMENT_TWIKOO_COUNT_ENABLE = siteConfig('COMMENT_TWIKOO_COUNT_ENABLE')
  const RIBBON = siteConfig('RIBBON')
  const CUSTOM_RIGHT_CLICK_CONTEXT_MENU = siteConfig(
    'CUSTOM_RIGHT_CLICK_CONTEXT_MENU'
  )
  const CAN_COPY = siteConfig('CAN_COPY')
  const WEB_WHIZ_ENABLED = siteConfig('WEB_WHIZ_ENABLED')
  const AD_WWADS_BLOCK_DETECT = siteConfig('AD_WWADS_BLOCK_DETECT')
  const CHATBASE_ID = siteConfig('CHATBASE_ID')
  const COMMENT_DAO_VOICE_ID = siteConfig('COMMENT_DAO_VOICE_ID')
  const AD_WWADS_ID = siteConfig('AD_WWADS_ID')
  const COMMENT_ARTALK_SERVER = siteConfig('COMMENT_ARTALK_SERVER')
  const COMMENT_ARTALK_JS = siteConfig('COMMENT_ARTALK_JS')
  const COMMENT_TIDIO_ID = siteConfig('COMMENT_TIDIO_ID')
  const COMMENT_GITTER_ROOM = siteConfig('COMMENT_GITTER_ROOM')
  const ANALYTICS_BAIDU_ID = siteConfig('ANALYTICS_BAIDU_ID')
  const ANALYTICS_CNZZ_ID = siteConfig('ANALYTICS_CNZZ_ID')
  const ANALYTICS_GOOGLE_ID = siteConfig('ANALYTICS_GOOGLE_ID')
  const MATOMO_HOST_URL = siteConfig('MATOMO_HOST_URL')
  const MATOMO_SITE_ID = siteConfig('MATOMO_SITE_ID')
  const ANALYTICS_51LA_ID = siteConfig('ANALYTICS_51LA_ID')
  const ANALYTICS_51LA_CK = siteConfig('ANALYTICS_51LA_CK')
  const DIFY_CHATBOT_ENABLED = siteConfig('DIFY_CHATBOT_ENABLED')
  const TIANLI_KEY = siteConfig('TianliGPT_KEY')
  const GLOBAL_JS = siteConfig('GLOBAL_JS', '')
  const CLARITY_ID = siteConfig('CLARITY_ID')
  const IMG_SHADOW = siteConfig('IMG_SHADOW')
  const ANIMATE_CSS_URL = siteConfig('ANIMATE_CSS_URL')
  const MOUSE_FOLLOW = siteConfig('MOUSE_FOLLOW')
  const CUSTOM_EXTERNAL_CSS = siteConfig('CUSTOM_EXTERNAL_CSS')
  const CUSTOM_EXTERNAL_JS = siteConfig('CUSTOM_EXTERNAL_JS')
  // 默认关闭NProgress
  const ENABLE_NPROGRSS = siteConfig('ENABLE_NPROGRSS', false)
  const COZE_BOT_ID = siteConfig('COZE_BOT_ID')

  // 自定义样式css和js引入
  if (isBrowser) {
    // 初始化AOS动画
    // 静态导入本地自定义样式
    loadExternalResource('/css/custom.css', 'css')
    loadExternalResource('/js/custom.js', 'js')

    // 自动添加图片阴影
    if (IMG_SHADOW) {
      loadExternalResource('/css/img-shadow.css', 'css')
    }

    if (ANIMATE_CSS_URL) {
      loadExternalResource(ANIMATE_CSS_URL, 'css')
    }

    // 导入外部自定义脚本
    if (CUSTOM_EXTERNAL_JS && CUSTOM_EXTERNAL_JS.length > 0) {
      for (const url of CUSTOM_EXTERNAL_JS) {
        loadExternalResource(url, 'js')
      }
    }

    // 导入外部自定义样式
    if (CUSTOM_EXTERNAL_CSS && CUSTOM_EXTERNAL_CSS.length > 0) {
      for (const url of CUSTOM_EXTERNAL_CSS) {
        loadExternalResource(url, 'css')
      }
    }
  }

  const router = useRouter()
  useEffect(() => {
    // 异步渲染谷歌广告
    if (ADSENSE_GOOGLE_ID) {
      setTimeout(() => {
        initGoogleAdsense(ADSENSE_GOOGLE_ID)
      }, 3000)
    }

    setTimeout(() => {
      // 映射url
      convertInnerUrl(props?.allNavPages)
    }, 500)
  }, [router])

  useEffect(() => {
    // 执行注入脚本
    // eslint-disable-next-line no-eval
    eval(GLOBAL_JS)
  }, [])

  if (DISABLE_PLUGIN) {
    return null
  }

  return (
    <>
      {/* 全局样式嵌入 */}
      <GlobalStyle />
      {MOUSE_FOLLOW && <MouseFollow />}
      {THEME_SWITCH && <ThemeSwitch />}
      {DEBUG && <DebugPanel />}
      {ANALYTICS_ACKEE_TRACKER && <Ackee />}
      {ANALYTICS_GOOGLE_ID && <Gtag />}
      {ANALYTICS_VERCEL && <Analytics />}
      {ANALYTICS_BUSUANZI_ENABLE && <Busuanzi />}
      {FACEBOOK_APP_ID && FACEBOOK_PAGE_ID && <Messenger />}
      {FIREWORKS && <Fireworks />}
      {SAKURA && <Sakura />}
      {STARRY_SKY && <StarrySky />}
      {MUSIC_PLAYER && <MusicPlayer />}
      {NEST && <Nest />}
      {FLUTTERINGRIBBON && <FlutteringRibbon />}
      {COMMENT_TWIKOO_COUNT_ENABLE && <TwikooCommentCounter {...props} />}
      {RIBBON && <Ribbon />}
      {DIFY_CHATBOT_ENABLED && <DifyChatbot />}
      {CUSTOM_RIGHT_CLICK_CONTEXT_MENU && <CustomContextMenu {...props} />}
      {!CAN_COPY && <DisableCopy />}
      {WEB_WHIZ_ENABLED && <WebWhiz />}
      {AD_WWADS_BLOCK_DETECT && <AdBlockDetect />}
      {TIANLI_KEY && <TianliGPT />}
      <VConsole />
      {ENABLE_NPROGRSS && <LoadingProgress />}
      <AosAnimation />
      {ANALYTICS_51LA_ID && ANALYTICS_51LA_CK && <LA51 />}
      {COZE_BOT_ID && <Coze />}

      {ANALYTICS_51LA_ID && ANALYTICS_51LA_CK && (
        <>
          <script id='LA_COLLECT' src='//sdk.51.la/js-sdk-pro.min.js' defer />
          {/* <script async dangerouslySetInnerHTML={{
              __html: `
                    LA.init({id:"${ANALYTICS_51LA_ID}",ck:"${ANALYTICS_51LA_CK}",hashMode:true,autoTrack:true})
                    `
            }} /> */}
        </>
      )}

      {CHATBASE_ID && (
        <>
          <script
            id={CHATBASE_ID}
            src='https://www.chatbase.co/embed.min.js'
            defer
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                    window.chatbaseConfig = {
                        chatbotId: "${CHATBASE_ID}",
                        }
                    `
            }}
          />
        </>
      )}

      {CLARITY_ID && (
        <>
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                (function(c, l, a, r, i, t, y) {
                  c[a] = c[a] || function() {
                    (c[a].q = c[a].q || []).push(arguments);
                  };
                  t = l.createElement(r);
                  t.async = 1;
                  t.src = "https://www.clarity.ms/tag/" + i;
                  y = l.getElementsByTagName(r)[0];
                  if (y && y.parentNode) {
                    y.parentNode.insertBefore(t, y);
                  } else {
                    l.head.appendChild(t);
                  }
                })(window, document, "clarity", "script", "${CLARITY_ID}");
                `
            }}
          />
        </>
      )}

      {COMMENT_DAO_VOICE_ID && (
        <>
          {/* DaoVoice 反馈 */}
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                (function(i, s, o, g, r, a, m) {
                  i["DaoVoiceObject"] = r;
                  i[r] = i[r] || function() {
                    (i[r].q = i[r].q || []).push(arguments);
                  };
                  i[r].l = 1 * new Date();
                  a = s.createElement(o);
                  m = s.getElementsByTagName(o)[0];
                  a.async = 1;
                  a.src = g;
                  a.charset = "utf-8";
                  if (m && m.parentNode) {
                    m.parentNode.insertBefore(a, m);
                  } else {
                    s.head.appendChild(a);
                  }
                })(window, document, "script", ('https:' == document.location.protocol ? 'https:' : 'http:') + "//widget.daovoice.io/widget/daf1a94b.js", "daovoice")
                `
            }}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
             daovoice('init', {
                app_id: "${COMMENT_DAO_VOICE_ID}"
              });
              daovoice('update');
              `
            }}
          />
        </>
      )}

      {AD_WWADS_ID && (
        <>
          <Head>
            {/* 提前连接到广告服务器 */}
            <link rel='preconnect' href='https://cdn.wwads.cn' />
          </Head>
          <ExternalScript
            type='text/javascript'
            src='https://cdn.wwads.cn/js/makemoney.js'
          />
        </>
      )}

      {/* {COMMENT_TWIKOO_ENV_ID && <script defer src={COMMENT_TWIKOO_CDN_URL} />} */}

      {COMMENT_ARTALK_SERVER && <script defer src={COMMENT_ARTALK_JS} />}

      {COMMENT_TIDIO_ID && (
        <script async src={`//code.tidio.co/${COMMENT_TIDIO_ID}.js`} />
      )}

      {/* gitter聊天室 */}
      {COMMENT_GITTER_ROOM && (
        <>
          <script
            src='https://sidecar.gitter.im/dist/sidecar.v1.js'
            async
            defer
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
            ((window.gitter = {}).chat = {}).options = {
              room: '${COMMENT_GITTER_ROOM}'
            };
            `
            }}
          />
        </>
      )}

      {/* 百度统计 */}
      {ANALYTICS_BAIDU_ID && (
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?${ANALYTICS_BAIDU_ID}";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
          `
          }}
        />
      )}

      {/* 站长统计 */}
      {ANALYTICS_CNZZ_ID && (
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
          document.write(unescape("%3Cspan style='display:none' id='cnzz_stat_icon_${ANALYTICS_CNZZ_ID}'%3E%3C/span%3E%3Cscript src='https://s9.cnzz.com/z_stat.php%3Fid%3D${ANALYTICS_CNZZ_ID}' type='text/javascript'%3E%3C/script%3E"));
          `
          }}
        />
      )}

      {/* 谷歌统计 */}
      {ANALYTICS_GOOGLE_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_GOOGLE_ID}`}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ANALYTICS_GOOGLE_ID}', {
                  page_path: window.location.pathname,
                });
              `
            }}
          />
        </>
      )}

      {/* Chatbot 嵌入代码 */}
      {(
        <>
          <script
            async
            src="https://nfhiadeo.sealosbja.site/js/iframe.js"
            id="chatbot-iframe"
            data-bot-src="https://nfhiadeo.sealosbja.site/chat/share?shareId=7nwr82lzo4jgsfbh4sayzzg0"
            data-default-open="false"
            data-drag="true"
            data-open-icon="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyBjbGFzcz0iaWNvbiIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMC4wMHB4IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQ4MC4wMiAxMDIwYzAtMTAyLjA2NCA1OS4yMjQtMTg0LjggMTMyLjI3Ni0xODQuOCA3My4wNTIgMCAxMzIuMjcyIDgyLjc0IDEzMi4yNzIgMTg0LjgiIGZpbGw9IiNGOEE0QTciIC8+PHBhdGggZD0iTTc2Mi41OCAxMDIwaC0zNmMwLTkxLjk3Mi01MS4yNjQtMTY2LjgtMTE0LjI3Ni0xNjYuOHMtMTE0LjI3NiA3NC44MjgtMTE0LjI3NiAxNjYuOGgtMzZjMC0xMTEuODI0IDY3LjQxNi0yMDIuOCAxNTAuMjc2LTIwMi44IDgyLjg1NiAwIDE1MC4yNzYgOTAuOTc2IDE1MC4yNzYgMjAyLjh6IiBmaWxsPSIjNkU2RTk2IiAvPjxwYXRoIGQ9Ik0yMTUuNTcyIDEwMjBjMC0xMDIuMDY0IDU5LjIyNC0xODQuOCAxMzIuMjgtMTg0LjggNzMuMDUyIDAgMTMyLjI4IDgyLjc0IDEzMi4yOCAxODQuOCIgZmlsbD0iI0Y4QTRBNyIgLz48cGF0aCBkPSJNNDk4LjEzMiAxMDIwaC0zNmMwLTkxLjk3Mi01MS4yNjQtMTY2LjgtMTE0LjI4LTE2Ni44cy0xMTQuMjggNzQuODI4LTExNC4yOCAxNjYuOGgtMzZjMC0xMTEuODI0IDY3LjQxNi0yMDIuOCAxNTAuMjgtMjAyLjhzMTUwLjI4IDkwLjk3NiAxNTAuMjggMjAyLjh6IiBmaWxsPSIjNkU2RTk2IiAvPjxwYXRoIGQ9Ik01MzggMTAyMHMtMTEuMDgtNjAgNjIuNDYtNzBTNjcwIDEwMjAgNjcwIDEwMjBoNTYuNThzMTkuODM2LTEwMy4wOC00Ny4yMjQtMTM0LjkzNmMwIDAtMTExLjQ0OCA0Ni45MzYtMTgzLjQwNCA0Ni45MzZsLTkuMzg0IDg4SDUzOHpNMzg5Ljc5MiAxMDIwczExLjA4LTYwLTYyLjQ2LTcwUzI1Ny43OTIgMTAyMCAyNTcuNzkyIDEwMjBoLTI4LjU3NnMtMTkuODQtMTAzLjA4IDQ3LjIyLTEzNC45MzZjMCAwIDExMS40NDggNDYuOTM2IDE4My40MDQgNDYuOTM2bDkuMzg0IDg4SDM4OS43OTJ6IiBmaWxsPSIjNkU2RTk2IiAvPjxwYXRoIGQ9Ik0xMjMuMDg0IDQxOS45MzZTMzYuMzggNTMzLjMyIDc0LjE4OCA3MzEuNjZMMjY0IDY4NS45MTZsLTQ0LjQyOC0yMzguMDkyLTk2LjQ4OC0yNy44ODh6IiBmaWxsPSIjQjRCN0M5IiAvPjxwYXRoIGQ9Ik02MC4wNDggNzUzLjU4NGwtMy41MzYtMTguNTZjLTM4Ljg2OC0yMDMuOTEyIDQ4LjUzNi0zMjEuMTQgNTIuMjc2LTMyNi4wMzJsNy40NzYtOS43NzYgMTE4Ljk2OCAzNC4zODggNDkuNTk2IDI2NS44LTIyNC43OCA1NC4xOHogbTcwLjgyLTMxMi42NjRjLTE3LjgxNiAyOS43NDgtNjQuNTEyIDEyNC4zMzYtNDIuMjA4IDI2OC43MzZsMTU0LjUxMi0zNy4yNDQtMzkuMjU2LTIxMC4zODQtNzMuMDQ4LTIxLjEwOHoiIGZpbGw9IiM2RTZFOTYiIC8+PHBhdGggZD0iTTI4NS4yMzIgODE4Ljk0NGMzMS45MjQgMTIuODk2LTM3LjUwNCA1Mi41NTYtNzguOTg0IDU0LjE0LTc1LjU0NCAyLjkwNC0xMzguMjU2LTYwLjQxNi0xNDAuMDU2LTE0MS40MjgtMS44MDgtODEuMDI4IDQxLjE4NC03MC41MiAxMTYuNzM2LTczLjQxNi0wLjAwNCAwLjAwOCAxNS41MzIgMTI1LjY1MiAxMDIuMzA0IDE2MC43MDR6IiBmaWxsPSIjRjhBNEE3IiAvPjxwYXRoIGQ9Ik0yMDEuMjYgODkxLjE4OGMtODMuODQ4IDAtMTUxLjA4NC02OS45LTE1My4wNjgtMTU5LjEyNC0wLjcyOC0zMi42NTYgNS40MTYtNTQuNjE2IDE5LjMyOC02OS4wODggMjAuMDQtMjAuODU2IDUwLjQzNi0yMS4zOTYgODguOTE2LTIyLjA2OCA4LjI0OC0wLjE0OCAxNi43NzItMC4yOTYgMjUuODA0LTAuNjRsMTYuNTItMC42MjggMi4wMjggMTYuNDEyYzAuMTQ0IDEuMTI4IDE1LjQyNCAxMTUuNjA0IDkxLjE4NCAxNDYuMjEyIDE2LjczMiA2Ljc2IDIwLjc4NCAyMC4wOTIgMTkgMzAuMzItNS41MzYgMzEuNzA0LTcxLjcgNTcuMjYtMTA0LjAzNiA1OC41MDhhMTkyLjU2IDE5Mi41NiAwIDAgMS01LjY3NiAwLjA5NnogbS0zMy4zOTItMjE0LjQ5MmMtMy42NjggMC4wOC03LjI2IDAuMTQtMTAuOCAwLjIwNC0zMC4xMiAwLjUzMi01My45MTYgMC45NDQtNjMuNTg4IDExLjAxNi02Ljc0OCA3LjAyNC05Ljc4OCAyMS4yMDQtOS4yOTIgNDMuMzQ0IDEuNTggNzEuMDM2IDU1LjI3NiAxMjYuMzEyIDEyMS4zNjggMTIzLjg0NCAyMS43NjgtMC44MjggNTAuMzMyLTEzLjg3NiA2My41OTItMjMuNjQ0LTY5LjQ5Ni0zNC4yNzItOTMuODg4LTExOC45NTItMTAxLjI4LTE1NC43NjR6IiBmaWxsPSIjNkU2RTk2IiAvPjxwYXRoIGQ9Ik0yNDQgMzEyYy01Mi4yNDQtMjAtMTAzLjEwOCAzNS4xMi0xMTcuMTI4IDY1LjEyOC0zMS43MzIgNjcuOTMyLTAuNjEyIDE0Ni4zMzIgNjkuNDk2IDE3NS4xMDRsMTAxLjAwOC0yMTIuOTA0TDI0NCAzMTIiIGZpbGw9IiNGOEE0QTciIC8+PHBhdGggZD0iTTIwNS4zMTYgNTc1LjM2NGwtMTUuNzg0LTYuNDcyYy0zOC43NjQtMTUuOTE2LTY4LjI4OC00NS42MTYtODMuMTMyLTgzLjY1Mi0xNC42NDgtMzcuNTItMTMuMTY4LTc4LjYyIDQuMTY0LTExNS43MzIgMTUuNDc2LTMzLjEyOCA1OS45OTItNzkuNzggMTEwLjQ5Ni03OS43OCAxMC4wMjggMCAxOS45MTYgMS44MzYgMjkuMzc2IDUuNDZsMS43NjggMC43ODggNjguOTIgMzUuMjg4LTExNS44MDggMjQ0LjF6IG0xNS43NDQtMjQ5LjYzMmMtMzUuMTE2IDAtNjguNTY4IDM5LjA4LTc3Ljg4IDU5LjAxNi0xMy4xMjggMjguMS0xNC4yOCA1OS4xNDQtMy4yNDggODcuNDA0IDkuMjA0IDIzLjU4NCAyNS45NjQgNDIuOTcyIDQ3Ljk5MiA1NS44OGw4NS43LTE4MC42NC0zNi45LTE4Ljg5NmE0Ni4wMTYgNDYuMDE2IDAgMCAwLTE1LjY2NC0yLjc2NHoiIGZpbGw9IiM2RTZFOTYiIC8+PHBhdGggZD0iTTc2MC4zMzIgNTUzLjRjMjAuMDYgMTkwLjM4NC0yMi40MTYgMzUwLjkwOC0yNDcuNTA0IDM3NC42Mi0yODkuMDk2IDMwLjQ2LTMzNS41NjQtMTE5LjU4NC0zNDkuNjYtMjUzLjM5NkMxNDQuOTc2IDUwMS45OTYgMjUxLjMyIDI0OS42NDggNDM0IDIzMC40czMwNi4yNzIgMTMyLjYxMiAzMjYuMzMyIDMyM3oiIGZpbGw9IiNCNEI3QzkiIC8+PHBhdGggZD0iTTQ0MS41MTIgOTUwYy0xMDcuOTYgMC0xODQuMTc2LTI5LjMxNi0yMzMuMDEyLTg5LjYyOC00NC42OTItNTUuMTk2LTU3LjI2OC0xMjcuMjUyLTYzLjIzMi0xODMuODY0LTkuNTM2LTkwLjUwOCAxNC4yODQtMjAxLjY2IDYyLjE2NC0yOTAuMDg0IDU1LjY0LTEwMi43NTIgMTM1LjQzMi0xNjQuNTE2IDIyNC42ODQtMTczLjkyYTMxNC4zMiAzMTQuMzIgMCAwIDEgMzIuODE2LTEuNzQ4Yzg0LjI1MiAwIDE1OS4wNjQgMzUuMDE2IDIxNi4zNCAxMDEuMjYgNTIuNjcyIDYwLjkxNiA4Ny4xMDggMTQ1Ljk3MiA5Ni45NiAyMzkuNDk2IDExLjc0IDExMS4zODggMC42NDggMTk2LjUyNC0zMy45IDI2MC4yNjgtNDEuOTIgNzcuMzc2LTExOS4xOCAxMjIuNTA4LTIyOS42MjQgMTM0LjE0LTI1LjcgMi43MDgtNTAuMzI0IDQuMDgtNzMuMTk2IDQuMDh6IG0yMy40MTYtNzAzLjI0OGMtOS41MTYgMC0xOS4yODggMC41Mi0yOS4wNDQgMS41NDgtNzcuMDkyIDguMTI0LTE0Ni45ODQgNjMuMjY0LTE5Ni44IDE1NS4yNjQtNDQuNiA4Mi4zNzItNjYuODMyIDE4NS41MDQtNTguMDIgMjY5LjE2OCAxMy4yIDEyNS4zMDQgNTMuODkyIDI0MS4yNiAyNjAuNDQ0IDI0MS4yNiAyMS42MTYgMCA0NC45NzYtMS4zMDQgNjkuNDI4LTMuODg4IDk5LjMxNi0xMC40NTYgMTY1LjMwOC00OC4yNCAyMDEuNzQ0LTExNS40OCAzMC45NjQtNTcuMTQ0IDQwLjY5Ni0xMzUuNDM2IDI5Ljc1Mi0yMzkuMzU2LTkuMDg4LTg2LjI4LTQwLjQ4NC0xNjQuMzEyLTg4LjM5Ni0yMTkuNzItNTAuMjMyLTU4LjA4OC0xMTUuNjItODguNzk2LTE4OS4xMDgtODguNzk2ek04NzMuODM2IDM1Ny4zMzJhMTguMDA0IDE4LjAwNCAwIDAgMS0xOC0xOGwwLjAwOC02LjU2YzAuMDkyLTU2LjgwNCAwLjI4LTE2Mi41MzItNjMuMDItMjEzLjU3Mi0zOS42MDQtMzEuOTM2LTEwMC4zNjQtMzkuMjMyLTE4MC41NzYtMjEuNjc2YTE3Ljk4NCAxNy45ODQgMCAwIDEtMjEuNDI4LTEzLjczNiAxOC4wMDQgMTguMDA0IDAgMCAxIDEzLjc0NC0yMS40MzJjOTEuMzkyLTIwLjAwNCAxNjIuMzM2LTEwLjMgMjEwLjg2IDI4LjgyIDc2Ljc0IDYxLjg3MiA3Ni41MzIgMTc4LjgyOCA3Ni40MiAyNDEuNjZsLTAuMDA4IDYuNWExOCAxOCAwIDAgMS0xOCAxNy45OTZ6IiBmaWxsPSIjNkU2RTk2IiAvPjxwYXRoIGQ9Ik03NjAuMzMyIDU1My40Qzc0MC4yNzIgMzYzLjAxMiA2MTYuNjggMjExLjE1MiA0MzQgMjMwLjRzLTI4OS4wMjQgMjcxLjU5Ni0yNzAuODM2IDQ0NC4yMTZjMTQuMSAxMzMuODEyIDYwLjU2NCAyODMuODYgMzQ5LjY2IDI1My40IDIyNS4wOTItMjMuNzEyIDI2Ny41NjgtMTg0LjIzNiAyNDcuNTA4LTM3NC42MTZ6TTYyMiA2ODUuOTE2Yy0xLjkyIDMuNTMyLTQuODY0IDguMjQtOC43NzIgMTMuNzJhMzcuOTk2IDM3Ljk5NiAwIDAgMC02Ny4yMjggMjQuMjhjMCAzIDAuMzg0IDUuOTEyIDEuMDQ4IDguNzE2LTIwLjAyIDQuMjMyLTM1LjA0OCAyMS45OC0zNS4wNDggNDMuMjYgMCAyLjg1MiAwLjM1NiA1LjYxNiAwLjg4NCA4LjMxNi0wLjQ4NCAwLjI0LTAuOTggMC40NjgtMS40NjQgMC43YTI4LjQ0OCAyOC40NDggMCAwIDAtMTQuMTMyLTMuODA0IDI4LjcwNCAyOC43MDQgMCAwIDAtMjcuMTQ4IDE5LjQxNmMtNDguMzU2IDEzLjQ4LTEwNy42NDQgMTMuODkyLTE3Ny4zMDgtMTMuNTY0LTE5Ni4xNjgtNzcuMy01Ny41OTYtMzUzLjM0OC01Ny41OTYtMzUzLjM0OCAxNDcuMTggNzUuNDA0IDM1NS4xNjgtMS4wNjQgMzU1LjE2OC0xLjA2NCAxMC42NzIgNDkuOTMyIDQ5LjYgMTE0Ljg2IDQ5LjYgMTE0Ljg2czM5LjM1MiAzMi45NzItMTguMDA0IDEzOC41MTJ6IiBmaWxsPSIjNkU2RTk2IiAvPjxwYXRoIGQ9Ik00NzQuMzQ4IDcwMy4wOG0tMjMuNzggMGEyMy43OCAyMy43OCAwIDEgMCA0Ny41NiAwIDIzLjc4IDIzLjc4IDAgMSAwLTQ3LjU2IDBaIiBmaWxsPSIjNkU2RTk2IiAvPjxwYXRoIGQ9Ik01MzUgNjU0LjI4bS05IDBhOSA5IDAgMSAwIDE4IDAgOSA5IDAgMSAwLTE4IDBaIiBmaWxsPSIjNkU2RTk2IiAvPjxwYXRoIGQ9Ik03MDAuNDUyIDY2OS4yNDRsMjI2Ljk4NCAxNi42NzJzMjEuNDYtMTcxLjE3Mi0yOS45MjgtMjcwLjc4NGwtMTk3LjA1NiAxMjAuMDQ0YzAtMC4wMDggMTIuMTg0IDYzLjI4OCAwIDEzNC4wNjh6IiBmaWxsPSIjQjRCN0M5IiAvPjxwYXRoIGQ9Ik05NDMuMTc2IDcwNS4xMTZsLTI2My44Mi0xOS4zODQgMy4zNjQtMTkuNTUyYzExLjQ4NC02Ni43NjggMC4xOC0xMjcuMDIgMC4wNjQtMTI3LjYybC0yLjM2LTEyLjI2NCAyMjQuMjI4LTEzNi42IDguODYgMTcuMTcyYzUzLjMzNiAxMDMuMzg0IDMyLjcwNCAyNzQuMDcyIDMxLjc5NiAyODEuMjhsLTIuMTMyIDE2Ljk2OHogbS0yMjIuMTQ0LTUyLjQxMmwxOTAuMTk2IDEzLjk3MmMzLjQtNDEuNDMyIDguNS0xNDkuNzA0LTIxLjctMjI1LjYxMmwtMTY5LjQzMiAxMDMuMjE2YzIuNjY4IDE5LjkwNCA2LjUxMiA2MS4yMzIgMC45MzYgMTA4LjQyNHoiIGZpbGw9IiM2RTZFOTYiIC8+PHBhdGggZD0iTTczOC44NzYgMjY5Ljg4YzU1LjI5NiA1LjUzMiAxMjAuMzA4IDQxLjc0NCAxNDQuNjMyIDkxLjA4OCAzNi4xMiA3My4yOTYtMC4wNTYgMTU4LjQ4NC04MC43OTYgMTkwLjI4LTgwLjc0IDMxLjc3Ni0xMTkuMjQ0LTI0LjAwOC0xNTUuMzY0LTk3LjMwOC0xNS4xMTItMzAuNjY4LTI3LjQxNi01OS41NDgtMzAuNjk2LTg1LjA4OCIgZmlsbD0iI0Y4QTRBNyIgLz48cGF0aCBkPSJNNjc1LjA4IDQ2OC41MDRzLTE3LjkyOC05Ny44NDQgNjkuNDkyLTExMS4xNzJjODcuNDI0LTEzLjMyOCAxNDMuMjggMTQzLjQ0NCAzMi4zNTIgMTgzLjA2IDAgMCAxMzkuMDYtMjcuNTU2IDk2LjA2OC0xNTcuOTc2cy0xMjcuMzEyLTExMC4yMi0xNDcuNTE2LTc0LjY4NEw2MjIgMzc0bDUzLjA4IDk0LjUwNHoiIGZpbGw9IiM2RTZFOTYiIC8+PHBhdGggZD0iTTc1OS4wODQgNTc4LjU0Yy02NC4wNDggMC4wMDgtOTkuNC01OC44MzItMTI3Ljg4NC0xMTYuNjQtMTMuODgtMjguMTY0LTI4LjU4NC02MC45NjgtMzIuNDA4LTkwLjc1MmwzNS43MTItNC41ODRjMy4xNDggMjQuNTQgMTYuNDE2IDUzLjkyIDI4Ljk4NCA3OS40MiAzOC41MiA3OC4xNzIgNjkuNjMyIDExMy4zMiAxMzIuNjI0IDg4LjUwOCAzNS45ODQtMTQuMTY4IDYyLjg2NC00MC4yNDQgNzUuNjg4LTczLjQxNiAxMS42MTYtMzAuMDQ0IDEwLjA0LTYyLjc3Ni00LjQ0LTkyLjE2LTIyLjA5Ni00NC44MzYtODMuNTk2LTc2LjQ2NC0xMzAuMjc2LTgxLjEzNmwzLjU4NC0zNS44MmM1Ny4wNzYgNS43MTIgMTMwLjAwNCA0Mi4yNDggMTU4Ljk4NCAxMDEuMDQgMTguOTg0IDM4LjUyIDIxLjAyIDgxLjUwOCA1LjczMiAxMjEuMDU2LTE2LjI0OCA0Mi4wNTItNTEuMjcyIDc2LjI4OC05Ni4wOCA5My45MzItMTguNTEyIDcuMjkyLTM1LjE2OCAxMC41NDgtNTAuMjIgMTAuNTUyeiIgZmlsbD0iIzZFNkU5NiIgLz48cGF0aCBkPSJNOTQ2LjgyNCA3NDQuNDQ0Yy0yLjUgODcuNzUyLTc0LjkxMiAxNTYuOS0xNjEuNzQgMTU0LjQxNi04Ni44Mi0yLjQ2NC0xMDcuODUyLTc0LjI2LTEwNS4zNi0xNjIuMDE2IDIuNDkyLTg3Ljc2IDI1LjE1Ni03My43NCAxMTEuOTkyLTcxLjI2IDg2Ljg0IDIuNDY0IDE1Ny42LTguOTE2IDE1NS4xMDggNzguODZ6IiBmaWxsPSIjRjhBNEE3IiAvPjxwYXRoIGQ9Ik03MzUuMTg4IDgzNy42NTJzLTQ0LjgyLTExNy44MiA0NC45OTYtMTUxLjc0bC03OC43Ni0yMi42MzJjLTAuMDA0IDAtNjEuMDQ4IDEzOC4wMiAzMy43NjQgMTc0LjM3MnoiIGZpbGw9IiNGRkZGRkYiIC8+PHBhdGggZD0iTTc4OS42MDggOTE2LjkyOGMtMS42OCAwLTMuMzQ0LTAuMDI0LTUuMDMyLTAuMDc2LTg0Ljg0NC0yLjQxMi0xMjYuMTcyLTYzLjE0OC0xMjIuODQ0LTE4MC41MiAxLjA2LTM3LjI4IDUuNjI4LTU3LjE3NiAxNi4zMDQtNzAuOTQ0IDEzLjcwNC0xNy42OCAzNC4zNi0yMC4xMDggNTQuNjM2LTIwLjEwOCA4Ljc2OCAwIDE4LjQ2IDAuNDg0IDI5LjY4NCAxLjA0OCA4Ljg5MiAwLjQ0NCAxOC45NTYgMC45NTIgMjkuODY4IDEuMjY0YTE1ODYuOCAxNTg2LjggMCAwIDAgMzAuMjY0IDAuNDc2YzUwLjc1NiAwLjQ3MiA5NC42IDAuODg0IDEyMC45NzIgMjguMjYgMTUuMjI4IDE1LjgxMiAyMi4yMTIgMzguMjYgMjEuMzQ4IDY4LjYyNC0yLjczNiA5Ni40NDgtNzkuNyAxNzEuOTc2LTE3NS4yIDE3MS45NzZ6TTczMi42OCA2ODEuMjhjLTI2LjI5NiAwLTMzLjM2OCAwLTM0Ljk2IDU2LjA4NC0yLjc1NiA5Ny40NDQgMjQuMzQ0IDE0MS43MDggODcuODg0IDE0My41MTIgNzcuNjMyIDIuMjI4IDE0MS4wMDgtNTguNzY0IDE0My4yMzYtMTM2LjkzNiAwLjU4LTIwLjE5Ni0zLjExNi0zNC4xMzYtMTEuMjk2LTQyLjYyNC0xNS44ODgtMTYuNDk2LTUyLjcyNC0xNi44NC05NS4zNzYtMTcuMjQ0YTE1ODQuOTg0IDE1ODQuOTg0IDAgMCAxLTMwLjk1Mi0wLjQ5MmMtMTEuMjk2LTAuMzItMjEuNTg0LTAuODM2LTMwLjY0OC0xLjI4OC0xMC43NDgtMC41NC0yMC4wMi0xLjAxMi0yNy44ODgtMS4wMTJ6IiBmaWxsPSIjNkU2RTk2IiAvPjxwYXRoIGQ9Ik03MzguODc2IDI2OS44OGMtMjQuNzQ4LTE0OC4yNzItMTU5LjkyOC0yNDkuMjY0LTMwMS45NTYtMjI1LjU2NC0xNDIuMDI0IDIzLjctMjM3LjA5NiAxNjMuMTA4LTIxMi4zNTYgMzExLjM4IDAgMCA0NS41MiA5MC43MzIgMjUwLjQ1NiA1Ni41MzIgMjQ0LjM0OC00MC43NzIgMjYzLjg1Ni0xNDIuMzQ4IDI2My44NTYtMTQyLjM0OHoiIGZpbGw9IiNCNEI3QzkiIC8+PHBhdGggZD0iTTUzNSA4OS45MTZTMjcyLjQwOCAwIDMyNC4zNCAzODQuMDEyYzAgMC02NC4xNDQtNy44NDQtODMuNzEyLTMzLjA2NCAwIDAtMjUuMDU2LTE0Ni4xNjQgNzkuNzEyLTIzMC4zOTJDMzQ5Ljc2IDk2LjkwNCAzODQgNTcuMDQ4IDQzNi4xMTIgNjMuNTA4YzIwLjkyNCAyLjU5NiA0Mi4yNzYtNC42NCA5OC44ODggMjYuNDA4eiIgZmlsbD0iI0ZGRkZGRiIgLz48cGF0aCBkPSJNMzIwLjMzNiAxOTkuMDI4aDM2djY1Ljg4NGgtMzZ6TTQ0Ni41NjggMTk5LjAyOGgzNnY2NS44ODRoLTM2eiIgZmlsbD0iIzZFNkU5NiIgLz48cGF0aCBkPSJNMzg5LjEyOCA0MzcuOTMyaC0wLjAyOEMyNDcuMzQ0IDQzNy45MjQgMjEwIDM2Ni44IDIwOC40OCAzNjMuNzcybC0xLjIyLTIuNDMyLTAuNDQ4LTIuNjg0QzE4MC40NzYgMjAwLjgzMiAyODIuMzcyIDUxLjg1MiA0MzMuOTYgMjYuNTZhMjcwLjY0IDI3MC42NCAwIDAgMSA0NC40MzItMy42OTZjNjUuNzA4IDAgMTI5Ljk3MiAyNC40MjQgMTgwLjk0IDY4Ljc3NiA1MS4zMzYgNDQuNjc2IDg1Ljg5NiAxMDYuOTIgOTcuMyAxNzUuMjcybDAuNTMyIDMuMTg0LTAuNjA4IDMuMTcyYy0wLjg5MiA0LjY1Mi0yNC43OCAxMTQuMzY0LTI3OC41NjggMTU2LjcxMi0zMS42MTYgNS4yOC02MS41MTIgNy45NTItODguODYgNy45NTJ6TTI0MS43OTYgMzQ5LjQ4YzYuNDEyIDkuNjUyIDQwLjg1NiA1Mi40NDggMTQ3LjMwNCA1Mi40NTIgMjUuMzg0LTAuMTQgNTMuMjg4LTIuNTA0IDgyLjk1Ni03LjQ1NiAyMDQuOTQtMzQuMTk2IDI0Mi45OC0xMTEuMDk2IDI0OC4zNjQtMTI1LjYxMi0xMC42ODgtNTguNTY0LTQwLjY3Mi0xMTEuNzI4LTg0LjczMi0xNTAuMDY0LTQ0LjQxNi0zOC42NDgtMTAwLjI3Ni01OS45MzItMTU3LjMwOC01OS45MzJhMjM0LjggMjM0LjggMCAwIDAtMzguNTA4IDMuMjA0QzMwOC45MTYgODMuOTI0IDIyMC42NDggMjEyLjQ1MiAyNDEuNzk2IDM0OS40OHoiIGZpbGw9IiM2RTZFOTYiIC8+PHBhdGggZD0iTTg0MiA2ODUuOTE2czYwLjQ4IDEuNTI0IDM5LjI0NCA3OS44MDRjLTIxLjI0NCA3OC4yOC0xNzAuMzI4IDExMC4zMi0xODAuNzg4IDI5LjMgMCAwLTExLjE0NCAxMzQuMzY0IDE1NS41NDggOTAuOTggMTQ1Ljk5Ni0zOCA5My45OTYtMjQ2LjE3Ni0xNC4wMDQtMjAwLjA4NHpNNzIzLjg2OCA1OTkuOTg0czgyLjEzMiAxMi43NjQgMTIyLjEzMi0xOS42MDhjMCAwIDE0IDM2LjQ0NCAwIDY4LjAzMmw2NS44NjggOS44NDRzMTIuODM2LTEyMC4zMzYtOS44NDgtMTc2LjE5MmMwIDAtOTAuMTg0IDEwNi42NzYtMTgwLjA5NiA3OC4zMTJsMS45NDQgMzkuNjEyek0yMDYuODA4IDM1OC42NlMxNjAuMTkyIDM4Ny41OTYgMTQ4LjA5NiA0ODguOGwxMy4wNTYgNDIuMzcyTDIzMi4wOCAzNzkuNDM2bC0yNS4yNzItMjAuNzc2eiIgZmlsbD0iIzZFNkU5NiIgLz48cGF0aCBkPSJNMTI1Ljg1MiA1MjAuMTA4cy0zMC45NjQgODIuNDQ0LTExLjQwOCAxNDMuMTcyaDQ5Ljg4bDE1LjQyOC0xMzIuMTA4LTUzLjktMTEuMDY0ek0xMTQuNDQ0IDY3OS4zcy0yNy42OTIgMTU2LjkyNCA4OS45MzIgMTc1LjgwOGMxMTcuNjI0IDE4Ljg5MiA0LjEyIDUuMjU2IDQuMTIgNS4yNTZTMjguNzU2IDg0Mi44MDQgNzIgNzAwYzAgMCAxMS42MjQtMTcuOTA4IDQyLjQ0NC0yMC43ek00MzMuMjI4IDQ1Ljg4NGEyNTAuNTggMjUwLjU4IDAgMCAwLTY2LjA0NCAyMC43MzJjMi43MDgtMC41NiA1LjQwNC0xLjE5NiA4LjE2OC0xLjU4NCAxNTkuNjQ4LTIyLjU5NiAyMzkuMTU2IDY2LjY4IDI2MC41MDQgMTk0LjU5NiAwIDAgOS43MjQgODEuMzU2LTIyNy42MzIgMTIyLjgwOC05Ni4xMzIgMTYuNzg4LTE0NS41Ni0xOC43NTItMTc2LjE0NC0zNi41NiAxNi40MjggMjEuMDI4IDcxLjEyIDk1Ljk4IDIzOS4yNTIgNjcuOTI0IDI0NC4zNDgtNDAuNzcyIDI2My44NTYtMTQyLjM1MiAyNjMuODU2LTE0Mi4zNTItMjQuNzUyLTE0OC4yNzYtMTU5LjkzMi0yNDkuMjY4LTMwMS45Ni0yMjUuNTY0eiIgZmlsbD0iIzZFNkU5NiIgLz48cGF0aCBkPSJNODA1Ljc2NCA0MTMuMDRjMTAuOTMyIDIwLjQzNiA2Ljc5NiA0My45NTYtOS4yNDQgNTIuNTQtMTYuMDM2IDguNTg0LTIxLjI1Ni02LjQzMi0zMi4xOTYtMjYuODY4LTEwLjkzNi0yMC40MzYtMjMuNDM2LTM4LjU1Mi03LjQtNDcuMTMyIDE2LjA0LTguNTg0IDM3LjkwNCAxLjAyNCA0OC44NCAyMS40NnoiIGZpbGw9IiNGRkZGRkYiIC8+PHBhdGggZD0iTTU2MS4xNCA5ODAuNDUyYzYuMTk2LTEyLjkzNiAyMC4zNTYtMTkuMDQgMzEuNjMyLTEzLjY0IDExLjI4IDUuNCA1LjU0OCAxMy40MjgtMC42NDQgMjYuMzY0cy0xMC41MDQgMjUuODgtMjEuNzg0IDIwLjQ3Ni0xNS40LTIwLjI2OC05LjIwNC0zMy4yek0yNzkuNzggOTgwLjQ1MmM2LjE5Ni0xMi45MzYgMjAuMzU2LTE5LjA0IDMxLjYzNi0xMy42NCAxMS4yNzYgNS40IDUuNTQ0IDEzLjQyOC0wLjY0OCAyNi4zNjQtNi4xOTIgMTIuOTMyLTEwLjUwNCAyNS44OC0yMS43ODQgMjAuNDc2LTExLjI3Ni01LjQwNC0xNS40LTIwLjI2OC05LjIwNC0zMy4yeiIgZmlsbD0iI0ZGRkZGRiIgLz48cGF0aCBkPSJNMzE3Ljg1MiA0OThzLTg1Ljc3MiAxMTQuOTcyLTQwLjkyOCAyMjAuMjA4YzAgMC0xMDAuOTQtNzQuMzcyLTE1Ljg2LTIzNi4xNTJsNTYuNzg4IDE1Ljk0NHoiIGZpbGw9IiNDQkNFRDgiIC8+PHBhdGggZD0iTTI2OCA1NjMuNjk2aDI4MHYxOTkuMTY4SDI2OHoiIGZpbGw9IiNGRERGQjEiIC8+PHBhdGggZD0iTTU0OCA3ODAuODY0SDI2OGExOCAxOCAwIDAgMS0xOC0xOHYtMTk5LjE2OGMwLTkuOTM2IDguMDYtMTggMTgtMThoMjgwYzkuOTM2IDAgMTggOC4wNjQgMTggMTh2MTk5LjE2OGMwIDkuOTQtOC4wNjQgMTgtMTggMTh6IG0tMjYyLTM2aDI0NHYtMTYzLjE2OGgtMjQ0djE2My4xNjh6IiBmaWxsPSIjNkU2RTk2IiAvPjxwYXRoIGQ9Ik0yODYgNTgxLjY5NmgyNDlWNjIySDI4NnoiIGZpbGw9IiNCQzg0MkMiIC8+PHBhdGggZD0iTTMyMCA2MjJoMzZ2ODMuMTE2aC0zNnpNNDY1LjYzMiA2MjJoMzZ2ODMuMTE2aC0zNnpNMzk0IDYyMmgzNnY4MS4wODRoLTM2eiIgZmlsbD0iIzZFNkU5NiIgLz48L3N2Zz4="
            data-close-icon="data:image/svg+xml;base64,PHN2ZyB0PSIxNjkwNTM1NDQxNTI2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjYzNjciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNNTEyIDEwMjRBNTEyIDUxMiAwIDEgMSA1MTIgMGE1MTIgNTEyIDAgMCAxIDAgMTAyNHpNMzA1Ljk1NjU3MSAzNzAuMzk1NDI5TDQ0Ny40ODggNTEyIDMwNS45NTY1NzEgNjUzLjYwNDU3MWE0NS41NjggNDUuNTY4IDAgMSAwIDY0LjQzODg1OCA2NC40Mzg4NThMNTEyIDU3Ni41MTJsMTQxLjYwNDU3MSAxNDEuNTMxNDI5YTQ1LjU2OCA0NS41NjggMCAwIDAgNjQuNDM4ODU4LTY0LjQzODg1OEw1NzYuNTEyIDUxMmwxNDEuNTMxNDI5LTE0MS42MDQ1NzFhNDUuNTY4IDQ1LjU2OCAwIDEgMC02NC40Mzg4NTgtNjQuNDM4ODU4TDUxMiA0NDcuNDg4IDM3MC4zOTU0MjkgMzA1Ljk1NjU3MWE0NS41NjggNDUuNTY4IDAgMCAwLTY0LjQzODg1OCA2NC40Mzg4NTh6IiBmaWxsPSIjNGU4M2ZkIiBwLWlkPSI2MzY4Ij48L3BhdGg+PC9zdmc+"
            defer
          />
        </>
      )}

      {/* Matomo 统计 */}
      {MATOMO_HOST_URL && MATOMO_SITE_ID && (
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
              var _paq = window._paq = window._paq || [];
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u="//${MATOMO_HOST_URL}/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '${MATOMO_SITE_ID}']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
              })();
            `
          }}
        />
      )}
    </>
  )
}

const TwikooCommentCounter = dynamic(
  () => import('@/components/TwikooCommentCounter'),
  { ssr: false }
)
const DebugPanel = dynamic(() => import('@/components/DebugPanel'), {
  ssr: false
})
const ThemeSwitch = dynamic(() => import('@/components/ThemeSwitch'), {
  ssr: false
})
const Fireworks = dynamic(() => import('@/components/Fireworks'), {
  ssr: false
})
const MouseFollow = dynamic(() => import('@/components/MouseFollow'), {
  ssr: false
})
const Nest = dynamic(() => import('@/components/Nest'), { ssr: false })
const FlutteringRibbon = dynamic(
  () => import('@/components/FlutteringRibbon'),
  { ssr: false }
)
const Ribbon = dynamic(() => import('@/components/Ribbon'), { ssr: false })
const Sakura = dynamic(() => import('@/components/Sakura'), { ssr: false })
const StarrySky = dynamic(() => import('@/components/StarrySky'), {
  ssr: false
})
const DifyChatbot = dynamic(() => import('@/components/DifyChatbot'), {
  ssr: false
})
const Analytics = dynamic(
  () =>
    import('@vercel/analytics/react').then(async m => {
      return m.Analytics
    }),
  { ssr: false }
)
const MusicPlayer = dynamic(() => import('@/components/Player'), { ssr: false })
const Ackee = dynamic(() => import('@/components/Ackee'), { ssr: false })
const Gtag = dynamic(() => import('@/components/Gtag'), { ssr: false })
const Busuanzi = dynamic(() => import('@/components/Busuanzi'), { ssr: false })
const Messenger = dynamic(() => import('@/components/FacebookMessenger'), {
  ssr: false
})
const VConsole = dynamic(() => import('@/components/VConsole'), { ssr: false })
const CustomContextMenu = dynamic(
  () => import('@/components/CustomContextMenu'),
  { ssr: false }
)
const DisableCopy = dynamic(() => import('@/components/DisableCopy'), {
  ssr: false
})
const AdBlockDetect = dynamic(() => import('@/components/AdBlockDetect'), {
  ssr: false
})
const LoadingProgress = dynamic(() => import('@/components/LoadingProgress'), {
  ssr: false
})
const AosAnimation = dynamic(() => import('@/components/AOSAnimation'), {
  ssr: false
})

const Coze = dynamic(() => import('@/components/Coze'), {
  ssr: false
})
const LA51 = dynamic(() => import('@/components/LA51'), {
  ssr: false
})
const TianliGPT = dynamic(() => import('@/components/TianliGPT'), {
  ssr: false
})

export default ExternalPlugin
