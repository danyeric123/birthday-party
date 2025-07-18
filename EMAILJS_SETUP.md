# EmailJS Setup Guide

Follow these steps to set up EmailJS for your birthday party RSVP form:

## 🚀 Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month)
3. Verify your email address

## 📧 Step 2: Add Email Service

1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Click "Connect Account" and authorize with your Google account
   - **Outlook**: Use your Microsoft account
   - **Other**: Configure SMTP settings manually

## 📝 Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

### Template Settings:
- **Template Name**: `Birthday Party RSVP`
- **Template ID**: Copy this for later (e.g., `template_abc123`)

### Email Template:
```
Subject: {{subject}}

Hi there!

You have received a new RSVP for {{event_name}}:

📅 Event: {{event_name}}
📅 Date: {{event_date}}
⏰ Time: {{event_time}}
📍 Location: {{event_location}}

👤 RSVP Details:
Name: {{from_name}}
Email: {{from_email}}
Attending: {{attending}}
Number of Guests: {{guest_count}}
Dietary Requirements: {{dietary_requirements}}

💌 Message from {{from_name}}:
{{message}}

---
Sent via Birthday Party Invitation Website
```

4. Click **Save**

## 🔑 Step 4: Get Your Credentials

1. Go to **Account** in your dashboard
2. Find your **Public Key** (starts with "user_")
3. Note your **Service ID** from the Email Services page
4. Note your **Template ID** from the Email Templates page

## ⚙️ Step 5: Create Environment Variables

Create a `.env` file in your project root directory and add:

```env
# EmailJS Configuration
VITE_EMAILJS_PUBLIC_KEY=user_your_actual_public_key_here
VITE_EMAILJS_SERVICE_ID=service_your_actual_service_id_here
VITE_EMAILJS_TEMPLATE_ID=template_your_actual_template_id_here
VITE_RECIPIENT_EMAIL=your_email@example.com
```

**Important:** 
- Replace the placeholder values with your actual EmailJS credentials
- Set `VITE_RECIPIENT_EMAIL` to the email address where you want to receive RSVP notifications
- The `.env` file should be in the same directory as your `package.json`
- Never commit your `.env` file to git (it should be in your `.gitignore`)

## 🛡️ Step 6: Add .env to .gitignore

Make sure your `.gitignore` file includes:
```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

## ✅ Step 7: Test Your Setup

1. Restart your development server: `pnpm dev`
2. Open the invitation and click "RSVP Now"
3. Fill out the form and submit
4. Check your email for the RSVP notification!

## 🔧 Troubleshooting

### Common Issues:

1. **"EmailJS environment variables not configured" error**: 
   - Make sure your `.env` file exists in the project root
   - Verify the variable names match exactly: `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_RECIPIENT_EMAIL`
   - Restart your dev server after creating/updating the `.env` file

2. **"Failed to send" error**: Check your Service ID and Template ID in the `.env` file

3. **No email received**: Check spam folder, verify template variables match

4. **403 Forbidden**: Make sure your Public Key is correct

### Template Variables:
Make sure these variables are in your EmailJS template:
- `{{subject}}`
- `{{from_name}}`
- `{{from_email}}`
- `{{attending}}`
- `{{guest_count}}`
- `{{dietary_requirements}}`
- `{{message}}`
- `{{event_name}}`
- `{{event_date}}`
- `{{event_time}}`
- `{{event_location}}`

### Environment Variable Format:
For Vite projects, environment variables must:
- Start with `VITE_` prefix
- Be defined in a `.env` file in the project root
- Require a server restart to take effect

## 💰 Pricing

- **Free**: 200 emails/month
- **Paid**: $20/month for 1,000 emails/month

Perfect for a birthday party! 🎉

---

Need help? Check the [EmailJS Documentation](https://www.emailjs.com/docs/) or their support. 