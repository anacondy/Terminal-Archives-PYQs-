# Security Policy

## Overview

This project takes security seriously. We've implemented several security measures to protect users and their data.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Security Features

### XSS Protection
- ✅ Input sanitization for all user-provided search queries
- ✅ Separate handling for trusted HTML vs. untrusted text content
- ✅ HTML escaping for dynamic content

### Security Headers
The application implements the following security headers:
- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
- `X-Frame-Options: DENY` - Prevents clickjacking attacks
- `X-XSS-Protection: 1; mode=block` - Enables XSS filtering
- `Referrer-Policy: no-referrer` - Protects user privacy

### Safe External Links
- All external links use `rel="noopener noreferrer"` to prevent tab-napping attacks

### No Backend Dependencies
- Frontend-only architecture eliminates server-side vulnerabilities
- No database means no SQL injection risks
- No authentication means no credential theft risks

## Known Limitations

### Browser Security Model
This application respects browser security restrictions:
- Cannot access full system information (only browser-exposed data)
- Limited to same-origin policy for resource loading
- Relies on browser security features

### Content Security Policy
Currently, CSP headers are not fully implemented. This could be improved by:
- Adding a strict CSP meta tag or server headers
- Restricting inline script execution
- Limiting resource loading to trusted domains

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it by:

1. **Do NOT** open a public issue
2. Email the maintainer directly (see author information in README)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work on a fix as soon as possible.

## Security Best Practices for Users

When using this application:
- ✅ Use the latest version of your browser
- ✅ Keep your browser updated with security patches
- ✅ Be cautious when clicking external links from search results
- ✅ Clear browser cache/storage if concerned about data

## Security Audit History

| Date | Version | Auditor | Findings |
|------|---------|---------|----------|
| 2025-01-15 | 1.1 | Internal | XSS vulnerability fixed, security headers added |
| 2025-01-14 | 1.0 | Initial | Initial release |

## Acknowledgments

We appreciate the security research community and welcome responsible disclosure of any security issues.
