# EmailJS Setup Guide for Fifth Stone Dev

This guide will help you set up EmailJS to handle form submissions and send email notifications to fifthstonedev@outlook.com.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (it's free for up to 200 emails/month)
3. Create your account

## Step 2: Connect Your Email Service

1. In the EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider (recommended: **Gmail** or **Outlook**)
4. Follow the connection steps:
   - For Gmail: Allow access and authenticate
   - For Outlook: Connect your Outlook account
5. **Copy your Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **"Email Templates"** in the dashboard
2. Click **"Create New Template"**
3. Use this template structure:

### Template Name
`fifth_stone_form_submission`

### Template Content

**Subject:**
```
{{form_type}} - {{from_name}}
```

**Body:**
```
New {{form_type}} from Fifth Stone Dev Website!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:    {{from_name}}
Email:   {{from_email}}
Phone:   {{phone}}
Company: {{company}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 REQUEST DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project Type: {{project_type}}
Timeline:     {{timeline}}
Budget:       {{budget}}
Tools:        {{tools}}
Website:      {{website}}

MESSAGE:
{{message}}

GOALS:
{{goals}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ SUBMITTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{{timestamp}}

---
Reply to this email to respond directly to {{from_name}}
```

4. Set **"To Email"** to: `{{to_email}}` (this allows dynamic recipient)
5. Set **"Reply To"** to: `{{from_email}}` (allows you to reply directly)
6. Save the template and **copy your Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"**
2. Find your **"Public Key"** (e.g., `user_123abc456def`)
3. Copy it

## Step 5: Update Your Website Code

Open `script.js` and find these lines (around line 43-45):

```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

Replace with your actual values:

```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';      // Your Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789';    // Your Template ID
const EMAILJS_PUBLIC_KEY = 'user_123abc456def';   // Your Public Key
```

### Security Note: Why This Is Safe

**These values are MEANT to be public** for client-side email services:

- ✅ **Public Key**: Designed to be exposed in browser code (it's in the name!)
- ✅ **Service ID & Template ID**: Just identifiers, not secrets
- ✅ **Private Key**: Stays secure on EmailJS servers (you never use it)

**How EmailJS Protects You:**
1. **Domain Whitelisting** (see Step 6 below)
2. **Rate Limiting** (prevents spam abuse)
3. **Email Template Locking** (you control what gets sent)
4. **No Billing Info Exposed** (worst case: they hit your rate limit)

This is similar to how Google Maps API keys or Firebase config objects work in production apps.

## Step 6: Test Your Forms

1. Open your website in a browser
2. Click "Send Us A Message" or any service request button
3. Fill out the form with test data
4. Submit and check your email at fifthstonedev@outlook.com

## Step 7: Enable Security Features (IMPORTANT!)

### 1. Restrict to Your Domain

In EmailJS Dashboard → **"Account"** → **"Security"**:

1. Find **"Allowed Domains"**
2. Add your domains:
   ```
   fifthstonedev.com
   www.fifthstonedev.com
   localhost (for testing)
   ```
3. Save

This prevents others from using your EmailJS account even if they copy your public key.

### 2. Enable reCAPTCHA (Recommended)

Protects against bot spam:

1. Go to [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Register your site (use reCAPTCHA v3 for invisible protection)
3. Get your **Site Key**
4. In EmailJS Dashboard → **"Account"** → **"Security"**
5. Add your reCAPTCHA Site Key
6. Update your forms to include reCAPTCHA (see EmailJS docs)

### 3. Monitor Usage

Check your EmailJS dashboard regularly:
- Watch for unusual spike in emails
- Set up usage alerts if available
- Review sent emails for suspicious activity

## Troubleshooting

### Emails Not Sending?

1. **Check Browser Console**: Press F12 and look for errors
2. **Verify Credentials**: Make sure IDs and keys are correct
3. **Check EmailJS Dashboard**: Look for failed email attempts
4. **Check Spam Folder**: Sometimes emails go to spam initially

### Rate Limits

- Free plan: 200 emails/month
- If you need more, upgrade to a paid plan ($9/month for 1,000 emails)

## Advanced: Additional Security Options

### Option 1: Use Environment Variables (If Using Build Tools)

If you're using Vite, Webpack, or similar:

```javascript
// In script.js
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

Then create `.env`:
```
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=user_123abc456def
```

**Note**: These still get bundled into your client code, but keeps them out of version control.

### Option 2: Backend Proxy (Maximum Security)

For enterprise-level security, create a backend endpoint:

**Your static site** → **Your backend API** → **EmailJS**

This way, credentials never touch the client. However, this requires:
- Backend server (Node.js, Python, etc.)
- More complexity and maintenance
- Usually overkill for contact forms

### Option 3: Serverless Functions

Use Netlify Functions, Vercel Edge Functions, or Cloudflare Workers:

```javascript
// netlify/functions/send-email.js
export async function handler(event) {
  const emailjs = require('@emailjs/nodejs');
  // Credentials in environment variables
  // Process and send email
}
```

Keeps credentials server-side while staying "serverless."

### What We Recommend for Fifth Stone Dev

**For your static site: Use the direct approach (Step 5) with domain restrictions (Step 7)**

This is:
- ✅ Industry standard for static sites
- ✅ Simple and maintainable  
- ✅ Secure enough for contact forms
- ✅ No server costs
- ✅ Used by thousands of production sites

Save the advanced options for if you add sensitive data handling or need enterprise compliance.

## Alternative: Contact Form Services

If you prefer a simpler solution, consider:
- **Formspree** (https://formspree.io/) - Simple form backend
- **Netlify Forms** (if hosting on Netlify) - Built-in form handling
- **Formspark** (https://formspark.io/) - Another simple option

## Support

If you need help:
- EmailJS Docs: https://www.emailjs.com/docs/
- Support: support@emailjs.com
