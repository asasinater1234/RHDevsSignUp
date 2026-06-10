// ============================================================
// Raffles Hall Hackers Club — Signup Sheet Backend
// Paste this into script.google.com and deploy as a Web App
// ============================================================

const SHEET_NAME = 'Signups';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet + header row if it doesn't exist yet
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp', 'Name', 'Matric No.', 'Year',
        'Department', 'Major', 'Email', 'Telegram', 'Skills', 'Goal'
      ]);
      // Bold + freeze header row
      sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.timestamp,
      data.name,
      data.matric,
      data.year,
      data.department,
      data.major,
      data.email,
      data.telegram,
      data.skills,
      data.goal
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test this function manually to verify the sheet is set up correctly
function testSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Connected to: ' + ss.getName());
  Logger.log('Setup looks good! Deploy as web app when ready.');
}
