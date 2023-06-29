import asyncHandler from 'express-async-handler'

import { Announcement, User } from '../models/index.js'

// @desc    Fetch announcement
// @route   POST /api/announcement/fetch-announcements
// @access  Public
const fetchAnnouncements = asyncHandler(async (req, res) => {
  const announcements = await Announcement.find()

  return res.status(200).json(announcements)
})

// @desc    Post announcement
// @route   POST /api/announcement/post-announcement
// @access  Public
const postAnnouncement = asyncHandler(async (req, res) => {
  const {
    heading,
    body,
    isPin,
    emailAddress
  } = req.body

  const user = await User.findOne({ emailAddress })

  // Check if there's an announcement pinned 
  const announcementPinned = await Announcement.findOne({ isPin: true })

  if (announcementPinned) {
    const announcement = await Announcement.create({
      postedBy: user._id,
      heading,
      body,
      datePosted: Date.now(),
      isPin: false
    })

    if (announcement) {
      return res.status(200).json(announcement)
    }
  } else {
    const announcement = await Announcement.create({
      postedBy: user._id,
      heading,
      body,
      datePosted: Date.now(),
      isPin
    })

    if (announcement) {
      return res.status(200).json(announcement)
    }
  }

  res.status(400).json({ errorMessage: `Error. There's a problem encountered.` })
  throw new Error('Error.')
})

export {
  fetchAnnouncements,
  postAnnouncement
}