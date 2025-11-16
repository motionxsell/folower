# Instagram Follow Checker

A simple, user-friendly web application to find out who's not following you back on Instagram.

## Features

✨ **Easy to Use** - Simple interface with clear instructions
📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
🚀 **Fast & Efficient** - Processes your Instagram data instantly
🔒 **Privacy First** - All processing happens in your browser, no data is sent to servers
📋 **Copy Results** - Easily copy all usernames to clipboard with one click
🎨 **Modern UI** - Clean, attractive design with smooth interactions

## How to Use

1. **Get Your Instagram Data**
   - Go to your Instagram account settings
   - Navigate to "Download your information"
   - Select "Followers and following" data format
   - Instagram will prepare a ZIP file with your data

2. **Upload Files**
   - Extract the downloaded ZIP file
   - Upload `followers_1.json` from the `followers_and_following` folder
   - Upload `following.json` from the `followers_and_following` folder

3. **Check Results**
   - Click the "Check Now" button
   - The app will analyze your data and display accounts not following you back
   - Use "Copy All Usernames" to copy the list to your clipboard

## How to Deploy to Vercel

1. **Prepare Your Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**
   - Create a new repository on GitHub
   - Push your code: `git push origin main`

3. **Deploy with Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Select your repository
   - Click "Deploy"
   - Your site will be live in seconds!

## Local Development

To test the website locally:

1. Open `index.html` in your web browser, or
2. Use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   ```

3. Navigate to `http://localhost:8000`

## File Structure

```
├── index.html      # Main HTML file
├── style.css       # Styling and responsive design
├── script.js       # JavaScript logic and file processing
├── vercel.json     # Vercel deployment configuration
├── .gitignore      # Git ignore file
└── README.md       # This file
```

## Privacy & Security

- **No Data Collection**: Your Instagram data is never sent to any server
- **Browser-Based Processing**: All analysis happens locally in your browser
- **No Tracking**: We don't use analytics or tracking cookies
- **Open Source**: Feel free to review the code and modify it as needed

## Troubleshooting

**"Invalid JSON" Error?**
- Make sure you're uploading the correct files (followers_1.json and following.json)
- Check that both files are from the same Instagram data export
- Don't modify the JSON files - upload them as-is

**No Results Showing?**
- Make sure both files are properly uploaded
- Check browser console (F12) for any error messages
- Try refreshing the page and uploading again

## Browser Compatibility

- Chrome/Chromium (Recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is provided as-is for personal use.

## Support

If you encounter any issues, please check:
1. Browser console for error messages (Press F12)
2. That you're using the correct Instagram data files
3. That your browser supports JavaScript and local file reading

---

**Note**: Instagram data download contains your sensitive account information. Handle it securely and delete it after use.
