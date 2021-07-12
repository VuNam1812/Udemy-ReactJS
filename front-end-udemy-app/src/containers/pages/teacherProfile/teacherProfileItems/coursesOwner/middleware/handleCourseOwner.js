import { COURSES_OWNER_ACTION } from "../reducer/reducer";

import categoryApi from "../../../../../../api/categoryAPI";

import Swal from "sweetalert2";
export const handleCourseOwner = {
  handleFilterCharacterCourse: (e, courses, dispatch) => {
    const index = +e.target.getAttribute("data-id");
    const newCourses =
      index === 0
        ? courses
        : courses.filter((course) =>
            course.courName
              .toLocaleUpperCase()
              .startsWith(String.fromCharCode(64 + index))
          );

    dispatch({
      type: COURSES_OWNER_ACTION.UPDATE_COURSE,
      payload: newCourses,
    });

    dispatch({
      type: COURSES_OWNER_ACTION.UPDATE_FILTER_CHARACTER,
      payload: index,
    });
  },

  handleSearchCourse: (e, courses, dispatch) => {
    if (e.key === "Enter" && e.target.value !== "") {
      const newCourse = courses.filter((course) => {
        if (
          course.courName
            .toLocaleLowerCase()
            .search(e.target.value.toLocaleLowerCase()) !== -1
        )
          return course;
      });

      dispatch({
        type: COURSES_OWNER_ACTION.UPDATE_FILTER_CHARACTER,
        payload: 0,
      });

      dispatch({
        type: COURSES_OWNER_ACTION.UPDATE_COURSE,
        payload: newCourse,
      });
    }
  },

  checkCancel: async () => {
    const confirm = await Swal.fire({
      icon: "question",
      text: "Mọi thay đổi chưa được cập nhật!!",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Cập nhập",
      cancelButtonText: "Hủy bỏ",
      confirmButtonColor: "#00ab15",
      cancelButtonColor: "#dc3545",
    });

    if (confirm.isConfirmed) {
      Swal.fire({
        text: "Đang cập nhật",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: async () => {
          Swal.showLoading();

          //patch course

          Swal.fire({
            icon: "success",
            text: "Cập nhật thành công!!",
            showConfirmButton: false,
            didOpen: () => {
              setTimeout(() => {
                Swal.close();
              }, 1000);
            },
          });
        },
      });
    }
  },

  loadCategories: async (dispatch) => {
    const cat_res = await categoryApi.getAll();

    let cats = [];
    cat_res.data.all.forEach((cat) => {
      cat.isSubCategory = cat.id_parentCat === 0 ? true : false;
      if (cat.id_parentCat === 0) {
        cat.subCategory = cat_res.data.all.filter(
          (value) => value.id_parentCat === cat.id
        );
        cat.isSubCategory = cat.subCategory.length === 0 ? false : true;
        cats.push(cat);
      }
    });

    dispatch({
      type: COURSES_OWNER_ACTION.UPDATE_CATEGORIES,
      payload: cats,
    });
  },
};
