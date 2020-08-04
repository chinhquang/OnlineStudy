
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
    langSetting : "Cài đặt ngôn ngữ",

    emailOrUsername : "Email hoặc tên tài khoản",
    username : "Tên tài khoản",
    phone : "Số điện thoại",
    password :"Mật khẩu",
    signUp : "Đăng kí",
    needHelp : "Trợ giúp?",
    exploreWithoutSubscription : "Bỏ qua đăng nhập",
    googleSignIn : "Đăng nhập bằng google",
    createAccount : "Tạo tài khoản",
    forgetPassword : "Quên mật khẩu",
    cancel : "Huỷ",
    seeAll : "Xem thêm >",
    noDownload: "Chưa tải xuống video nào",
    courseDownloadWillAppearHere : "Các khoá học bạn tải xuống sẽ xuất hiện ở đây",
    content : "Nội dung",
    comment : "Bình luận",
    topSell : "Bán chạy nhất",
    newestCourses : "Mới nhất",
    topRate : "Nhiều bình chọn nhất",
    topAuthor : "Các giảng viên nhiều lượt bình chọn",

  },
  eng: {
    signIn : "Sign in",
    home : "Home",
    username : "Username",
    download: "Download",
    browse: "Browse",
    search: "Search",
    language : "Language",
    type : "eng",
    setting : "Setting",
    themeSetting : "Theme Setting",
    langSetting : "Language Setting ",
    emailOrUsername : "Email or username",
    phone : "Phone",
    password :"Password",
    signUp : "Sign up",
    needHelp : "Need help?",
    exploreWithoutSubscription : "Explore without subscription",
    googleSignIn : "Google sign in",
    createAccount : "Create account",

    forgetPassword : "Forgot your password",
    cancel : "Cancel",
    seeAll : "See all >",
    noDownload: "No downloads",
    courseDownloadWillAppearHere : "Courses you download will appear here",
    content : "Content",
    comment : "Comments",
    topSell : "Top sell",
    newestCourses : "Newest",
    topRate : "Top rate",
    topAuthor : "Top lecturer",
  }

}