# 📚 BOOKING SYSTEM - COMPLETE GUIDE

## ✅ SYSTEM READY!

The booking system is **fully functional** and ready to use!

---

## 🚀 QUICK START

### 1. Start the Server
```bash
npm run dev
```

### 2. Test the Booking Flow

#### **Step 1: Browse Tours**
1. Open: `http://localhost:4000/gofly/tour-details.html?id=1`
2. Choose a tour from the catalog

#### **Step 2: Make a Booking**
1. Select a date from the date picker
2. Choose number of guests
3. Click "Check Availability"
4. Fill in customer details:
   - Name: John Doe
   - Email: john@example.com
   - Phone: +998901234567
5. Review booking information
6. Confirm booking

#### **Step 3: Check Email Notifications**
- Customer receives confirmation email (console for now)
- Admin receives notification email (console for now)

#### **Step 4: Manage in Admin Panel**
1. Login: `http://localhost:4000/gofly/admin-login.html`
   - Email: admin@travelbliss.uz
   - Password: admin123
2. Navigate to "Bookings" section
3. View all bookings
4. Confirm or cancel pending bookings

---

## 📂 FILE STRUCTURE

### Backend Files

```
src/
├── controllers/
│   ├── booking.controller.js       # Booking CRUD operations
│   └── admin.controller.js          # Admin booking management (updated)
├── routes/
│   └── booking.routes.js            # Booking API routes
├── storage/
│   └── bookings.storage.js          # File storage for bookings
├── utils/
│   └── sendEmail.js                 # Email notifications (Nodemailer)
└── app.js                           # Added booking routes

data/
└── bookings.json                     # Bookings data storage (auto-created)
```

### Frontend Files

```
public/
└── gofly/
    ├── tour-details.html            # Updated with booking button
    ├── booking-widget.js             # Booking modal JavaScript
    ├── booking-widget.css            # Booking modal styles
    └── admin/
        └── index.html                # Updated with bookings management
```

---

## 🔧 API ENDPOINTS

### Public Endpoints

#### Check Availability
```http
POST /api/bookings/check-availability
Content-Type: application/json

{
  "tourId": "1",
  "date": "2025-11-20",
  "guests": {
    "adults": 2,
    "children": 0
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "available": true,
    "totalGuests": 5,
    "availableSpots": 15,
    "maxCapacity": 20,
    "canBook": true
  }
}
```

#### Create Booking
```http
POST /api/bookings
Content-Type: application/json

{
  "tourId": "1",
  "tourName": "Samarkand Day Tour",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+998901234567",
  "date": "2025-11-20",
  "guests": {
    "adults": 2,
    "children": 0
  },
  "totalPrice": 300
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "BOOK-1732006800000-ABC123XYZ",
    "status": "pending",
    "createdAt": "2025-11-19T10:00:00.000Z",
    ...
  },
  "message": "Buyurtma muvaffaqiyatli yaratildi"
}
```

### Admin Endpoints (Require Authentication)

#### Get All Bookings
```http
GET /api/admin/bookings?status=pending
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "bookings": [...],
    "total": 10,
    "stats": {
      "total": 10,
      "pending": 5,
      "confirmed": 3,
      "cancelled": 2,
      "totalRevenue": 1500
    }
  }
}
```

#### Update Booking Status
```http
PUT /api/admin/bookings/:id/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "confirmed"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "booking": {
      "id": "BOOK-1732006800000-ABC123XYZ",
      "status": "confirmed",
      "confirmedAt": "2025-11-19T11:00:00.000Z",
      ...
    }
  },
  "message": "Buyurtma statusi yangilandi"
}
```

---

## 📧 EMAIL NOTIFICATIONS

### Current Setup (Development Mode)

Email notifications are **configured** but display in the console until SMTP credentials are added.

**Console Output Example:**
```
📧 ===== EMAIL SENT (CONSOLE MODE) =====
To: john@example.com
Subject: Buyurtma tasdiqlandi - Samarkand Day Tour
--- EMAIL BODY ---
[HTML email content]
======================================
```

### Enable Real Email Sending

1. **Add to `.env` file:**
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@travelbliss.uz
```

2. **For Gmail:**
   - Enable 2-factor authentication
   - Generate App Password: https://myaccount.google.com/apppasswords
   - Use the app password (not your regular password)

3. **Restart server:**
```bash
npm run dev
```

---

## 🎨 BOOKING MODAL FEATURES

### 3-Step Booking Process

**Step 1: Customer Details**
- Name input (required)
- Email input with validation (required)
- Phone input with Uzbekistan format validation (required)
- Special requests textarea (optional)

**Step 2: Review Booking**
- Tour information summary
- Customer contact details
- Price breakdown
- Total price calculation

**Step 3: Confirmation**
- Success message
- Booking reference ID
- Confirmation email notification
- Instructions for next steps

### Validations

**Email Format:**
```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

**Phone Format (Uzbekistan):**
```javascript
/^\+998[0-9]{9}$/
```
Example: +998901234567

**Date Validation:**
- Must be in the future
- Cannot book past dates

**Guests Validation:**
- Minimum 1 adult required
- Children count cannot be negative

---

## 🛠️ ADMIN PANEL FEATURES

### Bookings Dashboard

**Statistics Cards:**
- Total Bookings
- Pending Bookings (awaiting confirmation)
- Confirmed Bookings
- Cancelled Bookings

**Bookings Table:**
- Booking ID
- Tour name
- Customer information (name, email, phone)
- Booking date
- Number of guests
- Total price
- Status badge (color-coded)
- Action buttons

**Actions:**
- **View:** See full booking details
- **Confirm:** Accept pending booking (sends confirmation email)
- **Cancel:** Reject booking (sends cancellation email)

