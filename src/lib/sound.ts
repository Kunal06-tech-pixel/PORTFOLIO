/**
 * Transition Sound Engine
 * 
 * Focus:
 * Premium, subtle tactile sound design enhancing the loading-screen → hero transition.
 * Authentic mechanical roller glide, pneumatic air release & slat clicks on shutter lift.
 * 
 * Strict protections:
 * - Single-trigger debounce: mathematically prevents sound from ever playing twice.
 * - Zero ongoing background noise or intrusive media experience.
 */

class SoundEngine {
  private shutterAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private hasPlayedShutter: boolean = false;
  private lastPlayTime: number = 0;
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_sound_v2_muted');
      this.isMuted = saved === 'true';

      // Preload the tactile shutter lift audio asset
      try {
        this.shutterAudio = new Audio('/audio/shutter-lift.wav');
        this.shutterAudio.preload = 'auto';
        this.shutterAudio.volume = 0.85;
      } catch (e) {
        console.warn('Audio preload warning:', e);
      }

      // Expose for inspection
      (window as unknown as { __soundManager: SoundEngine }).__soundManager = this;
    }
  }

  /**
   * Transition Sound: Mechanical Shutter Lift
   * 
   * Strictly guarded so it can only ever trigger once per session.
   * If initial auto-play is blocked by browser autoplay policy, it arms
   * a one-time gesture unlock on the first user interaction.
   */
  public playShutterLift(): void {
    if (this.isMuted) return;

    // Strict single-play guard: if successfully played, do not repeat
    if (this.hasPlayedShutter) {
      return;
    }

    // Debounce guard: prevent multiple triggers within 2.5s
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    if (this.lastPlayTime > 0 && now - this.lastPlayTime < 2500) {
      return;
    }

    try {
      if (!this.shutterAudio) {
        this.shutterAudio = new Audio('/audio/shutter-lift.wav');
        this.shutterAudio.preload = 'auto';
      }
      this.shutterAudio.currentTime = 0;
      this.shutterAudio.volume = 1.0;
      this.shutterAudio.loop = false;

      const playPromise = this.shutterAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Playback successfully started! Lock to prevent duplicates
          this.hasPlayedShutter = true;
          this.lastPlayTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
          this.disarmGestureUnlock();
        }).catch((err) => {
          console.warn('Autoplay blocked by browser policy:', err.name);
          // Do NOT mark as played if blocked by browser!
          this.hasPlayedShutter = false;
          // Arm gesture unlock: play sound on the very next user click/keypress
          this.armGestureUnlock();
        });
      }
    } catch (e) {
      console.warn('Shutter lift audio play error:', e);
      this.hasPlayedShutter = false;
      this.armGestureUnlock();
    }
  }

  private gestureUnlockHandler: (() => void) | null = null;

  /**
   * Arms a one-time global user gesture listener to play the transition sound
   * the moment the user interacts with the page if initial autoplay was blocked.
   */
  public armGestureUnlock(): void {
    if (this.gestureUnlockHandler || this.hasPlayedShutter || this.isMuted) return;

    this.gestureUnlockHandler = () => {
      this.disarmGestureUnlock();
      if (!this.hasPlayedShutter && !this.isMuted) {
        this.playShutterLift();
      }
    };

    window.addEventListener('pointerdown', this.gestureUnlockHandler, { once: true, capture: true });
    window.addEventListener('keydown', this.gestureUnlockHandler, { once: true, capture: true });
    window.addEventListener('click', this.gestureUnlockHandler, { once: true, capture: true });
    window.addEventListener('touchstart', this.gestureUnlockHandler, { once: true, capture: true });
  }

  public disarmGestureUnlock(): void {
    if (this.gestureUnlockHandler) {
      window.removeEventListener('pointerdown', this.gestureUnlockHandler, true);
      window.removeEventListener('keydown', this.gestureUnlockHandler, true);
      window.removeEventListener('click', this.gestureUnlockHandler, true);
      window.removeEventListener('touchstart', this.gestureUnlockHandler, true);
      this.gestureUnlockHandler = null;
    }
  }

  /**
   * Reset the one-shot shutter audio guard (useful for manual re-tests)
   */
  public resetShutterPlayState(): void {
    this.hasPlayedShutter = false;
    this.lastPlayTime = 0;
    this.disarmGestureUnlock();
  }

  /**
   * No-op stubs to safely handle any legacy calls without playing any breeze
   */
  public startCountrysideAmbience(): void {
    // Ambient breeze completely removed per user request
  }

  public stopCountrysideAmbience(): void {
    // Ambient breeze completely removed per user request
  }

  /**
   * Toggles global mute state
   */
  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;

    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_sound_v2_muted', this.isMuted ? 'true' : 'false');
    }

    if (this.isMuted && this.shutterAudio && !this.shutterAudio.paused) {
      this.shutterAudio.pause();
    } else if (!this.isMuted) {
      // When unmuting with a direct user click, trigger the tactile shutter sound if not played yet
      if (!this.hasPlayedShutter) {
        this.playShutterLift();
      }
    }

    this.notify();
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public subscribe(callback: (muted: boolean) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notify(): void {
    this.listeners.forEach(fn => fn(this.isMuted));
  }
}

export const soundManager = new SoundEngine();
export default soundManager;
