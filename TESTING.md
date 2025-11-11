# 🧪 Testing Documentation

## Overview

This document provides comprehensive testing guidelines for Terminal Archives to ensure functionality across multiple devices, browsers, and scenarios.

## Test Environment Requirements

### Supported Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Supported Devices
- 📱 Mobile phones (16:9, 18:9, 19.5:9, 20:9 aspect ratios)
- 💻 Desktop computers
- 🖥️ Tablets
- 🖱️ Touch and non-touch devices

## Test Scenarios

### 1. Device Detection Tests

#### Test 1.1: Device Type Detection
**Objective**: Verify correct device type identification

**Steps**:
1. Open the application on different devices
2. Press F+S keys simultaneously for 2+ seconds
3. Check the "Current Session" section in stats

**Expected Results**:
- 🐶 Android phones show "Android"
- 🍎 iPhones show "iPhone"
- 🍏 iPads/Macs show "iPad" or "Mac"
- 🪟 Windows devices show "Windows"
- 🐧 Linux devices show "Linux"
- 👽 Other devices show appropriate identifier

**Pass Criteria**: Device correctly identified with proper emoji

#### Test 1.2: Mobile vs Desktop Detection
**Objective**: Verify mobile/desktop classification

**Steps**:
1. Open on mobile device
2. Check if mobile search button appears at bottom
3. Open on desktop
4. Verify mobile search button is hidden

**Expected Results**:
- Mobile: Search button visible at bottom
- Desktop: Search button hidden, Ctrl+K works

**Pass Criteria**: UI adapts correctly to device type

### 2. Mobile Responsiveness Tests

#### Test 2.1: 16:9 Aspect Ratio (Standard Mobile)
**Devices**: iPhone 11, Samsung Galaxy S10
**Resolution**: 375x667, 360x640

**Steps**:
1. Open application on 16:9 mobile device
2. Scroll through terminal output
3. Click mobile search button
4. Enter search query
5. View results

**Expected Results**:
- Text is readable (13-14px font)
- Search button is visible and accessible
- No horizontal scrolling
- All content fits viewport

**Pass Criteria**: All elements visible and functional

#### Test 2.2: 20:9 Aspect Ratio (Ultra-wide Mobile)
**Devices**: Samsung Galaxy S20+, OnePlus 8 Pro
**Resolution**: 412x915, 384x854

**Steps**:
1. Open application on 20:9 mobile device
2. Test all interactions
3. Verify button placement

**Expected Results**:
- Content properly formatted for tall screen
- Search button positioned correctly
- No content cutoff

**Pass Criteria**: UI optimized for ultra-wide screens

#### Test 2.3: Landscape Mode
**Steps**:
1. Open on mobile device
2. Rotate to landscape orientation
3. Test all features

**Expected Results**:
- Stats modal scrollable if content overflows
- Search button remains accessible
- Text remains readable

**Pass Criteria**: Full functionality in landscape

### 3. Search Functionality Tests

#### Test 3.1: Desktop Search (Ctrl+K)
**Steps**:
1. Open on desktop browser
2. Press Ctrl+K (Cmd+K on Mac)
3. Enter "Physics"
4. Press Enter

**Expected Results**:
- Modal opens instantly
- Search executes
- Results display correctly
- Links are clickable

**Pass Criteria**: Search completes in <2 seconds

#### Test 3.2: Mobile Search Button
**Steps**:
1. Open on mobile device
2. Tap search button at bottom
3. Enter search query
4. Submit search

**Expected Results**:
- Modal opens on tap
- Virtual keyboard appears
- Search executes correctly
- Modal can be closed with X or Esc

**Pass Criteria**: Smooth mobile search experience

#### Test 3.3: Search Results Accuracy
**Test Cases**:
- Query: "Physics" → Expected: 2 results (2024, 2023)
- Query: "Statistics" → Expected: 2 results
- Query: "2024" → Expected: 3 results (all 2024 papers)
- Query: "xyz123" → Expected: 0 results

**Pass Criteria**: All searches return correct results

### 4. Stats Page Tests

#### Test 4.1: Stats Page Access
**Steps**:
1. Press and hold F key
2. Press and hold S key
3. Keep both held for 2+ seconds
4. Release keys

**Expected Results**:
- Stats modal appears after 2 seconds
- Shows visit statistics
- Shows device breakdown
- Shows current session info

**Pass Criteria**: Modal appears consistently

#### Test 4.2: Stats Data Accuracy
**Steps**:
1. Clear localStorage
2. Visit site
3. Open stats page
4. Verify counts

**Expected Results**:
- Today: 1 visit
- Yesterday: 0 visits
- This Month: 1 visit
- Device tracked correctly

**Pass Criteria**: Stats accurately reflect visits

#### Test 4.3: Stats Persistence
**Steps**:
1. Visit site multiple times
2. Close and reopen browser
3. Check stats

**Expected Results**:
- Visit count increases
- Historical data preserved
- Device types accumulated

**Pass Criteria**: Data persists across sessions

### 5. Performance Tests