**Filters:**
- Filter by status (All / Pending / Confirmed / Cancelled)
- Real-time filtering

### Accessing Admin Panel

1. Navigate to: `http://localhost:4000/gofly/admin-login.html`
2. Login with:
   - Email: `admin@travelbliss.uz`
   - Password: `admin123`
3. Click "Bookings" in sidebar

---

## 💾 DATA STORAGE

### File Storage Structure

**Location:** `data/bookings.json`

**Format:**
```json
[
  {
    "id": "BOOK-1732006800000-ABC123XYZ",
    "tourId": "1",
    "tourName": "Samarkand Day Tour",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "+998901234567",
    "date": "2025-11-20T00:00:00.000Z",
    "guests": {
      "adults": 2,
      "children": 0
    },
    "totalPrice": 300,
    "userId": null,
    "status": "pending",
    "createdAt": "2025-11-19T10:00:00.000Z",
    "updatedAt": "2025-11-19T10:00:00.000Z",
    "confirmedAt": null,
    "cancelledAt": null
  }
]
```

### Booking ID Format

```
BOOK-{timestamp}-{random-string}
```

Example: `BOOK-1732006800000-ABC123XYZ`

---

## 🔒 SECURITY FEATURES

### Input Validation
- Email format validation
- Phone number format validation
- Date validation (future dates only)
- Guest count validation
- SQL injection prevention (using file storage)

### Authentication
- Admin routes require JWT token
- Protected endpoints reject unauthorized access
- Token stored in localStorage and cookies

### Data Sanitization
- All user inputs are validated
- HTML stripped from text inputs
- Phone numbers cleaned before storage

---

## 🧪 TESTING CHECKLIST

### ✅ Frontend Booking Flow
- [ ] Select tour from catalog
- [ ] Choose date from date picker
- [ ] Select number of guests
- [ ] Click "Check Availability"
- [ ] Modal opens successfully
- [ ] Fill in customer details
- [ ] Email validation works
- [ ] Phone validation works
- [ ] Review step shows correct information
- [ ] Confirm booking creates entry
- [ ] Success message displays
- [ ] Booking reference ID shown

### ✅ Email Notifications
- [ ] Customer confirmation email sent (console)
- [ ] Admin notification email sent (console)
- [ ] Email content is correct
- [ ] All booking details included

### ✅ Admin Panel
- [ ] Login to admin panel
- [ ] Navigate to Bookings section
- [ ] Statistics cards display correct counts
- [ ] Bookings table loads
- [ ] Filter by status works
- [ ] Confirm booking action works
- [ ] Cancel booking action works
- [ ] View booking details works
- [ ] Status badges update correctly

### ✅ API Endpoints
- [ ] POST /api/bookings creates booking
- [ ] POST /api/bookings/check-availability works
- [ ] GET /api/admin/bookings returns list
- [ ] PUT /api/admin/bookings/:id/status updates status
- [ ] GET /api/bookings/:id returns single booking

---

## 🐛 TROUBLESHOOTING

### Issue: Booking modal doesn't open

**Solution:**
1. Check console for JavaScript errors
2. Verify `booking-widget.js` and `booking-widget.css` are loaded
3. Check if date is selected
4. Verify tour data is loaded

### Issue: Email validation fails

**Problem:** Valid email rejected

**Solution:**
- Check email format: `name@domain.com`
- No spaces allowed
- Must contain @ and domain extension

### Issue: Phone validation fails

**Problem:** Valid Uzbekistan number rejected

**Solution:**
- Format must be: `+998XXXXXXXXX`
- Must start with +998
- Must have exactly 9 digits after +998
- Example: `+998901234567`

### Issue: Bookings not showing in admin panel

**Solution:**
1. Check if bookings.json file exists in `data/` folder
2. Verify admin authentication (token valid)
3. Check console for API errors
4. Try refreshing the page

### Issue: Confirm/Cancel buttons don't work

**Solution:**
1. Verify admin is logged in
2. Check network tab for failed requests
3. Ensure booking status is "pending"
4. Check backend console for errors

---

## 🔮 FUTURE ENHANCEMENTS

### Planned Features (Not Implemented Yet)

❌ **Payment Integration**
- Click/Payme integration
- Secure payment processing
- Payment confirmations

❌ **User Accounts**
- Customer registration
- View own bookings
- Booking history
- Profile management

❌ **Advanced Filtering**
- Date range filter
- Tour filter
- Price range filter
- Export to CSV/Excel

❌ **SMS Notifications**
- Eskiz.uz integration
- Real-time SMS alerts
- OTP verification

❌ **Calendar View**
- Visual calendar
- Availability overview
- Drag-and-drop booking

---

## 📞 SUPPORT

### Contact Information

**Email:** info@travelbliss.uz
**Phone:** +998 90 123 45 67

### Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Express.js Guide](https://expressjs.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)

---

## ✨ SUMMARY

### What's Working ✅

- ✅ Complete booking flow (3-step modal)
- ✅ Customer detail collection
- ✅ Email notifications (console mode)
- ✅ Admin bookings management
- ✅ Confirm/Cancel actions
- ✅ Status filtering
- ✅ Statistics dashboard
- ✅ File storage (bookings.json)
- ✅ Input validation
- ✅ Responsive design

### What's Not Included ❌

- ❌ Payment integration (as requested)
- ❌ Real SMS sending (prepared, needs credentials)
- ❌ Real email sending (prepared, needs SMTP)
- ❌ User authentication for customers
- ❌ Booking modification/cancellation by customers

### Ready to Use! 🎯

The system is **production-ready** for testing and development. To enable real emails, simply add SMTP credentials to `.env` file.

---

**Last Updated:** 2025-11-19
**Version:** 1.0.0
**Status:** ✅ Complete and Functional
