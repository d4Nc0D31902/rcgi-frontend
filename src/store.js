import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducers";

import {
  coursesReducer,
  courseDetailsReducer,
  newCourseReducer,
  courseReducer,
  addModuleReducer,
} from "./reducers/courseReducers";

import {
  modulesReducer,
  moduleDetailsReducer,
  newModuleReducer,
  moduleReducer,
  newForumReducer,
  reorderModuleReducer,
} from "./reducers/moduleReducers";

import {
  chaptersReducer,
  chapterDetailsReducer,
  newChapterReducer,
  chapterReducer,
  addLessonReducer,
  addQuizReducer,
  reorderChapterItemsReducer,
} from "./reducers/chapterReducers";

import {
  notificationsReducer,
  notificationDetailsReducer,
  newNotificationReducer,
  notificationReducer,
  markNotificationAsReadReducer,
  markAllNotificationsAsReadReducer,
} from "./reducers/notificationReducers";

import {
  lessonsReducer,
  lessonDetailsReducer,
  newLessonReducer,
  lessonReducer,
} from "./reducers/lessonReducers";

import {
  quizzesReducer,
  quizDetailsReducer,
  newQuizReducer,
  quizReducer,
} from "./reducers/quizReducers";

import {
  newEnrollmentReducer,
  myEnrollmentsReducer,
  enrollmentDetailsReducer,
  allEnrollmentsReducer,
  enrollmentReducer,
  getEnrollmentModuleReducer,
  getEnrollmentChapterReducer,
  getSingleLessonReducer,
  getSingleQuizReducer,
  markChapterAsDoneReducer,
  markLessonAsDoneReducer,
  markQuizAsDoneReducer,
  markModuleAsDoneReducer,
  createSubmitReducer,
  createRetakeReducer,
  checkProgressReducer,
  createReplyReducer,
} from "./reducers/enrollmentReducers";

import {
  feedbacksReducer,
  feedbackDetailsReducer,
  newFeedbackReducer,
  feedbackReducer,
} from "./reducers/feedbackReducers";

import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
  customerSalesReducer,
  addUserReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  orderReducer,
} from "./reducers/orderReducers";
import {
  salesPerMonthReducer,
  productSalesReducer,
} from "./reducers/chartReducers";
import {
  forumsReducer,
  forumReducer,
  forumDetailsReducer,
  // createReplyReducer,
  createForumReducer,
} from "./reducers/forumReducers";
const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  customerSales: customerSalesReducer,
  salesPerMonth: salesPerMonthReducer,
  productSales: productSalesReducer,
  courses: coursesReducer,
  courseDetails: courseDetailsReducer,
  newCourse: newCourseReducer,
  course: courseReducer,
  modules: modulesReducer,
  moduleDetails: moduleDetailsReducer,
  newModule: newModuleReducer,
  module: moduleReducer,
  addModule: addModuleReducer,
  chapters: chaptersReducer,
  chapterDetails: chapterDetailsReducer,
  newChapter: newChapterReducer,
  markChapterAsDone: markChapterAsDoneReducer,
  chapter: chapterReducer,
  addLesson: addLessonReducer,
  lessons: lessonsReducer,
  lessonDetails: lessonDetailsReducer,
  newLesson: newLessonReducer,
  lesson: lessonReducer,
  markLessonAsDone: markLessonAsDoneReducer,
  newEnrollment: newEnrollmentReducer,
  myEnrollment: myEnrollmentsReducer,
  enrollmentDetails: enrollmentDetailsReducer,
  allEnrollments: allEnrollmentsReducer,
  enrollment: enrollmentReducer,
  addQuiz: addQuizReducer,
  quizzes: quizzesReducer,
  quizDetails: quizDetailsReducer,
  newQuiz: newQuizReducer,
  quiz: quizReducer,
  getEnrollmentModule: getEnrollmentModuleReducer,
  getEnrollmentChapter: getEnrollmentChapterReducer,
  getSingleLesson: getSingleLessonReducer,
  getSingleQuiz: getSingleQuizReducer,
  markChapterAsDone: markChapterAsDoneReducer,
  markLessonAsDone: markLessonAsDoneReducer,
  markQuizAsDone: markQuizAsDoneReducer,
  markModuleAsDone: markModuleAsDoneReducer,
  createSubmit: createSubmitReducer,
  createRetake: createRetakeReducer,
  checkProgress: checkProgressReducer,
  notifications: notificationsReducer,
  notificationDetails: notificationDetailsReducer,
  newNotification: newNotificationReducer,
  notification: notificationReducer,
  markNotificationAsRead: markNotificationAsReadReducer,
  markAllNotificationsAsRead: markAllNotificationsAsReadReducer,
  feedbacks: feedbacksReducer,
  feedbackDetails: feedbackDetailsReducer,
  newFeedback: newFeedbackReducer,
  feedback: feedbackReducer,
  forums: forumsReducer,
  forum: forumReducer,
  forumDetails: forumDetailsReducer,
  // createReply: createReplyReducer,
  newForum: newForumReducer,
  createForum: createForumReducer,
  createReply: createReplyReducer,
  reorderChapterItems: reorderChapterItemsReducer,
  addUser: addUserReducer,
  reorderModule: reorderModuleReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
