import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import HomePage from "./components/HomePage";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import AdminEnrollmentList from "./components/admin/AdminEnrollmentList";
import SubmitQuizList from "./components/admin/SubmitQuizList";
import RetakeQuizList from "./components/admin/RetakeQuizList";

import NewUser from "./components/admin/NewUser";

import CourseList from "./components/admin/CourseList";
import NewCourse from "./components/admin/NewCourse";
import UpdateCourse from "./components/admin/UpdateCourse";

import NewModule from "./components/admin/NewModule";
import UpdateModule from "./components/admin/UpdateModule";

import Courses from "./components/course/Courses";

import CourseDetails from "./components/course/CourseDetails";
import ModuleDetails from "./components/course/ModuleDetails";

import NewChapter from "./components/admin/NewChapter";
import ChapterDetails from "./components/course/ChapterDetails";
import UpdateChapter from "./components/admin/UpdateChapter";

import NewLesson from "./components/admin/NewLesson";
import LessonDetails from "./components/course/LessonDetails";
import UpdateLesson from "./components/admin/UpdateLesson";

import NewEnrollment from "./components/admin/NewEnrollment";
import EnrollmentDetails from "./components/enrollment/EnrollmentDetails";
import EnrollmentList from "./components/enrollment/EnrollmentList";
import EnrollmentModule from "./components/enrollment/EnrollmentModule";
import EnrollmentChapter from "./components/enrollment/EnrollmentChapter";
import EnrollmentLesson from "./components/enrollment/EnrollmentLesson";
import EnrollmentQuiz from "./components/enrollment/EnrollmentQuiz";

import NewQuiz from "./components/admin/NewQuiz";
import UpdateQuiz from "./components/admin/UpdateQuiz";
import QuizDetails from "./components/course/QuizDetails";

import NewFeedback from "./components/feedback/NewFeedback";

import ImportUser from "./components/admin/ImportUser";

import NewForum from "./components/admin/NewForum";
import ForumDetails from "./components/forum/ForumDetails";
import EnrollmentForum from "./components/enrollment/EnrollmentForum";
import UpdateForum from "./components/admin/UpdateForum";
import ForumsList from "./components/admin/ForumList";
import UpdateReply from "./components/forum/UpdateReply";

import Barcino from "./components/home/Barcino";
import Bluesmith from "./components/home/Bluesmith";
import MeatDepot from "./components/home/MeatDepot";
import SingleOrigin from "./components/home/SingleOrigin";

import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import store from "./store";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const mainDivStyle = isHomePage ? { margin: 0 } : { marginTop: "90px" };
  return (
    <div className="App">
      <Header />
      <div style={mainDivStyle}>
        <Routes>
          <Route path="/courses" element={<Courses />} exact="true" />
          <Route
            path="/product/:id"
            element={<ProductDetails />}
            exact="true"
          />
          <Route path="/search/:keyword" element={<Home />} exact="true" />
          <Route path="/login" element={<Login />} exact="true" />
          <Route path="/register" element={<Register />} exact="true" />
          <Route
            path="/password/forgot"
            element={<ForgotPassword />}
            exact="true"
          />
          <Route
            path="/password/reset/:token"
            element={<NewPassword />}
            exact="true"
          />
          <Route path="/cart" element={<Cart />} exact="true" />

          <Route
            path="/me"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
            exact="true"
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <NewFeedback />
              </ProtectedRoute>
            }
            exact="true"
          />
          <Route
            path="/me/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
            exact="true"
          />
          <Route
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
            exact="true"
          />

          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
            exact="true"
          />

          <Route
            path="/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/me"
            element={
              <ProtectedRoute>
                <ListOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true}>
                <OrdersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/order/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProcessOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true}>
                <UsersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductReviews />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/newUser"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute isAdmin={true}>
                <CourseList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/course"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewCourse />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/showCourses"
            element={
              <ProtectedRoute isAdmin={true}>
                <Courses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/courseDetails/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <CourseDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courseDetails/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <CourseDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/moduleDetails/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <ModuleDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/chapterDetails/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <ChapterDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/lessonDetails/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <LessonDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/quizDetails/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <QuizDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/course/:id/module"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewModule />
              </ProtectedRoute>
            }
          />

          <Route
            path="/enrollment/:id"
            element={
              <ProtectedRoute>
                <EnrollmentDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/enrollment/:id/module/:moduleId"
            element={
              <ProtectedRoute>
                <EnrollmentModule />
              </ProtectedRoute>
            }
          />

          <Route
            path="/enrollment/:enrollmentId/module/:moduleId/chapter/:chapterId"
            element={
              <ProtectedRoute>
                <EnrollmentChapter />
              </ProtectedRoute>
            }
          />

          <Route
            path="/enrollment/:enrollmentId/module/:moduleId/chapter/:chapterId/lesson/:lessonId"
            element={
              <ProtectedRoute>
                <EnrollmentLesson />
              </ProtectedRoute>
            }
          />

          <Route
            path="/enrollment/:enrollmentId/module/:moduleId/chapter/:chapterId/quiz/:quizId"
            element={
              <ProtectedRoute>
                <EnrollmentQuiz />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/module/:moduleId/chapter/new"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewChapter />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/chapter/:chapterId/lesson/new"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewLesson />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/chapter/:chapterId/quiz/new"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewQuiz />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/enrollment/new"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewEnrollment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/enrollment/me"
            element={
              <ProtectedRoute>
                <EnrollmentList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/course/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/module/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateModule />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/chapter/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateChapter />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/lesson/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateLesson />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/quiz/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateQuiz />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/enrollments"
            element={
              <ProtectedRoute isAdmin={true}>
                <AdminEnrollmentList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/quizzes"
            element={
              <ProtectedRoute isAdmin={true}>
                <SubmitQuizList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/retake"
            element={
              <ProtectedRoute isAdmin={true}>
                <RetakeQuizList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/import/user"
            element={
              <ProtectedRoute isAdmin={true}>
                <ImportUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/module/:moduleId/forum/new"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewForum />
              </ProtectedRoute>
            }
          />

          <Route
            path="/forumDetails/:id"
            element={
              <ProtectedRoute>
                <ForumDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/forum/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateForum />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/forums"
            element={
              <ProtectedRoute isAdmin={true}>
                <ForumsList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/forum/:forumId/reply/:replyId"
            element={
              <ProtectedRoute>
                <UpdateReply />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<HomePage />} exact="true" />
          {/* <Route
            path="/"
            element={user.company === "None" ? <HomePage /> : null}
            exact={true}
          /> */}

          {user && user.company && (
            <>
              {/* Route for Barcino */}
              {user.company === "Barcino" && (
                <Route
                  path="/barcino"
                  element={
                    <ProtectedRoute>
                      <Barcino />
                    </ProtectedRoute>
                  }
                />
              )}

              {/* Route for Meat Depot */}
              {user.company === "Meat Depot" && (
                <Route
                  path="/meat-depot"
                  element={
                    <ProtectedRoute>
                      <MeatDepot />
                    </ProtectedRoute>
                  }
                />
              )}

              {/* Routes for Single Origin */}
              {user.company === "Single Origin" && (
                <>
                  <Route
                    path="/single-origin"
                    element={
                      <ProtectedRoute>
                        <SingleOrigin />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/bluesmith"
                    element={
                      <ProtectedRoute>
                        <Bluesmith />
                      </ProtectedRoute>
                    }
                  />
                </>
              )}
            </>
          )}
        </Routes>
      </div>

      {!isHomePage && <Footer />}
    </div>
  );
}

export default App;
