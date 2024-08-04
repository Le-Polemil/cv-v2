import { AppProps } from "next/app"
import { AnimatePresence } from "framer-motion"
import { ApolloProvider } from "@apollo/client"
import i18n from "i18next"
import Backend from "i18next-http-backend"
import { initReactI18next } from "react-i18next"

import client from "@/apollo"
import { API_BASE_URL } from "@/constants"
import usePreviousRoute from "@/hooks/usePreviousRoute"
import { IPageProps } from "@/types"

import Arrows from "@/components/Arrows"
import Tabs from "@/components/Tabs"

import "@fontsource/material-icons"
import "@/styles/globals.css"
import "@/styles/animations.css"

i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "fr", // if you're using a language detector, do not define the lng option
    fallbackLng: ["fr", "en", "ru"],

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },

    backend: {
      loadPath: `${API_BASE_URL}/i18n/{{lng}}`,
      crossDomain: true,
    },
  })

function MyApp({ Component, pageProps, router }: AppProps<IPageProps>) {
  const [previousRoute, currentRoute] = usePreviousRoute()

  return (
    <ApolloProvider client={client}>
      <div className="text-stone-800 font-latoBold relative h-screen overflow-hidden py-6 md:py-16 px-12 lg:px-[6vw]">
        <Tabs />
        <AnimatePresence initial={false}>
          <Component
            key={router.pathname}
            {...pageProps}
            previousRoute={previousRoute}
            currentRoute={currentRoute}
          />
        </AnimatePresence>
        <Arrows currentRoute={currentRoute} />
      </div>
    </ApolloProvider>
  )
}

export default MyApp
