import { useEffect, useState } from "react";
import { ArrowDown, LayoutGrid, Minimize2 } from "lucide-react";
import { fetchTikTokVideosRequest, TikTokVideo } from "../api";

export default function TikTokGallery() {
  const [videos, setVideos] = useState<TikTokVideo[]>([]);
  const [minimalView, setMinimalView] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchTikTokVideosRequest().then((items) => { if (mounted) setVideos(items); }).catch(() => { /* The public homepage remains usable if the gallery is unavailable. */ });
    return () => { mounted = false; };
  }, []);

  return (
    <section id="tiktok-gallery" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">From our media team</span>
            <h2 className="mt-3 font-['DM_Serif_Display'] text-3xl text-foreground md:text-4xl">Watch our fellowship story</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">See the latest moments, messages, and ministry highlights from AUWC ECSF.</p>
          </div>
        </div>
        {videos.length ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(minimalView ? videos.slice(0, 3) : videos).map((video) => (
                <article key={video.id} className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
                  <div className="aspect-[9/12] bg-black">{video.embedUrl ? <iframe src={video.embedUrl} title={video.title || `AUWC ECSF ${video.platform} video`} className="h-full w-full" allow="fullscreen" loading="lazy" /> : <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-white"><p className="text-sm">Preview is not available for this platform.</p><a href={video.url} target="_blank" rel="noreferrer" className="text-sm font-semibold underline">Open video</a></div>}</div>
                  {(video.title || video.description) && <div className="p-5">{video.title && <h3 className="font-semibold text-foreground">{video.title}</h3>}{video.description && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{video.description}</p>}</div>}
                </article>
              ))}
            </div>
            {minimalView && videos.length > 3 && (
              <div className="relative mx-auto mt-6 max-w-md overflow-hidden rounded-2xl border border-border bg-black/5 opacity-60">
                <div className="flex items-center gap-4 bg-gradient-to-r from-primary/10 via-background to-background px-5 py-4">
                  <div className="size-12 shrink-0 rounded-xl bg-primary/15" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">More fellowship moments</p>
                    <p className="text-sm text-muted-foreground">{videos.length - 3} more video{videos.length - 3 === 1 ? "" : "s"} waiting to be watched</p>
                  </div>
                  <ArrowDown size={18} className="ml-auto shrink-0 text-primary" aria-hidden="true" />
                </div>
              </div>
            )}
            {videos.length > 3 && (
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  aria-pressed={minimalView}
                  onClick={() => setMinimalView((current) => !current)}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                >
                  {minimalView ? <LayoutGrid size={16} aria-hidden="true" /> : <Minimize2 size={16} aria-hidden="true" />}
                  {minimalView ? "Show all videos" : "Show less"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-primary/25 bg-background p-10 text-center text-sm text-muted-foreground">The Media Team has not published a video yet. Check back soon for fellowship highlights.</div>
        )}
      </div>
    </section>
  );
}
