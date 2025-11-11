# 📊 Stats Page Documentation

The Statistics Page is a hidden feature that tracks and displays visitor analytics using browser localStorage.

## Accessing the Stats Page

### Keyboard Combination
Press and hold **F + S** simultaneously for **2+ seconds**

**Step-by-step**:
1. Press down the `F` key
2. While holding `F`, press down the `S` key
3. Keep both keys held down
4. After 2 seconds, the stats modal will appear
5. Release the keys

### Closing the Stats Page
- Press `Escape` key
- Press `F + S` again
- Click outside the modal (if implemented)

## Statistics Displayed

### 📅 Visit Statistics

#### Today's Visits
**Display**: `Today: X visits`
**Description**: Number of times the site was loaded today (current date)

#### Yesterday's Visits
**Display**: `Yesterday: X visits`
**Description**: Number of visits from the previous day

#### This Month's Visits
**Display**: `This Month: X visits`
**Description**: Total visits in the current calendar month

#### First Visit Date
**Display**: `First Visit: [Date]`
**Description**: The date of your very first visit to the site
**Format**: `Day Mon DD YYYY` (e.g., "Tue Nov 11 2025")

#### Total Days
**Display**: `Total Days: X days`
**Description**: Number of unique days you've visited the site

### 🖥️ Device Breakdown

Shows all devices used to access the site with visit counts:

**Format**: `[Emoji] [Device Name]: X visits`

**Examples**:
- `🐶 Android: 5 visits`
- `🍎 iPhone: 3 visits`
- `🪟 Windows: 12 visits`
- `🍏 Mac: 7 visits`
- `🐧 Linux: 2 visits`

### 💻 Current Session

#### Device Type
**Display**: `Device: [Emoji] [Name]`
**Description**: The device you're currently using

#### Mobile Status
**Display**: `Mobile: Yes` or `Mobile: No`
**Description**: Whether the current device is classified as mobile

## Data Storage

### LocalStorage Structure
```javascript
{
  "terminalStats": {
    "visits": {
      "Tue Nov 11 2025": 3,
      "Wed Nov 12 2025": 2,
      // ... more dates
    },
    "devices": {
      "🐧 Linux": 3,
      "🪟 Windows": 2,
      // ... more devices
    },
    "firstVisit": "Tue Nov 11 2025",
    "lastVisit": "Wed Nov 12 2025",
    "lastDevice": "🐧 Linux"
  }
}
```

### Storage Location
**Key**: `terminalStats`
**Type**: JSON string in browser localStorage
**Scope**: Per domain/origin
**Persistence**: Until manually cleared

## How Statistics Work

### Visit Tracking

#### New Visit Detection
Each page load counts as a new visit:
```javascript
function initStats() {
    const today = new Date().toDateString();
    let stats = JSON.parse(localStorage.getItem('terminalStats') || '{}');
    
    if (!stats.visits[today]) {
        stats.visits[today] = 0;
    }
    stats.visits[today]++;
    
    localStorage.setItem('terminalStats', JSON.stringify(stats));
}
```

#### Visit Counting
- **Page Load**: Increments today's counter
- **Page Refresh**: Counts as new visit
- **New Tab**: Counts as separate visit
- **Return Visit**: Adds to existing day count

### Device Tracking

#### Device Recording
```javascript
const deviceKey = `${device.deviceType} ${device.deviceName}`;
if (!stats.devices[deviceKey]) {
    stats.devices[deviceKey] = 0;
}
stats.devices[deviceKey]++;
```

#### Multiple Devices
If you visit from different devices:
- Each device tracked separately
- Total visits = sum of all devices
- Can see usage patterns

