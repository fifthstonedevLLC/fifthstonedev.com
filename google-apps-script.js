/**
 * Fifth Stone Dev - Form Submission Handler
 * 
 * This Google Apps Script receives form submissions from your website
 * and stores them in a Google Sheet.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Add these column headers in Row 1:
 *    A: Timestamp | B: Form Type | C: Name | D: Email | E: Phone | F: Company | 
 *    G: Project/Type | H: Details | I: Timeline/Budget | J: Additional Info | K: Website URL
 * 
 * 3. Go to Extensions → Apps Script
 * 4. Paste this code
 * 5. Update YOUR_EMAIL below
 * 6. Deploy as Web App (Execute as: Me, Access: Anyone)
 * 7. Copy the deployment URL to script.js
 */

// ==================== CONFIGURATION ====================
const CONFIG = {
  // Your notification email
  notificationEmail: 'fifthstonedev@outlook.com',
  
  // Email subjects for each form type (for email filtering/routing)
  emailSubjects: {
    'webDev': '[Fifth Stone Dev] Web Development Request',
    'automation': '[Fifth Stone Dev] Process Automation Request',
    'consulting': '[Fifth Stone Dev] Strategic Consulting Request'
  }
};

// ==================== MAIN HANDLER ====================
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Send email notification
    sendEmailNotification(data);
    
    // Return success response
    return createResponse({ 
      result: 'success', 
      message: 'Form submitted successfully' 
    });
    
  } catch (error) {
    // Log error for debugging
    console.error('Form submission error:', error);
    
    // Return error response
    return createResponse({ 
      result: 'error', 
      message: error.toString() 
    });
  }
}

// ==================== EMAIL NOTIFICATION ====================
function sendEmailNotification(data) {
  const formType = data.formType || 'unknown';
  const formTypeName = formatFormType(formType);
  
  // Get the specific subject for this form type
  const subject = CONFIG.emailSubjects[formType] || `[Fifth Stone Dev] New Form Submission - ${formTypeName}`;
  
  // Build email body
  const emailBody = `
New ${formTypeName} request from Fifth Stone Dev website!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:    ${data.name || 'N/A'}
Email:   ${data.email || 'N/A'}
Phone:   ${data.phone || 'N/A'}
Company: ${data.company || 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 REQUEST DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formatRequestDetails(data)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ SUBMITTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${new Date(data.timestamp).toLocaleString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short'
})}

---
Fifth Stone Dev Form Handler
Reply directly to this email to respond to ${data.name}
  `;
  
  // Send email with reply-to set to submitter's email
  MailApp.sendEmail({
    to: CONFIG.notificationEmail,
    replyTo: data.email || CONFIG.notificationEmail,
    subject: subject,
    body: emailBody
  });
}

// ==================== HELPER FUNCTIONS ====================

function formatFormType(formType) {
  const types = {
    'webDev': 'Web Development',
    'automation': 'Process Automation',
    'consulting': 'Strategic Consulting'
  };
  return types[formType] || formType;
}

function getProjectType(data) {
  return data['project-type'] || 
         data['automation-type'] || 
         data['consulting-area'] || 
         '';
}

function getMainDetails(data) {
  return data.details || 
         data['current-process'] || 
         data.challenges || 
         '';
}

function getTimelineBudget(data) {
  const parts = [];
  if (data.timeline) parts.push(`Timeline: ${data.timeline}`);
  if (data.budget) parts.push(`Budget: ${data.budget}`);
  return parts.join(' | ');
}

function getAdditionalInfo(data) {
  const parts = [];
  if (data.tools) parts.push(`Tools: ${data.tools}`);
  if (data.goals) parts.push(`Goals: ${data.goals}`);
  return parts.join(' | ');
}

function formatRequestDetails(data) {
  let details = '';
  
  if (data['project-type']) {
    details += `Project Type: ${data['project-type']}\n`;
  }
  if (data['automation-type']) {
    details += `Automation Type: ${data['automation-type']}\n`;
  }
  if (data['consulting-area']) {
    details += `Consulting Area: ${data['consulting-area']}\n`;
  }
  
  if (data.timeline) {
    details += `Timeline: ${data.timeline}\n`;
  }
  if (data.budget) {
    details += `Budget: ${data.budget}\n`;
  }
  if (data.tools) {
    details += `Tools: ${data.tools}\n`;
  }
  if (data.website) {
    details += `Website: ${data.website}\n`;
  }
  
  details += '\n';
  
  if (data.details) {
    details += `Project Details:\n${data.details}\n\n`;
  }
  if (data['current-process']) {
    details += `Current Process:\n${data['current-process']}\n\n`;
  }
  if (data.challenges) {
    details += `Challenges:\n${data.challenges}\n\n`;
  }
  if (data.goals) {
    details += `Goals:\n${data.goals}\n`;
  }
  
  return details;
}

function createResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==================== TEST FUNCTION ====================
// Run this function to test your setup
function testFormSubmission() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        formType: 'webDev',
        timestamp: new Date().toISOString(),
        name: 'Test User',
        email: 'test@example.com',
        phone: '555-1234',
        company: 'Test Company',
        'project-type': 'New Website',
        details: 'This is a test submission',
        timeline: '2-3 months',
        budget: '$5,000 - $10,000'
      })
    }
  };
  
  const response = doPost(testData);
  Logger.log(response.getContent());
}
S ====================
// Run these functions to test your setup

function testWebDevForm() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        formType: 'webDev',
        timestamp: new Date().toISOString(),
        name: 'John Smith',
        email: 'john@example.com',
        phone: '555-1234',
        company: 'Acme Corp',
        'project-type': 'New Website',
        details: 'Looking to build a modern e-commerce website with product catalog.',
        timeline: '2-3 months',
        budget: '$10,000 - $25,000'
      })
    }
  };
  
  const response = doPost(testData);
  Logger.log('Web Dev Test: ' + response.getContent());
}

function testAutomationForm() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        formType: 'automation',
        timestamp: new Date().toISOString(),
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '555-5678',
        company: 'Tech Solutions Inc',
        'automation-type': 'Workflow Automation',
        'current-process': 'Currently manually processing 100+ invoices per day.',
        tools: 'QuickBooks, Google Sheets',
        details: 'Need to automate invoice processing and approval workflow.'
      })
    }
  };
  
  const response = doPost(testData);
  Logger.log('Automation Test: ' + response.getContent());
}

function testConsultingForm() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        formType: 'consulting',
        timestamp: new Date().toISOString(),
        name: 'Michael Chen',
        email: 'michael@example.com',
        phone: '555-9012',
        company: 'Digital Media Co',
        'consulting-area': 'Website Audit',
        website: 'https://example.com',
        challenges: 'Website is slow and not ranking well in search results.',
        goals: 'Improve page speed and SEO performance.'
      })
    }
  };
  
  const response = doPost(testData);
  Logger.log('Consulting Test: ' + 