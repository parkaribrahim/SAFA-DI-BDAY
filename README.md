# Interactive Birthday Website — Version 2

This version recreates the visual flow of the supplied reference video more closely:

1. Passcode screen with striped yellow background + lavender organic shapes
2. Surprise question with Yes / No branch
3. Birthday reveal card
4. Memories page with tabs and photo grid
5. “click on each item to open” menu with camera / envelope / cassette
6. Handwritten letter
7. Cassette / music screen
8. Video screen
9. Birthday wishes
10. Virtual hug ending

## Edit it without touching the main code
Open `config.js` and change:

- `name`
- `password`
- `letter`
- `wishes`
- `musicUrl`
- `videoUrl`
- `photos`

### Photos
You can either use image URLs in `config.js`, or put image files in the project and use paths such as `assets/photo1.jpg`.

### Music
Put a direct audio file URL in `musicUrl` (or later add an mp3 file and use `assets/song.mp3`).

### Video
For YouTube/Vimeo, use an **embed URL** in `videoUrl`, not the normal watch URL.

## Local preview
Open `index.html` in a browser. If your browser blocks local media, run a simple local server instead.

## Free publishing
Upload the contents of this folder to a GitHub repository and enable GitHub Pages. No backend is required.
