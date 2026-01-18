// Fingerprint generation for unique visitor tracking
function generateFingerprint(): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('fingerprint', 2, 2);
  }
  
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency || 'unknown',
    canvas.toDataURL(),
  ];
  
  // Simple hash function
  let hash = 0;
  const str = components.join('|');
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'fp_' + Math.abs(hash).toString(36);
}

// Generate session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Date.now().toString(36) + Math.random().toString(36).slice(2);
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

// Check if this is a new visitor
function isNewVisitor(): boolean {
  const visited = localStorage.getItem('analytics_visited');
  if (!visited) {
    localStorage.setItem('analytics_visited', 'true');
    localStorage.setItem('analytics_first_visit', new Date().toISOString());
    return true;
  }
  return false;
}

// Get UTM parameters
function getUTMParams(): Record<string, string | null> {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_term: params.get('utm_term'),
    utm_content: params.get('utm_content'),
  };
}

// Detect device type
function getDeviceType(): string {
  const ua = navigator.userAgent.toLowerCase();
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
  return 'desktop';
}

// Detect platform
function getPlatform(): string {
  const ua = navigator.userAgent;
  if (/Win/i.test(ua)) return 'Windows';
  if (/Mac/i.test(ua)) return 'macOS';
  if (/Linux/i.test(ua)) return 'Linux';
  if (/Android/i.test(ua)) return 'Android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
  return 'unknown';
}

// Get browser info
function getBrowserInfo(): { name: string; version: string } {
  const ua = navigator.userAgent;
  let name = 'unknown';
  let version = 'unknown';
  
  if (ua.includes('Chrome') && !ua.includes('Edg')) {
    name = 'Chrome';
    version = ua.match(/Chrome\/(\d+)/)?.[1] || 'unknown';
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    name = 'Safari';
    version = ua.match(/Version\/(\d+)/)?.[1] || 'unknown';
  } else if (ua.includes('Firefox')) {
    name = 'Firefox';
    version = ua.match(/Firefox\/(\d+)/)?.[1] || 'unknown';
  } else if (ua.includes('Edg')) {
    name = 'Edge';
    version = ua.match(/Edg\/(\d+)/)?.[1] || 'unknown';
  }
  
  return { name, version };
}

// Get connection info
function getConnectionInfo(): { type: string; downlink: number | null } {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  return {
    type: connection?.effectiveType || 'unknown',
    downlink: connection?.downlink || null,
  };
}

// Collect all analytics data
export function collectAnalyticsData(): Record<string, any> {
  const browser = getBrowserInfo();
  const connection = getConnectionInfo();
  const utmParams = getUTMParams();
  
  return {
    event: 'page_view',
    timestamp: new Date().toISOString(),
    visitor: {
      id: generateFingerprint(),
      session_id: getSessionId(),
      is_new: isNewVisitor(),
      first_visit: localStorage.getItem('analytics_first_visit'),
    },
    page: {
      url: window.location.href,
      path: window.location.pathname,
      referrer: document.referrer || null,
      title: document.title,
      hash: window.location.hash || null,
    },
    device: {
      type: getDeviceType(),
      platform: getPlatform(),
      screen: {
        width: screen.width,
        height: screen.height,
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      pixel_ratio: window.devicePixelRatio || 1,
      touch_capable: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      orientation: screen.orientation?.type || 'unknown',
    },
    browser: {
      name: browser.name,
      version: browser.version,
      user_agent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages?.join(', ') || navigator.language,
      cookies_enabled: navigator.cookieEnabled,
      do_not_track: navigator.doNotTrack === '1',
      online: navigator.onLine,
      pdf_viewer: navigator.pdfViewerEnabled ?? 'unknown',
    },
    network: {
      connection_type: connection.type,
      downlink_mbps: connection.downlink,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezone_offset: new Date().getTimezoneOffset(),
    },
    marketing: {
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
      utm_term: utmParams.utm_term,
      utm_content: utmParams.utm_content,
    },
    technical: {
      color_depth: screen.colorDepth,
      hardware_concurrency: navigator.hardwareConcurrency || null,
      device_memory: (navigator as any).deviceMemory || null,
      webgl_supported: !!document.createElement('canvas').getContext('webgl'),
      local_storage: (() => { try { return !!localStorage; } catch { return false; } })(),
      session_storage: (() => { try { return !!sessionStorage; } catch { return false; } })(),
    },
  };
}

// Send analytics data to the edge function
export async function sendAnalytics(data: Record<string, any>): Promise<void> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-analytics`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || '',
        },
        body: JSON.stringify(data),
      }
    );
    
    if (!response.ok) {
      console.warn('Analytics send failed:', response.status);
    }
  } catch (error) {
    // Silently fail - don't disrupt user experience
    console.warn('Analytics error:', error);
  }
}

// Initialize and send page view
export function trackPageView(): void {
  const data = collectAnalyticsData();
  sendAnalytics(data);
}
