const userAPI = require("../../API/userAPI");
const categoryModel = require("../../models/category.model");
const courseModel = require("../../models/course.model");
const responsePayload = {
  getInfoUser: async (sender_psid) => {
    // Send the HTTP request to the Messenger Platform
    const userProfile = await userAPI.get(sender_psid);

    return {
      fullName: `${userProfile.first_name} ${userProfile.last_name}`,
    };
  },

  MENU_FEATURES: () => {
    return [
      {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              {
                title: "Bạn đang cần hỗ trợ gì thế?",
                subtitle: "Đưới đây là các vấn đề tôi có thể hỗ trợ cho bạn",
                image_url:
                  "https://img-c.udemycdn.com/course/240x135/2923266_4297_2.jpg?Expires=1621141528&Signature=EsSIDbgrLNKl2kUrafrHYnrNeuGyoYox6i3I7ISzOOgRHMrsg7l4VyTW1fb2BD0qKMDsCleG4HOEkHRu~BAgcoqmueOSxW8vcWHcjr879nch~5q~FgyGOrYFLSlLZ0GeuGU9ABJ4KNnDKqD6h-ECGDYRU0Pm2XiWYQq0tAFguQ3BzpLK5SSr9xydaFv03xOsLMYgcXyiGBx3IMXAsbhkKOmUt4lepNsOkzEZ8mOohpQXIgoDYFUYI03lDWXwGbn7SfZ1LEbjB~U4QJFuk-9AbeDvBxTLe1vo~U-LGcB3B2KVrried~lZhD04rNzeBJSzT38kbUoDbmcZSlhfmV7V2g__&Key-Pair-Id=APKAITJV77WS5ZT7262A",
                buttons: [
                  {
                    type: "postback",
                    title: "Tìm kiếm khóa học",
                    payload: "SEARCH_COURSES",
                  },
                  {
                    type: "postback",
                    title: "Duyệt danh mục",
                    payload: "VIEW_CATEGORIES",
                  },
                ],
              },
            ],
          },
        },
      },
    ];
  },

  GET_STARTED: async (sender_psid) => {
    const userName = await responsePayload.getInfoUser(sender_psid);
    return [
      {
        text: `Xin chào ${userName.fullName}, Chào mừng bạn đến với MyEdu. Chúng tôi có thể giúp gì được cho bạn`,
      },
      ...responsePayload.MENU_FEATURES(),
    ];
  },

  SEARCH_COURSES_POSTBACK: () => {
    return { text: `Xin hãy cho tôi biết tên khóa học bạn đang tìm kiếm?` };
  },

  SEARCH_COURSES_MESSAGE: async (message = "") => {
    const courses = await courseModel.bySearchText(message, {
      order: "id",
      sort: "asc",
      limit: 10,
      offset: 0,
    });

    if (courses.length === 0) {
      return [
        {
          text: `Tôi không tìm thấy khóa học với từ khóa "${message}"!! Xin hãy nhập lại từ khóa khác.`,
        },
        {
          text: `Nếu cần tôi giúp gì hãy (".") nhé!!`,
        },
      ];
    } else {
      return [
        {
          text: `Tôi tìm thấy được một vài khóa học phù hợp với từ khóa ${message} của bạn.`,
        },
        {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: [
                ...courses.map((course) => {
                  return {
                    image_url: course.srcImage,
                    title: course.courName,
                    subtitle: course.tinyDes,
                    buttons: [
                      {
                        type: "web_url",
                        url: `https://udemy-1612407.herokuapp.com/webhook/courses/${course.id}`,
                        title: "Giới thiệu",
                        webview_height_ratio: "tall",
                        messenger_extensions: "true",
                      },
                      {
                        type: "web_url",
                        url: `https://main.d5ph5e9p9s4gm.amplifyapp.com/courses/${course.id}`,
                        title: "Xem chi tiết",
                      },
                    ],
                  };
                }),
              ],
            },
          },
        },
        {
          text: `Nếu cần tôi giúp gì hãy (".") nhé!!`,
        },
      ];
    }
  },

  MAIN_CATEGORIES: async () => {
    const cats = await categoryModel.all();
    let catFilter = [];
    cats.forEach((cat) => {
      cat.isSubCategory = cat.id_parentCat === 0 ? true : false;
      if (cat.id_parentCat === 0) {
        cat.subCategory = cats.filter((value) => value.id_parentCat === cat.id);
        cat.isSubCategory = cat.subCategory.length === 0 ? false : true;
        catFilter.push(cat);
      }
    });
    return [
      { text: "Chúng tôi hiện có một vài lĩnh vực chính dưới đây!!" },
      { text: "bạn có thể xem qua để tìm khóa học phù hợp với bản thân." },
      {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              ...catFilter.map((cat) => {
                return {
                  image_url: cat.srcImage,
                  title: cat.catName,
                  subtitle: cat.isSubCategory
                    ? "Chọn 'Danh mục phụ' để xem các danh mục con của lĩnh vực"
                    : "Chọn 'Khóa học nổi bật' để xem các khóa học của lĩnh vực",
                  buttons: [
                    cat.isSubCategory
                      ? {
                          type: "postback",
                          title: "Danh mục phụ",
                          payload: `SUB_CATEGORIES__${cat.id}`,
                        }
                      : {
                          type: "postback",
                          title: "Khóa học nổi bật",
                          payload: `COURSES_CAT__${cat.id}`,
                        },
                  ],
                };
              }),
            ],
          },
        },
      },
      { text: `Nếu cần tôi giúp gì hãy (".") nhé!!` },
    ];
  },

  SUB_CATEGORIES: async (catId) => {
    const cat = await categoryModel.single(catId);
    const cats = (await categoryModel.allWithId(catId)).filter(
      (cat_chil) => cat_chil.id !== catId
    );
    return [
      { text: `Đây là các danh mục phụ của lĩnh vực '${cat.catName}'!!` },
      {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              ...cats.map((cat) => {
                return {
                  image_url: cat.srcImage,
                  title: cat.catName,
                  subtitle:
                    "Chọn 'Khóa học nổi bật' để xem các khóa học của lĩnh vực",
                  buttons: [
                    {
                      type: "postback",
                      title: "Khóa học nổi bật",
                      payload: `COURSES_CAT__${cat.id}`,
                    },
                  ],
                };
              }),
            ],
          },
        },
      },
      { text: `Nếu cần tôi giúp gì hãy (".") nhé!!` },
    ];
  },

  COURSES_CAT: async (catId) => {
    const courses = await courseModel.allWithCatId(
      catId,
      "rate",
      "desc",
      10,
      0
    );
    const cat = await categoryModel.single(catId);
    if (courses.length === 0) {
      return [
        {
          text: "Rất xin lỗi bạn nhiếu!!",
        },
        {
          text: "Danh mục mà bạn đang tìm kiếm hiện chúng tôi chưa cập nhật khóa học!!",
        },
        { text: `Nếu cần tôi giúp gì hãy (".") nhé!!` },
      ];
    }
    return [
      {
        text: `Danh mục ${cat.catName} của chúng tôi đang có những khóa học nổi bật được nhiều học viên đăng ký!!`,
      },
      {
        text: "Có thể bạn sẽ quan tâm đến những khóa học này!!",
      },
      {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              ...courses.map((course) => {
                return {
                  image_url: course.srcImage,
                  title: course.courName,
                  subtitle: course.tinyDes,
                  buttons: [
                    {
                      type: "web_url",
                      url: `https://udemy-1612407.herokuapp.com/webhook/courses/${course.id}`,
                      title: "Giới thiệu",
                      webview_height_ratio: "tall",
                      messenger_extensions: "true",
                    },
                    {
                      type: "web_url",
                      url: `https://main.d5ph5e9p9s4gm.amplifyapp.com/courses/${course.id}`,
                      title: "Xem chi tiết",
                    },
                  ],
                };
              }),
            ],
          },
        },
      },
      { text: `Nếu cần tôi giúp gì hãy (".") nhé!!` },
    ];
  },
};

module.exports = responsePayload;
