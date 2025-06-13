# React Embed Player SSR Example

A comprehensive example demonstrating how to implement Gumlet's React Embed Player with Server-Side Rendering (SSR) support. This repository showcases best practices for integrating video streaming capabilities into React applications with proper SSR handling.

## Features

- **Server-Side Rendering Support**: Fully compatible with SSR frameworks like Next.js
- **Video Streaming**: High-quality video playback with adaptive bitrate streaming
- **DRM Protection**: Support for Widevine & Fairplay DRM
- **Analytics Integration**: Built-in Gumlet Insights for video analytics
- **Responsive Design**: Mobile-first responsive video player
- **Multiple Video Formats**: Support for various video formats and streaming protocols
- **Customizable Player**: Extensive customization options for player appearance and behavior

## Installation

```bash
npm install @gumlet/react-embed-player
```

or

```bash
yarn add @gumlet/react-embed-player
```

## Usage

### Basic Implementation

```jsx
import React from 'react';
import { GumletPlayer } from '@gumlet/react-embed-player';

function VideoPlayer() {
  return (
    <GumletPlayer
      videoID="64bfb0913ed6e5096d66dc1e"
      title="My Video Title"
      style={{
        height: "500px",
        width: "100%",
        position: "relative"
      }}
      autoplay={false}
      preload={true}
      muted={false}
    />
  );
}

export default VideoPlayer;
```

### Advanced Implementation with SSR

```jsx
import React, { useRef, useEffect, useState } from 'react';
import { GumletPlayer } from '@gumlet/react-embed-player';

function AdvancedVideoPlayer() {
  const playerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.play();
    }
  };

  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.pause();
    }
  };

  if (!isClient) {
    return <div>Loading player...</div>;
  }

  return (
    <div>
      <GumletPlayer
        ref={playerRef}
        videoID="your-video-id"
        title="Advanced Video Player"
        style={{
          height: "500px",
          width: "100%",
          position: "relative"
        }}
        schemaOrgVideoObject={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": "My Video",
          "description": "Video description",
          "embedUrl": "https://play.gumlet.io/embed/your-video-id"
        }}
        autoplay={false}
        preload={true}
        muted={false}
        onReady={() => console.log('Player ready')}
        onPlay={() => console.log('Video started playing')}
        onPause={() => console.log('Video paused')}
        onEnded={() => console.log('Video ended')}
        onTimeupdate={(data) => console.log('Current time:', data.seconds)}
        onProgress={(data) => console.log('Loading progress:', data.percent)}
      />
      
      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
    </div>
  );
}

export default AdvancedVideoPlayer;
```

### Next.js Implementation

```jsx
import dynamic from 'next/dynamic';

const GumletPlayer = dynamic(
  () => import('@gumlet/react-embed-player').then(mod => mod.GumletPlayer),
  { ssr: false }
);

function NextjsVideoPlayer() {
  return (
    <GumletPlayer
      videoID="your-video-id"
      title="Next.js Video Player"
      style={{
        height: "500px",
        width: "100%",
        position: "relative"
      }}
      autoplay={false}
      preload={true}
    />
  );
}

export default NextjsVideoPlayer;
```

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `videoID` | `string` | **Required** - Video ID generated after processing on Gumlet | - |
| `title` | `string` | Title of the iframe | `"Gumlet video player"` |
| `style` | `object` | CSS styles for the iframe container | `{padding:"56.25% 0 0 0", position:"relative"}` |
| `schemaOrgVideoObject` | `object` | Schema.org structured data object | `{}` |
| `autoplay` | `boolean` | Should the video autoplay | Collection default |
| `preload` | `boolean` | Should the video preload | Collection default |
| `muted` | `boolean` | Should the video be muted | Collection default |
| `loop` | `boolean` | Should the video loop | Collection default |
| `thumbnail` | `string` | URL encoded thumbnail/poster URL | Asset default |
| `expires` | `number` | Token expiry time (epoch millis) | `null` |
| `vast_tag_url` | `string` | URL encoded VAST tag URL for ads | `null` |
| `start_high_res` | `boolean` | Start in highest resolution | `false` |
| `disable_seek` | `boolean` | Disable seek functionality | `false` |
| `disable_player_controls` | `boolean` | Hide all player controls | `false` |
| `watermark_text` | `string` | Watermark text overlay | `null` |
| `facebook_pixel_id` | `string` | Facebook Pixel ID for analytics | `null` |
| `ga_tracking_id` | `string` | Google Analytics tracking ID | `null` |
| `gm_user_id` | `string` | User ID for Gumlet Insights | `null` |
| `gm_user_name` | `string` | User name for Gumlet Insights | `null` |
| `gm_user_email` | `string` | User email for Gumlet Insights | `null` |
| `gm_custom_data_1` | `string` | Custom data for Gumlet Insights | `null` |
| `t` | `number` | Start time in seconds | `null` |