#### Test 5.1: Load Time
**Objective**: Ensure fast initial load

**Steps**:
1. Clear cache
2. Load application
3. Measure time to "System ready"

**Expected Results**:
- Initial load: <2 seconds
- System ready: <5 seconds

**Pass Criteria**: Page fully interactive in <5 seconds

#### Test 5.2: Animation Smoothness
**Steps**:
1. Observe startup animations
2. Check progress bars
3. Test modal transitions

**Expected Results**:
- 60 FPS animations
- No stuttering
- Smooth transitions

**Pass Criteria**: Consistent 60 FPS on modern devices

#### Test 5.3: Memory Usage
**Steps**:
1. Open DevTools
2. Monitor memory usage
3. Perform multiple searches
4. Open/close stats multiple times

**Expected Results**:
- Memory stable (<50MB)
- No memory leaks
- Efficient resource usage

**Pass Criteria**: Memory usage remains stable

### 6. Cross-Browser Tests

#### Test 6.1: Chrome/Edge
**Features to Test**:
- Device detection
- localStorage
- CSS animations
- Keyboard shortcuts

**Pass Criteria**: All features work identically

#### Test 6.2: Firefox
**Known Differences**:
- deviceMemory API may not be available

**Steps**:
1. Test all features
2. Verify graceful degradation for unavailable APIs

**Pass Criteria**: Works with "N/A" for unsupported features

#### Test 6.3: Safari (iOS/macOS)
**Special Considerations**:
- Cmd+K instead of Ctrl+K
- Touch interactions on iOS

**Steps**:
1. Test keyboard shortcuts
2. Test touch interactions
3. Verify device detection

**Pass Criteria**: Full functionality on Apple devices

### 7. Accessibility Tests

#### Test 7.1: Keyboard Navigation
**Steps**:
1. Navigate using only keyboard
2. Tab through elements
3. Use keyboard shortcuts

**Expected Results**:
- All interactive elements accessible
- Proper focus indicators
- Shortcuts work correctly

**Pass Criteria**: Full keyboard accessibility

#### Test 7.2: Screen Reader Compatibility
**Steps**:
1. Enable screen reader
2. Navigate through application
3. Test modals

**Expected Results**:
- Content read in logical order
- Buttons have labels
- Modal announcements work

**Pass Criteria**: Basic screen reader support

### 8. Security Tests

#### Test 8.1: XSS Prevention
**Steps**:
1. Enter `<script>alert('XSS')</script>` in search
2. Verify script doesn't execute

**Expected Results**:
- Search treats input as text
- No script execution
- Results display safely

**Pass Criteria**: No XSS vulnerabilities

#### Test 8.2: localStorage Security
**Steps**:
1. Inspect localStorage data
2. Verify no sensitive information stored

**Expected Results**:
- Only visit counts and device info stored
- No personal data
- No credentials

**Pass Criteria**: No sensitive data in storage

## Test Reports

### Template for Test Reports

```markdown
## Test Report - [Date]

**Tester**: [Name]
**Environment**: [Browser/Device/OS]
**Build**: [Version/Commit]

### Test Results

| Test ID | Test Name | Status | Notes |
|---------|-----------|--------|-------|
| 1.1 | Device Detection | ✅ Pass | |
| 1.2 | Mobile Detection | ✅ Pass | |
| ... | ... | ... | |

### Issues Found

1. **Issue**: [Description]
   - **Severity**: High/Medium/Low
   - **Steps to Reproduce**: [Steps]
   - **Expected**: [Expected behavior]
   - **Actual**: [Actual behavior]

### Summary

- Total Tests: X
- Passed: Y
- Failed: Z
- Pass Rate: %
```

## Automated Testing

For future implementation:
- Unit tests for device detection
- Integration tests for search functionality
- E2E tests with Playwright/Cypress
- Visual regression tests
- Performance benchmarks

## Continuous Testing

### Pre-Deployment Checklist
- [ ] All manual tests passed
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Cross-browser tested
- [ ] Mobile tested
- [ ] Security verified

### Post-Deployment Verification
- [ ] Live site loads correctly
- [ ] Stats tracking works
- [ ] Search functions properly
- [ ] No JavaScript errors in production

## Troubleshooting Common Issues

### Issue: Stats not appearing
**Solution**: Ensure F and S keys held simultaneously for 2+ seconds

### Issue: Mobile search button not visible
**Solution**: Check viewport width is <768px

### Issue: Device memory shows "N/A"
**Solution**: Expected in Firefox; feature not available

### Issue: Search modal not closing
**Solution**: Press Escape key or refresh page

## Test Data

### Sample Queries for Testing
- "Physics" - Should return 2 results
- "Statistics" - Should return 2 results
- "Computer" - Should return 2 results
- "2024" - Should return 3 results
- "2023" - Should return 3 results
- "Mechanics" - Should return 1 result
- "xyz" - Should return 0 results

## Contact

For testing questions or to report issues:
- GitHub Issues: [Repository Issues Page]
- Project Maintainer: Anuj Meena

---

**Last Updated**: November 2025
**Version**: 2.0
