const userAPI = require("../../API/userAPI");
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
                subtitle:
                  "Đưới đây là các vấn đề tôi có thể giải quyết cho bạn",
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
                  {
                    type: "postback",
                    title: "Xem chi tiết khóa học",
                    payload: "VIEW_DETAIL_COURSE",
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
        text: `Xin chào ${userName.fullName}, Chào mừng bạn đến với Lizsy. Chúng tôi có thể giúp gì được cho bạn`,
      },
      ...responsePayload.MENU_FEATURES(),
    ];
  },

  SEARCH_COURSES_POSTBACK: () => {
    return { text: `Xin hãy cho tôi biết tên khóa học bạn đang tìm kiếm?` };
  },

  SEARCH_COURSES_MESSAGE: async (message = "") => {
    const courses = await courseModel.bySearchText(message, "id", "asc", 10);
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
                        url: course.id,
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
};

module.exports = responsePayload;