## Methods

The player provides several methods to control playback programmatically:

### Playback Control
- `play()` - Start playing the video
- `pause()` - Pause the video
- `getPaused()` - Check if video is paused (returns boolean)

### Audio Control
- `mute()` - Mute the video
- `unmute()` - Unmute the video
- `getMuted()` - Check if video is muted (returns boolean)
- `setVolume(volume)` - Set volume (0-100)
- `getVolume()` - Get current volume (returns 0-100)

### Time Control
- `getCurrentTime()` - Get current playback time in seconds
- `setCurrentTime(seconds)` - Seek to specific time
- `getDuration()` - Get total video duration in seconds

### Playback Rate
- `setPlaybackRate(rate)` - Set playback speed
- `getPlaybackRate()` - Get current playback rate

## 📡 Events

The player emits various events that you can listen to:

### Playback Events
- `onReady` - Player is ready for interaction
- `onPlay` - Video starts playing
- `onPause` - Video is paused
- `onEnded` - Video playback finished
- `onError` - An error occurred

### Progress Events
- `onProgress` - Video loading progress
  ```javascript
  { percent: 0.8 }
  ```
- `onTimeupdate` - Current playback time update
  ```javascript
  { seconds: 10, duration: 40 }
  ```
- `onSeeked` - User seeked to different position
  ```javascript
  { seconds: 10, duration: 50 }
  ```

### Player State Events
- `onFullScreenChange` - Fullscreen mode changed
  ```javascript
  { isFullScreen: true }
  ```
- `onPipChange` - Picture-in-picture mode changed
  ```javascript
  { isPIP: true }
  ```
- `onVolumeChange` - Volume level changed
  ```javascript
  { volume: 50 }
  ```
- `onPlaybackRateChange` - Playback rate changed
- `onAudioChange` - Audio track changed
- `onQualityChange` - Video quality changed

## Custome Analytics

```jsx
<GumletPlayer
  videoID="your-video-id"
  gm_user_id="user123"
  gm_user_name="John Doe"
  gm_user_email="john@example.com"
  gm_custom_data_1="custom-value"
  ga_tracking_id="GA-XXXXX-X"
  facebook_pixel_id="123456789"
/>
```

## Development

1. Clone the repository
```bash
git clone https://github.com/gumlet/react-embed-player-ssr-example.git
cd react-embed-player-ssr-example
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Examples

This repository includes several examples:

- **Basic Player** - Simple video player implementation
- **SSR Player** - Server-side rendering compatible player
- **Next.js Player** - Next.js specific implementation
- **Analytics Player** - Player with analytics integration
- **Custom Controls** - Player with custom control implementation

## 🔧 Troubleshooting

### Common Issues

1. **Player not loading in SSR environment**
   - Use dynamic imports with `ssr: false`
   - Check for `window` object availability

2. **Video not playing**
   - Verify the `videoID` is correct
   - Check browser console for errors
   - Ensure proper CORS settings

3. **DRM content not working**
   - Check the DRM credentials in DRM settings
   - Check browser DRM support

## 🤝 Contributing

We welcome contributions to improve this example repository! Here's how you can help:

### Ways to Contribute

- 🐛 **Report bugs** - Found an issue? Please create a detailed bug report
- 💡 **Suggest features** - Have ideas for improvements? We'd love to hear them
- 📖 **Improve documentation** - Help make our docs clearer and more comprehensive
- 🔧 **Submit code changes** - Fix bugs or add new features
- 📝 **Add examples** - Share your implementation patterns with the community

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Add tests** (if applicable)
5. **Commit your changes**
   ```bash
   git commit -m "Add your descriptive commit message"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request**

### Pull Request Guidelines

- Provide a clear description of the changes
- Include screenshots for UI changes
- Ensure all tests pass
- Follow the existing code style
- Update documentation if needed

### Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/react-embed-player-ssr-example.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## Support

- 📧 Email: support@gumlet.com
- 📖 Documentation: [Gumlet Docs](https://docs.gumlet.com/)
- 🐛 Issues: [GitHub Issues](https://github.com/gumlet/react-embed-player-ssr-example/issues)

---

Made with ❤️ by [Gumlet](https://github.com/gumlet)
