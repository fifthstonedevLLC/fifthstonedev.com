# Email Form Handler Setup Guide

Follow these steps to send form submissions directly to your email with distinct subjects for easy filtering.

## 📝 Step-by-Step Setup (10 minutes)

### Step 1: Create Apps Script Project

1. Go to [Google Apps Script](https://script.google.com)
2. Click **+ New project**
3. Name it: `Fifth Stone Dev Form Handler`

### Step 2: Add the Script

1. Delete any existing code in the editor
2. Copy the entire contents of `google-apps-script.js` (in this folder)
3. Paste into the Apps Script editor
4. **IMPORTANT**: Update line 13 with your email:
   ```javascript
   notificationEmail: 'YOUR_EMAIL@example.com',
   ```
5. Click **Save** (💾 icon)

### Step 3: Test the Script

Test each form type to ensure emails are working:

1. Select function dropdown → Choose `testWebDevForm`
2. Click **Run** (▶️ icon)
3. First time: Click **Review permissions** → Choose your account → **Advanced** → **Go to Form Handler (unsafe)** → **Allow**
4. Check your email - you should receive an email with subject: `[Fifth Stone Dev] Web Development Request`
5. Repeat with `testAutomationForm` and `testConsultingForm` to test all three form types

### Step 4: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ → Select **Web app**
3. Configure:
   - **Description**: `Form email handler`
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
4. Click **Deploy**
5. Click **Authorize access** if prompted
6. **COPY THE WEB APP URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```

### Step 5: Update Your Website Code

1. Open `script.js` in your website folder
2. Find line 28 (look for `GOOGLE_SCRIPT_URL`)
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with the URL you copied:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz.../exec';
   ```
4. Save the file

### Step 6: Set Up Email Filters (Optional but Recommended)

Create email rules to automatically organize your form submissions:

#### Gmail:
1. Open Gmail
2. Search for: `subject:"[Fifth Stone Dev] Web Development Request"`
3. Click the three dots ⋮ → **Filter messages like these**
4. Check **Skip Inbox** and **Apply label** → Create new label: `Fifth Stone/Web Dev`
5. Click **Create filter**
6. Repeat for:
   - `[Fifth Stone Dev] Process Automation Request` → Label: `Fifth Stone/Automation`
   - `[Fifth Stone Dev] Strategic Consulting Request` → Label: `Fifth Stone/Consulting`

#### Outlook:
1. Right-click an email with the subject
2. **Rules** → **Create Rule**
3. Set condition: Subject contains `[Fifth Stone Dev] Web Development Request`
4. Set action: Move to folder → Create new folder: `Fifth Stone\Web Dev`
5. Repeat for other form types

### Step 7: Test Your Forms!

1. Open your website (`index.html`)
2. Click on a service card (Web Development, Automation, or Consulting)
3. Fill out the form
4. Click **Submit Request**
5. Check your email - you should receive a notification with the correct subject!
6. If you set up filters, the email should be in the correct folder/label

---

## 📧 Email Subjects

Each form type gets a unique subject for easy filtering:

- **Web Development**: `[Fifth Stone Dev] Web Development Request`
- **Process Automation**: `[Fifth Stone Dev] Process Automation Request`
- **Strategic Consulting**: `[Fifth Stone Dev] Strategic Consulting Request`

---

## 🔧 Troubleshooting

### No emails arriving

**Check:**
1. Verify your email in `google-apps-script.js` line 13
2. Check your spam/junk folder
3. Run test functions in Apps Script and check for errors
4. Make sure you granted email permissions when prompted

### "Authorization required" error

**Solution**: 
1. Go to Apps Script
2. Run any test function (`testWebDevForm`)
3. Click **Review permissions** and allow access
4. Redeploy the web app

### Emails go to spam

**Solution**: 
1. Mark one email as "Not Spam"
2. Add the sender to your contacts
3. This is normal for Apps Script emails initially

### Can't reply to submitter

**Note**: Emails include reply-to address set to the form submitter, so you can simply hit "Reply" to respond directly to them.

---

## ✨ Email Features

### What You Get in Each Email:

- **Distinct subject line** for each form type
- **Contact information**: Name, email, phone, company
- **All form details**: Organized and formatted
- **Timestamp**: When the form was submitted
- **Reply-to**: Set to submitter's email for easy responses

### Example Email:

```
Subject: [Fifth Stone Dev] Web Development Request

New Web Development request from Fifth Stone Dev website!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:    John Smith
Email:   john@example.com
Phone:   555-1234
Company: Acme Corp

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 REQUEST DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project Type: New Website
Timeline: 2-3 months
Budget: $5,000 - $10,000

Project Details:
Looking to build a modern e-commerce website...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ SUBMITTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Monday, January 6, 2026 at 2:30 PM EST
```

---

## 🎨 Customization

### Change Email Subjects

Edit lines 15-19 in `google-apps-script.js`:

```javascript
emailSubjects: {
  'webDev': '[Your Company] Web Dev Inquiry',
  'automation': '[Your Company] Automation Inquiry',
  'consulting': '[Your Company] Consulting Inquiry'
}
```

### Add Auto-Reply to Submitter

Add this after the main email is sent (around line 114):

```javascript
// Send confirmation to submitter
MailApp.sendEmail({
  to: data.email,
  subject: 'Thank you for contacting Fifth Stone Dev',
  body: `Hi ${data.name},\n\nThank you for your interest! We've received your ${formTypeName.toLowerCase()} request and will get back to you within 24 hours.\n\nBest regards,\nFifth Stone Dev Team`
});
```

### Forward to Multiple Recipients

Change line 13 to include multiple emails:

```javascript
notificationEmail: 'your-email@example.com, partner@example.com',
```

---

## 📊 Tracking Your Leads

Since emails are your database, consider:

1. **Use Labels/Folders**: Organize by form type
2. **Star Important**: Mark high-value leads
3. **Follow-up Reminders**: Use "Snooze" feature
4. **Export**: Forward to CRM or save to spreadsheet manually
5. **Search**: Use Gmail's powerful search (e.g., `from:@example.com label:fifth-stone`)

---

## 🔒 Daily Limits

Gmail free accounts: **100 emails/day**
Google Workspace: **1,500 emails/day**

If you exceed limits, you'll see an error. Consider upgrading to Google Workspace or using a paid service.

---

Your forms are now set up to send organized, filterable emails! 🎉
