import { useRouter } from 'next/router'
import en from "../localized/en";
import ja from "../localized/ko";

export const useLocale = () => {

  const { locale } = useRouter();
  const localizedStrings = locale === "en" ? en : ja;
  const languageCode = locale === "en" ? 'en-US' : 'ja-JP';

  return { locale, localizedStrings, languageCode };

}

