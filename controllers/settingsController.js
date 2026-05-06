import Settings from "../models/Settings.js";

// GET settings
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // if not exist create default
    if (!settings) {
      settings = await Settings.create({});
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE settings
export const updateSettings = async (req, res) => {
  try {
    const {
      gst,
      deliveryFee,
      contactPhone,
      contactEmail,
      contactAddress,
      bannerImage
    } = req.body;

    let settings = await Settings.findOne();

    // CREATE IF NOT EXISTS
    if (!settings) {
      settings = await Settings.create({
        gst: gst ?? 0,
        deliveryFee: deliveryFee ?? 0,
        contactPhone: contactPhone ?? "",
        contactEmail: contactEmail ?? "",
        contactAddress: contactAddress ?? "",
        bannerImage: bannerImage ?? ""
      });
    } else {
      // UPDATE ONLY PROVIDED FIELDS (SAFE PATCH STYLE)
      if (gst !== undefined) settings.gst = gst;
      if (deliveryFee !== undefined) settings.deliveryFee = deliveryFee;

      if (contactPhone !== undefined) settings.contactPhone = contactPhone;
      if (contactEmail !== undefined) settings.contactEmail = contactEmail;
      if (contactAddress !== undefined) settings.contactAddress = contactAddress;

      if (bannerImage !== undefined) settings.bannerImage = bannerImage;

      await settings.save();
    }

    res.json({
      message: "Settings updated successfully",
      settings
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};