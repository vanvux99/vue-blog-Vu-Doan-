// const BASE_URL = ""
// const BASE_URL = ""

export const SOURCE_LINK = "http://localhost:5000/blogs/";

export const CATEGORIES = [
    { text: "Thời sự", value: 1 },
    { text: "Thế giới", value: 2 },
    { text: "Kinh doanh", value: 3 },
    { text: "Giải trí", value: 4 },
    { text: "Thể thao", value: 5 },
]

export const PUBLICS = [
    { text: "Yes", value: 1 },
    { text: "No", value: 2 },
]

export const POSITIONS = [
    { text: "Việt Nam", value: 1 },
    { text: "Châu Á", value: 2 },
    { text: "Châu Âu", value: 3 },
    { text: "Châu Mỹ", value: 4 },
]

export const FORM = {
    title: "",
    des: "",
    detail: "",
    category: [],
    public: "",
    position: [],
    data_pubblic: "",
}

export const ERRORS = [
    { type: "text", text: "Vui lòng nhập lại !" },
    { type: "radio", text: "Vui lòng chọn lại !" },
    { type: "checkbox", text: "Vui lòng chọn lại !" },
]