import { ArrowDown, ArrowUp, ExternalLink, Pencil, Plus, Save, Trash2, Video, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import {
  createTikTokVideoRequest,
  deleteTikTokVideoRequest,
  fetchMediaTikTokVideosRequest,
  reorderTikTokVideosRequest,
  TikTokVideo,
  updateTikTokVideoRequest,
} from "../../../api";

type VideoForm = { url: string; title: string; description: string; isActive: boolean };
const emptyForm: VideoForm = { url: "", title: "", description: "", isActive: true };

export default function MediaManagementPage() {
  const [videos, setVideos] = useState<TikTokVideo[]>([]);
  const [form, setForm] = useState<VideoForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadVideos = async () => {
    setLoading(true);
    setError("");
    try { setVideos(await fetchMediaTikTokVideosRequest()); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not load social videos."); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadVideos(); }, []);

  const resetForm = () => { setForm(emptyForm); setEditingId(null); };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      if (editingId) {
        const updated = await updateTikTokVideoRequest(editingId, form);
        setVideos((items) => items.map((item) => item.id === updated.id ? updated : item));
        setNotice("Social video updated.");
      } else {
        const created = await createTikTokVideoRequest(form);
        setVideos((items) => [...items, created].sort((a, b) => a.order - b.order));
        setNotice("Social video added to the gallery.");
      }
      resetForm();
    } catch (err) { setError(err instanceof Error ? err.message : "Could not save this social video."); }
    finally { setSaving(false); }
  };

  const editVideo = (video: TikTokVideo) => {
    setEditingId(video.id);
    setForm({ url: video.url, title: video.title, description: video.description, isActive: video.isActive });
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleVideo = async (video: TikTokVideo) => {
    try {
      const updated = await updateTikTokVideoRequest(video.id, { isActive: !video.isActive });
      setVideos((items) => items.map((item) => item.id === updated.id ? updated : item));
    } catch (err) { setError(err instanceof Error ? err.message : "Could not update video status."); }
  };

  const removeVideo = async (video: TikTokVideo) => {
    if (!window.confirm(`Delete “${video.title || "this social video"}” from the gallery?`)) return;
    try {
      await deleteTikTokVideoRequest(video.id);
      setVideos((items) => items.filter((item) => item.id !== video.id));
      setNotice("Social video deleted.");
    } catch (err) { setError(err instanceof Error ? err.message : "Could not delete this social video."); }
  };

  const moveVideo = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= videos.length) return;
    const next = [...videos];
    [next[index], next[target]] = [next[target], next[index]];
    setVideos(next);
    try { setVideos(await reorderTikTokVideosRequest(next.map((item) => item.id))); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not reorder the gallery."); await loadVideos(); }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-primary">Media Team</p>
        <h2 className="mt-2 text-2xl font-semibold">Media Management</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Add and curate public videos from TikTok, YouTube, Vimeo, Instagram, Facebook, or another HTTPS platform. Only active videos are visible to visitors.</p>
      </div>

      {error && <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}
      {notice && <div className="rounded-lg border border-primary/20 bg-primary/10 p-4 text-sm text-primary">{notice}</div>}

      <form onSubmit={handleSubmit} className="rounded-lg border bg-card p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div><h3 className="text-lg font-semibold">{editingId ? "Edit social video" : "Add social video"}</h3><p className="text-sm text-muted-foreground">Paste a public HTTPS link. Official embeds are used when the platform supports them.</p></div>
          {editingId && <button type="button" onClick={resetForm} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted"><X size={16} /> Cancel</button>}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="text-sm lg:col-span-2"><span className="mb-1.5 block font-medium">Video URL</span><input required type="url" value={form.url} onChange={(event) => setForm({ ...form, url: event.target.value })} placeholder="https://www.youtube.com/watch?v=..." className="h-11 w-full rounded-md border bg-background px-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
          <label className="text-sm"><span className="mb-1.5 block font-medium">Title <span className="font-normal text-muted-foreground">(optional)</span></span><input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} maxLength={120} className="h-11 w-full rounded-md border bg-background px-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
          <label className="text-sm"><span className="mb-1.5 block font-medium">Description <span className="font-normal text-muted-foreground">(optional)</span></span><input value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} maxLength={500} className="h-11 w-full rounded-md border bg-background px-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} className="size-4 accent-primary" /> Publish immediately</label>
          <button disabled={saving} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">{editingId ? <Save size={16} /> : <Plus size={16} />}{saving ? "Saving…" : editingId ? "Save changes" : "Add video"}</button>
        </div>
      </form>

      <section className="rounded-lg border bg-card p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-3"><div><h3 className="text-lg font-semibold">Published gallery</h3><p className="text-sm text-muted-foreground">{videos.filter((video) => video.isActive).length} active of {videos.length} videos</p></div><Video className="text-primary" size={22} /></div>
        {loading ? <div className="grid gap-4 md:grid-cols-2"><div className="h-56 animate-pulse rounded-lg bg-muted" /><div className="h-56 animate-pulse rounded-lg bg-muted" /></div> : videos.length === 0 ? <p className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">No social videos have been added yet.</p> : <div className="grid gap-5 xl:grid-cols-2">{videos.map((video, index) => <VideoCard key={video.id} video={video} index={index} total={videos.length} onEdit={editVideo} onToggle={toggleVideo} onDelete={removeVideo} onMove={moveVideo} />)}</div>}
      </section>
    </div>
  );
}

function VideoCard({ video, index, total, onEdit, onToggle, onDelete, onMove }: { video: TikTokVideo; index: number; total: number; onEdit: (video: TikTokVideo) => void; onToggle: (video: TikTokVideo) => void; onDelete: (video: TikTokVideo) => void; onMove: (index: number, direction: -1 | 1) => void }) {
  return (
    <article className="overflow-hidden rounded-lg border bg-background">
      <div className="aspect-[9/12] max-h-[420px] bg-black">{video.embedUrl ? <iframe src={video.embedUrl} title={video.title || `${video.platform} video preview`} className="h-full w-full" allow="fullscreen" loading="lazy" /> : <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-white"><Video size={28} /><p className="text-sm">Preview is not available for this platform.</p><a href={video.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold underline">Open video <ExternalLink size={14} /></a></div>}</div>
      <div className="space-y-3 p-4"><div className="flex items-start justify-between gap-3"><div><div className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">{video.platform}</div><h4 className="font-semibold">{video.title || "Untitled social video"}</h4>{video.description && <p className="mt-1 text-sm text-muted-foreground">{video.description}</p>}</div><span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${video.isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{video.isActive ? "Published" : "Disabled"}</span></div>
        <div className="flex flex-wrap items-center gap-2 border-t pt-3"><button type="button" onClick={() => onToggle(video)} className="rounded-md border px-2.5 py-1.5 text-xs font-medium hover:bg-muted">{video.isActive ? "Disable" : "Publish"}</button><button type="button" onClick={() => onEdit(video)} className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-medium hover:bg-muted"><Pencil size={13} /> Edit</button><button type="button" onClick={() => onDelete(video)} className="inline-flex items-center gap-1 rounded-md border border-destructive/20 px-2.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10"><Trash2 size={13} /> Delete</button><a href={video.url} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">Open <ExternalLink size={13} /></a></div>
        <div className="flex items-center justify-between text-xs text-muted-foreground"><span>Position {index + 1}</span><span className="flex gap-1"><button type="button" disabled={index === 0} onClick={() => onMove(index, -1)} aria-label="Move video up" className="rounded border p-1.5 hover:bg-muted disabled:opacity-30"><ArrowUp size={14} /></button><button type="button" disabled={index === total - 1} onClick={() => onMove(index, 1)} aria-label="Move video down" className="rounded border p-1.5 hover:bg-muted disabled:opacity-30"><ArrowDown size={14} /></button></span></div>
      </div>
    </article>
  );
}
