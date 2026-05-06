import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";

/* ================= GET PROFILE ================= */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // get user (for email)
    const user = await User.findById(userId).select("email");

    // get profile
    let profile = await Profile.findOne({ user: userId });

    // if profile not exists → create empty one
    if (!profile) {
      profile = await Profile.create({ user: userId });
    }

    return res.status(200).json({
      success: true,
      email: user.email,
      profile,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= UPDATE PROFILE ================= */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      name,
      phone,
      address,
      city,
      state,
      pincode,
      altPhone,
      landmark,
    } = req.body;

    let profile = await Profile.findOne({ user: userId });

    // if profile not exists → create
    if (!profile) {
      profile = new Profile({ user: userId });
    }

    // update only allowed fields
    profile.name = name || profile.name;
    profile.phone = phone || profile.phone;
    profile.address = address || profile.address;
    profile.city = city || profile.city;
    profile.state = state || profile.state;
    profile.pincode = pincode || profile.pincode;
    profile.altPhone = altPhone || profile.altPhone;
    profile.landmark = landmark || profile.landmark;

    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};