/**
 ** Define all the routes we want to have.
 ** I created an array of objects that define what path is mapped to what component.
**/

import {
  AccountCreationPending,
  Announcements,
  AnnouncementOverview,
  BookGuest,
  BookGuestSuccessfully,
  EditProfileStep1,
  EditProfileStep2,
  EditProfileStep3,
  EditProfileSuccessfully,
  GuestHistory,
  GuestOverview,
  GuestsHistory,
  Home,
  Login,
  MyGatePass,
  MyGuests,
  MyProfile,
  NoPage,
  Notifications,
  OnBoardingStep1,
  OnBoardingStep2,
  OnBoardingStep3,
  OnBoardingSuccessfully,
  Registration,
  ResetPassword,
  ResetPasswordOtp,
  ResetPasswordSuccessfully,
  SearchGuest,
  Verification
} from '../pages/index'

const routes = [
  {
    path: '/',
    component: <Login />
  },
  {
    path: '/login',
    component: <Login />
  },
  {
    path: '/registration',
    component: <Registration />
  },
  {
    path: '/verification',
    component: <Verification />
  },
  {
    path: '/reset-password-otp',
    component: <ResetPasswordOtp />
  },
  {
    path: '/reset-password',
    component: <ResetPassword />
  },
  {
    path: '/reset-password-successfully',
    component: <ResetPasswordSuccessfully />
  },
  {
    path: '/onboarding-step-1',
    component: <OnBoardingStep1 />
  },
  {
    path: '/onboarding-step-2',
    component: <OnBoardingStep2 />
  },
  {
    path: '/onboarding-step-3',
    component: <OnBoardingStep3 />
  },
  {
    path: '/onboarding-successfully',
    component: <OnBoardingSuccessfully />
  },
  {
    path: '/account-creation-pending',
    component: <AccountCreationPending />
  },
  {
    path: '/home',
    component: <Home />
  },
  {
    path: '/notifications',
    component: <Notifications />
  },
  {
    path: '/my-profile',
    component: <MyProfile />
  },
  {
    path: '/edit-profile-step-1',
    component: <EditProfileStep1 />
  },
  {
    path: '/edit-profile-step-2',
    component: <EditProfileStep2 />
  },
  {
    path: '/edit-profile-step-3',
    component: <EditProfileStep3 />
  },
  {
    path: '/edit-profile-successfully',
    component: <EditProfileSuccessfully />
  },
  {
    path: '/my-gate-pass',
    component: <MyGatePass />
  },
  {
    path: '/announcements',
    component: <Announcements />
  },
  {
    path: '/announcement',
    component: <AnnouncementOverview />
  },
  {
    path: '/my-guests',
    component: <MyGuests />
  },
  {
    path: '/guest-history',
    component: <GuestHistory />
  },
  {
    path: '/guest-overview',
    component: <GuestOverview />
  },
  {
    path: '/search-guest',
    component: <SearchGuest />
  },
  {
    path: '/book-guest',
    component: <BookGuest />
  },
  {
    path: '/book-guest-successfully',
    component: <BookGuestSuccessfully />
  },
  {
    path: '/guests-history',
    component: <GuestsHistory />
  },
  {
    path: '/*',
    component: <NoPage />
  }
]

export default routes