import mongoose, { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  flyer: {
    type: String,
    required: true,
  },
  seats: [
    {
      type: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  bookedSeats: [
    {
      seat: String,
      mobile: String,
      email: String,
      attendee: [
        {
          name: String,
          age: String,
          gender: String,
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
