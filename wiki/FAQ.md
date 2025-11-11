# ❓ Frequently Asked Questions (FAQ)

## General Questions

### What is Terminal Archives?
Terminal Archives is a web-based application that provides a terminal-style interface for browsing and searching previous year question papers (PYQs). It runs entirely in your browser with no backend required.

### Do I need to install anything?
No! Just open the website in any modern browser. No downloads, installations, or sign-ups required.

### Is it free to use?
Yes, Terminal Archives is completely free and open source under the MIT License.

### Can I use it offline?
After the initial load, the application can work offline for basic functionality. However, external fonts may not load without internet.

## Features & Usage

### How do I search for papers?
**Desktop**: Press `Ctrl+K` (or `Cmd+K` on Mac)
**Mobile**: Tap the green search button at the bottom of the screen

### What is the stats page?
The stats page is a hidden feature that tracks your visits. Press and hold `F+S` together for 2+ seconds to access it.

### Why is the stats page hidden?
It's an easter egg feature for users who discover it. The F+S combination is not intrusive to normal usage.

### Can I export my statistics?
Currently, stats are stored locally in your browser's localStorage. Export functionality may be added in future updates.

### How accurate is the device detection?
The device detection uses multiple signals (user agent, platform, touch points) and is accurate for most modern devices. Unusual devices may show as "Unknown" (👽).

## Mobile & Responsiveness

### Does it work on mobile phones?
Yes! The application is fully optimized for mobile devices with aspect ratios from 16:9 to 20:9.

### Why is there a search button on mobile?
Mobile devices don't have easy access to keyboard shortcuts like Ctrl+K, so we added a fixed button at the bottom for convenience.

### Does it work in landscape mode?
Yes, the application adapts to landscape orientation with optimized layouts.

### Which mobile devices are supported?
All modern smartphones including:
- iPhone (all recent models)
- Samsung Galaxy series
- Google Pixel
- OnePlus, Xiaomi, and other Android phones

### The font size seems small on my phone
The font size is optimized for readability. If it's too small, you can:
1. Use your browser's zoom feature
2. Check your browser's accessibility settings
3. Verify you're not using desktop mode on mobile

## Technical Questions

### What technologies are used?
- **HTML5** for structure
- **CSS3** for styling and animations
- **Vanilla JavaScript** (ES6+) for functionality
- **No frameworks or libraries** (except Google Fonts)

### Why no backend/database?
This is an intentional design choice for:
- **Simplicity**: No server setup required
- **Privacy**: No data sent to servers
- **Speed**: Everything runs locally
- **Hosting**: Can be hosted on GitHub Pages for free

### How is data stored?
Statistics are stored in your browser's localStorage. No data is sent to any server.

### Is my data private?
Yes! All data (visits, device info) stays in your browser. Nothing is tracked or sent externally.

### Can I clear my statistics?
Yes, you can clear your browser's localStorage:
- **Chrome**: Settings → Privacy → Clear browsing data → Site data
- **Firefox**: Settings → Privacy → Clear Data → Cookies and site data
- **Safari**: Settings → Privacy → Manage Website Data

## Browser Compatibility

### Which browsers are supported?
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

### Why doesn't feature X work in my browser?
Some features (like `navigator.deviceMemory`) may not be available in all browsers. The app gracefully handles these by showing "N/A".

### Does it work in Internet Explorer?
No, Internet Explorer is not supported. Please use a modern browser.

### Does it work in incognito/private mode?
Yes, but statistics won't persist after you close the browser since localStorage is cleared in private mode.

## Performance

### Why is it loading slowly?
Check these common issues:
1. Slow internet connection (for initial font load)
2. Browser extensions blocking resources
3. Old browser version

### The animations are laggy
If animations are not smooth:
1. Close other tabs to free up resources
2. Update your browser to the latest version
3. Check if hardware acceleration is enabled in browser settings

### Does it consume a lot of battery on mobile?
No, the application is optimized with GPU-accelerated animations and minimal JavaScript for efficient battery usage.

## Search Functionality

### How does the search work?
The search filters through a local database matching your query against:
- Subject names
- Years
- Paper titles