### Monthly Calculation
```javascript
function calculateMonthlyVisits() {
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${now.getMonth()}`;
    let monthVisits = 0;
    
    for (const date in stats.visits) {
        const visitDate = new Date(date);
        const visitMonth = `${visitDate.getFullYear()}-${visitDate.getMonth()}`;
        if (visitMonth === thisMonth) {
            monthVisits += stats.visits[date];
        }
    }
    return monthVisits;
}
```

## Privacy & Security

### What's Stored
✅ Visit counts per day
✅ Device types (generic)
✅ Date information
✅ Device name (generic: "Android", "iPhone", etc.)

### What's NOT Stored
❌ Personal information
❌ IP addresses
❌ Precise device models
❌ Location data
❌ Browsing history
❌ Passwords or credentials

### User Control
Users can clear stats by:
1. Clearing browser localStorage
2. Using browser's "Clear browsing data"
3. Deleting site data specifically

**Chrome**: Settings → Privacy → Clear browsing data → Site data
**Firefox**: Settings → Privacy → Clear Data → Site data

## Use Cases

### Personal Analytics
- Track how often you use the resource
- See your study patterns
- Identify device preferences

### Study Habits
- Daily visit trends
- Monthly usage patterns
- Device context (mobile vs desktop)

### Testing & Development
- Verify device detection works
- Check data persistence
- Validate stat calculations

## Troubleshooting

### Stats Not Appearing
**Problem**: Pressed F+S but no modal

**Solutions**:
1. Hold both keys for full 2 seconds
2. Make sure browser tab is focused
3. Check browser console for errors
4. Try refreshing the page

### Incorrect Visit Counts
**Problem**: Numbers don't match expectations

**Possible Causes**:
1. Each page load/refresh counts
2. Multiple tabs count separately
3. Different browsers have separate storage
4. Incognito mode doesn't persist data

### Data Reset
**Problem**: Stats disappeared

**Causes**:
1. Browser localStorage cleared
2. Browser cache cleared with site data
3. Privacy mode/incognito session ended
4. Different browser/profile used

### Device Not Recognized
**Problem**: Shows as 👽 Unknown

**Solution**:
1. Normal for unusual devices
2. Doesn't affect functionality
3. May update with browser updates

## Advanced Features

### Export Stats (Future)
Potential feature to export data:
```javascript
function exportStats() {
    const stats = localStorage.getItem('terminalStats');
    const blob = new Blob([stats], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    // Download as JSON file
}
```

### Reset Stats (Future)
Clear all statistics:
```javascript
function resetStats() {
    if (confirm('Clear all statistics?')) {
        localStorage.removeItem('terminalStats');
        location.reload();
    }
}
```

### Import Stats (Future)
Restore from backup:
```javascript
function importStats(jsonData) {
    localStorage.setItem('terminalStats', jsonData);
    location.reload();
}
```

## Technical Details

### Timer Implementation
```javascript
let fKeyPressed = false;
let sKeyPressed = false;
let keyPressTimer = null;
let keyHoldDuration = 0;
const REQUIRED_HOLD_TIME = 2000; // 2 seconds

function startStatsTimer() {
    keyPressTimer = setInterval(() => {
        keyHoldDuration += 100;
        if (keyHoldDuration >= REQUIRED_HOLD_TIME && fKeyPressed && sKeyPressed) {
            showStats();
            stopStatsTimer();
        }
    }, 100);
}
```

### Modal Display
```javascript
function showStats() {
    const statsData = calculateStats();
    const statsModal = document.createElement('div');
    statsModal.id = 'stats-modal';
    statsModal.className = 'stats-modal';
    // ... create content
    document.body.appendChild(statsModal);
}
```

## Best Practices

1. **Check Regularly**: View stats weekly to track usage
2. **Compare Devices**: See which device you use most
3. **Privacy Aware**: Remember stats are local only
4. **Clear When Needed**: Reset if sharing device
5. **Test Detection**: Verify device identification

## Related Documentation

- [Device Detection System](Device-Detection.md)
- [Testing Documentation](../TESTING.md)
- [Privacy & Security](Security.md)

---

*Stats page is a privacy-focused way to understand your usage patterns*
