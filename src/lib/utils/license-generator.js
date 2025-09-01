// Utility functions for license key generation and validation
const { randomBytes } = require("crypto");

function generateLicenseKey(softwarePrefix) {
  const segments = [];

  // Add software prefix
  segments.push(softwarePrefix.toUpperCase());

  // Add year
  segments.push(new Date().getFullYear().toString());

  // Generate 3 random segments of 4 characters each
  for (let i = 0; i < 3; i++) {
    const segment = randomBytes(2).toString("hex").toUpperCase();
    segments.push(segment);
  }

  return segments.join("-");
}

function validateLicenseKeyFormat(licenseKey) {
  // Basic format validation: PREFIX-YEAR-XXXX-XXXX-XXXX
  const pattern = /^[A-Z]+-\d{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/;
  return pattern.test(licenseKey);
}

function generateApiKey(prefix = "prod") {
  const randomPart = randomBytes(16).toString("hex");
  return `lk_${prefix}_${randomPart}`;
}

function maskLicenseKey(licenseKey) {
  const parts = licenseKey.split("-");
  if (parts.length < 3) return licenseKey;

  // Show first part and last part, mask middle parts
  const masked = parts.map((part, index) => {
    if (index === 0 || index === parts.length - 1) {
      return part;
    }
    return "****";
  });

  return masked.join("-");
}

// Export functions for CommonJS
module.exports = {
  generateLicenseKey,
  validateLicenseKeyFormat,
  generateApiKey,
  maskLicenseKey,
};