### Can I add more papers to the database?
Currently, papers are hardcoded in the JavaScript file. You can contribute by submitting a pull request on GitHub.

### Why aren't my search results showing?
Make sure:
1. You're entering valid search terms
2. The papers exist in the database
3. Check spelling

### Can I search by partial words?
Yes! The search is case-insensitive and matches partial strings.

## Statistics & Tracking

### What statistics are tracked?
- Daily visit counts
- Device types used
- Monthly visit totals
- First and last visit dates

### Can others see my statistics?
No, statistics are stored locally in your browser and are not shared with anyone.

### Why did my stats reset?
Stats may reset if:
- You cleared browser data
- Used a different browser/profile
- Used incognito/private mode
- Switched devices

### Can I sync stats across devices?
Currently no. Each device maintains its own statistics locally.

## Keyboard Shortcuts

### What keyboard shortcuts are available?
- `Ctrl+K` / `Cmd+K`: Open search
- `Enter`: Execute search
- `Esc`: Close modals
- `F+S` (hold 2s): Show statistics

### The keyboard shortcuts don't work
Check:
1. Make sure the page is focused (click on it)
2. Verify no browser extension is intercepting keys
3. Try refreshing the page

### Can I customize keyboard shortcuts?
Not currently, but this could be added in future updates.

## Contributing & Development

### How can I contribute?
See the [Contributing section](../README.md#contributing) in the README for guidelines.

### Where is the source code?
GitHub: [https://github.com/anacondy/Terminal-Archives-PYQs-](https://github.com/anacondy/Terminal-Archives-PYQs-)

### Can I report bugs?
Yes! Please open an issue on GitHub: [Issues Page](https://github.com/anacondy/Terminal-Archives-PYQs-/issues)

### Can I suggest new features?
Absolutely! Open an issue on GitHub with the "enhancement" label.

### Is there a development roadmap?
Future enhancements may include:
- PWA support
- More papers in database
- Export statistics feature
- Theme customization
- Touch gestures
- More device detection

## Troubleshooting

### The search modal won't open
Try:
1. Refresh the page
2. Check browser console for errors (F12)
3. Try a different browser
4. Clear cache and reload

### Stats page won't appear
Ensure:
1. Both F and S keys are pressed simultaneously
2. Keys are held for at least 2 seconds
3. Page is focused (not on another tab)

### Mobile search button not visible
The button only appears on screens <768px wide. If using desktop, resize the browser window to test.

### Animations not working
Enable hardware acceleration in browser settings:
- Chrome: Settings → System → Use hardware acceleration
- Firefox: Settings → Performance → Use hardware acceleration

### Console shows errors
Most errors are harmless (like font loading in ad-blockers). Critical errors should be reported as GitHub issues.

## Privacy & Security

### Is my personal data collected?
No personal data is collected. Only anonymous usage statistics (visit counts, device type) stored locally.

### Are there any tracking scripts?
No third-party tracking scripts or analytics are used.

### Is it safe to use?
Yes, the application implements:
- XSS protection
- Input sanitization
- Secure headers
- No external dependencies (except fonts)

### Can I use it at work/school?
Yes, it's a legitimate educational resource. However, check your organization's internet usage policies.

## Miscellaneous

### Who created Terminal Archives?
Created by Anuj Meena ([@anacondy](https://github.com/anacondy))

### What license is it under?
MIT License - you can use, modify, and distribute it freely.

### Can I use this for my own project?
Yes! Fork it on GitHub and customize it for your needs.

### How can I contact the developer?
- GitHub: [@anacondy](https://github.com/anacondy)
- GitHub Issues: [Issues Page](https://github.com/anacondy/Terminal-Archives-PYQs-/issues)

### Is there a mobile app?
Not currently, but the web version is fully mobile-optimized.

### Can I donate or support the project?
Star the repository on GitHub and contribute code or documentation!

---

## Still Have Questions?

If your question isn't answered here:
1. Check the [Wiki Documentation](Home.md)
2. Review the [Testing Documentation](../TESTING.md)
3. Open an issue on [GitHub](https://github.com/anacondy/Terminal-Archives-PYQs-/issues)

*Last updated: November 2025*
