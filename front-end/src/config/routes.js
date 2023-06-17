/**
 ** Define all the routes we want to have.
 ** I created an array of objects that define what path is mapped to what component.
**/

import {
  AccountRegistrationPending,
  AccountRegistrationSuccessfully,
  Announcements,
  AnnouncementOverview,
  BookGuest,
  BookGuestSuccessfully,
  EditProfilePending,
  EditProfileStep1,
  EditProfileStep2,
  EditProfileStep3,
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
  RegistrationSuccessfully,
  ResetPasswordStep1,
  ResetPasswordStep2,
  ResetPasswordStep3,
  ResetPasswordSuccessfully,
  SearchGuest,
  Verification
} from '../pages'

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
    path: '/registration-successfully',
    component: <RegistrationSuccessfully />
  },
  {
    path: '/verification',
    component: <Verification />
  },
  {
    path: '/forgot-password',
    component: <ResetPasswordStep1 />
  },
  {
    path: '/forgot-password-otp',
    component: <ResetPasswordStep2 />
  },
  {
    path: '/reset-password',
    component: <ResetPasswordStep3 />
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
    path: '/account-registration-pending',
    component: <AccountRegistrationPending />
  },
  {
    path: '/account-registration-successfully',
    component: <AccountRegistrationSuccessfully />
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
    path: '/edit-profile-pending',
    component: <EditProfilePending />
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