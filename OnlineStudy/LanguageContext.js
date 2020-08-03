
import React from 'react';
export const LanguageContext = React.createContext();

export function LanguageThemeProvider({ children }) {
    const [lang, setLang] = React.useState(mainLanguage.vie) //setting eng lang as default
    const value = React.useMemo(
        () => ({
            lang,
            setLang,
        }),
        [lang, setLang],
    );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export const mainLanguage = {
  vie: {
    signIn : "Đăng nhập",
    home : "Trang chủ",
    download: "Tải xuống",
    browse: "Xem thêm",
    search: "Tìm kiếm",
    language : "Ngôn ngữ",
    type : "vie",
    
    setting : "Cài đặt",
    themeSetting : "Cài đặt theme",
    langSetting : "Cài đặt ngôn ngữ"
  },
  eng: {
    signIn : "Sign in",
    home : "Home",
    download: "Download",
    browse: "Browse",
    search: "Search",
    language : "Language",
    type : "eng",
    setting : "Setting",
    themeSetting : "Theme Setting",
    langSetting : "Language Setting "


  }

}