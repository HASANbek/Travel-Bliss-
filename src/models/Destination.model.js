const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A destination must have a name'],
    trim: true,
    minlength: [3, 'Destination name must be at least 3 characters long'],
    maxlength: [100, 'Destination name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },
  tagline: {
    type: String,
    required: [true, 'A destination must have a tagline'],
    trim: true,
    maxlength: [200, 'Tagline cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'A destination must have a description'],
    minlength: [50, 'Description must be at least 50 characters long']
  },
  country: {
    type: String,
    required: [true, 'A destination must have a country'],
    trim: true
  },
  capital: {
    type: String,
    required: true,
    trim: true
  },
  currency: {
    type: String,
    required: true,
    trim: true
  },
  language: {
    type: String,
    required: true,
    trim: true
  },
  heroImage: {
    type: String,
    default: 'default-destination.jpg'
  },
  popularPlaces: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    mapLink: {
      type: String,
      required: true
    }
  }],
  features: [{
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }],
  seasons: [{
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    months: {
      type: String,
      required: true
    },
    temperature: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }],
  faq: [{
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create slug from name before saving
destinationSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  next();
});

// Index for better performance
destinationSchema.index({ slug: 1 });
destinationSchema.index({ country: 1 });
destinationSchema.index({ isActive: 1 });

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
