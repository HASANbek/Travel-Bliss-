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
  city: {
    type: String,
    trim: true
  },
  capital: {
    type: String,
    trim: true
  },
  currency: {
    type: String,
    trim: true
  },
  language: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true,
    lowercase: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  shortDesc: {
    type: String,
    trim: true,
    maxlength: [500, 'Short description cannot exceed 500 characters']
  },
  heroImage: {
    type: String,
    default: 'default-destination.jpg'
  },
  coverImage: {
    type: String
  },
  galleryImages: [{
    type: String
  }],
  videoUrl: {
    type: String,
    trim: true
  },
  bestTime: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  cost: {
    type: String,
    trim: true
  },
  transport: {
    type: String,
    trim: true
  },
  mustVisit: [{
    type: String,
    trim: true
  }],
  weather: {
    type: String,
    trim: true
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
  metaTitle: {
    type: String,
    trim: true
  },
  metaDesc: {
    type: String,
    trim: true
  },
  keywords: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  homepage: {
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
destinationSchema.index({ category: 1 });

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
